const GGYST_URL = 'https://ggyst.com'

/**
 * Thin sitewide strip under the navbar. Lives inside the fixed header, so the
 * page offset in each route is nav (4rem) + bar (2.5rem) = 6.5rem.
 */
export default function AnnouncementBar() {
  return (
    <a
      href={GGYST_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-10 items-center justify-center gap-3 border-b border-surface-700
        bg-surface-900 px-6 font-mono text-[0.7rem] uppercase tracking-label
        text-text-secondary transition-colors duration-150
        hover:bg-tiffany hover:text-surface-950"
    >
      <span className="h-1.5 w-1.5 shrink-0 bg-tiffany transition-colors duration-150 group-hover:bg-surface-950" />
      <span className="font-bold text-tiffany transition-colors duration-150 group-hover:text-surface-950">
        GGyst
      </span>
      <span className="hidden text-text-muted transition-colors duration-150 group-hover:text-surface-950/60 sm:inline">
        /
      </span>
      <span className="hidden sm:inline">
        Business management for independent gig workers
      </span>
      <span className="sm:hidden">Now live</span>
      <span className="text-text-muted transition-colors duration-150 group-hover:text-surface-950/60">
        /
      </span>
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-bold text-text-primary
        underline decoration-surface-700 underline-offset-4 transition-colors duration-150
        group-hover:text-surface-950 group-hover:decoration-surface-950/40">
        Visit ggyst.com
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-1"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </span>
    </a>
  )
}
