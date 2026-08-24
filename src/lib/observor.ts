/**
 * observor beacon — reports pageviews and uncaught errors to Supabase.
 *
 * Design rules, in priority order:
 *   1. Never break the host page. Every entry point is wrapped; failures are
 *      swallowed silently. Analytics is not worth a white screen.
 *   2. Never send anything identifying. No cookies, no IP, no fingerprint, no
 *      query strings (they carry tokens). `sessionId` is random, lives in
 *      sessionStorage, and dies with the tab.
 *   3. Never send anything private. `normalizePath` is the redaction hook —
 *      apps with authenticated routes use it to collapse them.
 *
 * This file is duplicated across weblog / blog / ggyst rather than shared via a
 * package, because the three have no common build. Keep the copies in sync.
 */

export type ObservorConfig = {
  supabaseUrl: string
  anonKey: string
  /** Must match a `slug` in the `observor_apps` table, or inserts are rejected. */
  appSlug: string
  /**
   * Redact or rewrite a pathname before it leaves the browser. Return `null` to
   * skip recording the view entirely. Receives the raw `location.pathname`
   * only — query and hash are already discarded.
   */
  normalizePath?: (pathname: string) => string | null
}

const SESSION_KEY = 'observor.sid'
const MAX_ERRORS_PER_SESSION = 10

let config: ObservorConfig | null = null
let errorHandlersInstalled = false
let errorsSent = 0
let firstViewSent = false
const seenErrors = new Set<string>()

/** Random per-tab id. Distinguishes a "visit" (one session) from a pageview. */
function sessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY)
    if (existing) return existing
    const fresh =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem(SESSION_KEY, fresh)
    return fresh
  } catch {
    // Private browsing can throw on sessionStorage access. Fall back to a
    // per-call id: the visit count degrades toward the pageview count, which is
    // wrong but harmless, and better than dropping the data.
    return 'nostore-' + Math.random().toString(36).slice(2)
  }
}

function isTrackable(): boolean {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname
  return host !== 'localhost' && host !== '127.0.0.1' && !host.endsWith('.local')
}

/**
 * `fetch` with `keepalive` rather than `navigator.sendBeacon`: sendBeacon cannot
 * set the `apikey`/`Authorization` headers PostgREST requires, and passing the
 * key in the query string is not a contract Supabase guarantees. `keepalive`
 * gives us the same survives-unload behaviour for the error case.
 */
function insert(table: string, row: Record<string, unknown>): void {
  if (!config) return
  try {
    void fetch(`${config.supabaseUrl}/rest/v1/${table}`, {
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    }).catch(() => {})
  } catch {
    /* ignore */
  }
}

function truncate(value: string | null | undefined, max: number): string | null {
  if (!value) return null
  return value.length > max ? value.slice(0, max) : value
}

/** Apply the configured redaction to a pathname, defaulting to fully opaque. */
function redactPath(pathname: string): string {
  const normalize = config?.normalizePath
  if (!normalize) return pathname
  return normalize(pathname) ?? '/app'
}

/**
 * Same-origin referrers are NOT safe to send raw.
 *
 * `Referrer-Policy: strict-origin-when-cross-origin` — the policy this app
 * sets — strips cross-origin referrers down to the bare origin, but sends the
 * **full URL** for same-origin navigations. On any full page load inside the
 * app that means the previous authenticated URL, ids and all, and for
 * `/invoice/<shareToken>` it means an actual credential.
 *
 * So same-origin referrers go through the same redaction as `path`, and query
 * and hash are discarded in both directions.
 */
function safeReferrer(): string | null {
  try {
    const raw = document.referrer
    if (!raw) return null
    const url = new URL(raw)
    if (url.origin !== window.location.origin) return url.origin + url.pathname
    return url.origin + redactPath(url.pathname)
  } catch {
    // A referrer we cannot parse is one we cannot redact.
    return null
  }
}

/**
 * Error messages and stack frames embed URLs, and interpolated messages can
 * carry record identifiers. Rewrite every URL found in a string: same-origin
 * paths are redacted, and query strings are dropped everywhere, since that is
 * where tokens live.
 *
 * Two carve-outs keep stacks debuggable. A trailing `:line:col` is split off
 * before parsing and re-attached afterwards, and same-origin `/_next/` paths
 * are kept verbatim — they are build assets, never user data, and redacting
 * them would collapse every frame of every stack to the same opaque marker.
 */
function scrubUrls(value: string | null | undefined): string | null {
  if (!value) return null
  return value.replace(/https?:\/\/[^\s'"`)\]]+/g, (match) => {
    // Stack frames append `:line:col` to the URL; it is not part of the path.
    const framePos = match.match(/(:\d+:\d+)$/)
    const suffix = framePos ? framePos[1] : ''
    const bare = suffix ? match.slice(0, -suffix.length) : match
    try {
      const url = new URL(bare)
      if (url.origin !== window.location.origin) return url.origin + url.pathname + suffix
      if (url.pathname.startsWith('/_next/')) return url.origin + url.pathname + suffix
      return url.origin + redactPath(url.pathname) + suffix
    } catch {
      return match
    }
  })
}

export function initObservor(next: ObservorConfig): void {
  if (!next.supabaseUrl || !next.anonKey) return
  config = next
  installErrorHandlers()
}

/** Record one pageview. Safe to call on every route change. */
export function trackPageview(pathname: string): void {
  try {
    if (!config || !isTrackable()) return

    const normalize = config.normalizePath
    const path = normalize ? normalize(pathname) : pathname
    if (path === null) return

    insert('observor_events', {
      app_slug: config.appSlug,
      session_id: sessionId(),
      path: truncate(path || '/', 512),
      // Only the entry referrer is interesting; on SPA route changes
      // document.referrer still points at the original external source, which
      // would otherwise be double-counted on every navigation.
      referrer: firstViewSent ? null : truncate(safeReferrer(), 512),
    })
    firstViewSent = true
  } catch {
    /* ignore */
  }
}

function reportError(message: string, source?: string, line?: number, stack?: string): void {
  try {
    if (!config || !isTrackable()) return
    if (errorsSent >= MAX_ERRORS_PER_SESSION) return

    // One broken render loop can fire the same error hundreds of times. Report
    // each distinct message once per session.
    const key = `${message}@${source ?? ''}:${line ?? ''}`
    if (seenErrors.has(key)) return
    seenErrors.add(key)
    errorsSent += 1

    const normalize = config.normalizePath
    const rawPath = window.location.pathname
    const path = normalize ? normalize(rawPath) : rawPath

    insert('observor_errors', {
      app_slug: config.appSlug,
      session_id: sessionId(),
      path: truncate(path, 512),
      message: truncate(scrubUrls(message), 1000),
      source: truncate(scrubUrls(source), 512),
      line: typeof line === 'number' ? line : null,
      stack: truncate(scrubUrls(stack), 2000),
    })
  } catch {
    /* ignore */
  }
}

function installErrorHandlers(): void {
  if (errorHandlersInstalled || typeof window === 'undefined') return
  errorHandlersInstalled = true

  window.addEventListener('error', (event) => {
    reportError(
      event.message || 'Unknown error',
      event.filename,
      event.lineno,
      event.error instanceof Error ? event.error.stack : undefined,
    )
  })

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason
    reportError(
      reason instanceof Error ? reason.message : String(reason),
      undefined,
      undefined,
      reason instanceof Error ? reason.stack : undefined,
    )
  })
}
