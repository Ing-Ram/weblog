import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initObservor, trackPageview } from './observor'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

let initialised = false

/**
 * Records a pageview on mount and on every client-side navigation.
 *
 * Must be called from inside the Router — it depends on `useLocation`.
 * Missing env vars are not an error here: the beacon simply stays off, so a
 * local checkout without Supabase credentials still runs.
 */
export function useObservor(): void {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!supabaseUrl || !anonKey) return
    if (!initialised) {
      initObservor({ supabaseUrl, anonKey, appSlug: 'weblog' })
      initialised = true
    }
    trackPageview(pathname)
  }, [pathname])
}
