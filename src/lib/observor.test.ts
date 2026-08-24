/**
 * @vitest-environment-options { "url": "https://chadingramcx.com/projects" }
 */
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { initObservor, trackPageview } from './observor'

/**
 * Redaction tests for the observor beacon.
 *
 * weblog is entirely public, so no path here is secret — but design rule 2 of
 * this module is that *no query strings ever leave the browser*, because on the
 * other two sites that share this file they carry tokens. The three copies have
 * drifted once already; these tests are what keeps this one from drifting back.
 *
 * The jsdom URL above matters: the beacon no-ops on localhost by design, so
 * without a real hostname every assertion here would pass vacuously.
 */

const ORIGIN = 'https://chadingramcx.com'
type Row = Record<string, unknown>
const sent: Row[] = []

const setReferrer = (value: string) =>
  Object.defineProperty(document, 'referrer', { value, configurable: true })

beforeAll(() => {
  vi.stubGlobal('fetch', (_url: string, init: { body: string }) => {
    sent.push(JSON.parse(init.body) as Row)
    return Promise.resolve({})
  })
  setReferrer(`${ORIGIN}/projects/ggyst?utm_source=newsletter&t=abc123`)
  initObservor({ supabaseUrl: 'https://project.supabase.co', anonKey: 'anon', appSlug: 'weblog' })
})

const lastRow = () => sent[sent.length - 1]

describe('referrer', () => {
  // Must run first: only the first pageview of a document sends a referrer.
  it('keeps the same-origin path but drops the query string', () => {
    trackPageview('/projects')

    expect(lastRow().referrer).toBe(`${ORIGIN}/projects/ggyst`)
    expect(String(lastRow().referrer)).not.toContain('utm_source')
    expect(String(lastRow().referrer)).not.toContain('t=abc123')
  })

  it('sends no referrer on later pageviews', () => {
    trackPageview('/about')
    expect(lastRow().referrer).toBeNull()
    expect(lastRow().path).toBe('/about')
  })
})

describe('error reporting', () => {
  it('drops query strings from URLs in message, source and stack', () => {
    const stack = [
      'Error: boom',
      `    at load (${ORIGIN}/projects?draft=secret:1:1)`,
      '    at ext (https://cdn.example.com/a.js?token=LEAK:2:2)',
    ].join('\n')

    window.dispatchEvent(
      new ErrorEvent('error', {
        message: `Failed fetching ${ORIGIN}/api/list?key=SECRET`,
        filename: `${ORIGIN}/projects?draft=secret`,
        lineno: 4,
        error: Object.assign(new Error('boom'), { stack }),
      }),
    )

    const row = lastRow()
    expect(row.message).toBe(`Failed fetching ${ORIGIN}/api/list`)
    expect(row.source).toBe(`${ORIGIN}/projects`)
    expect(String(row.stack)).not.toContain('draft=secret')
    expect(String(row.stack)).not.toContain('token=LEAK')
  })

  it('keeps build-asset frames and their line:col so stacks stay debuggable', () => {
    const stack = `Error: later\n    at r (${ORIGIN}/assets/index-a1b2c3.js:812:44)`
    window.dispatchEvent(new PromiseRejectionEvent('unhandledrejection', {
      promise: Promise.reject(new Error('later')).catch(() => {}) as Promise<never>,
      reason: Object.assign(new Error('later'), { stack }),
    }))

    expect(String(lastRow().stack)).toContain('/assets/index-a1b2c3.js:812:44')
  })
})
