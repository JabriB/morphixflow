'use client'

import { createContext, useContext } from 'react'
import { deDictionary, type Dictionary, type Locale } from './dictionary'

interface ContentValue {
  t: Dictionary
  locale: Locale
  /** True for right-to-left locales. Components use it for icon direction. */
  rtl: boolean
}

/**
 * German as the fallback rather than `null`.
 *
 * A missing provider is a bug, but it should surface as German copy in an
 * unexpected place, not as a crash on a production landing page. `useContent`
 * therefore never returns undefined and callers never need a null check.
 */
const ContentContext = createContext<ContentValue>({
  t: deDictionary,
  locale: 'de',
  rtl: false,
})

export function ContentProvider({
  value,
  children,
}: {
  value: ContentValue
  children: React.ReactNode
}) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

/**
 * The active dictionary.
 *
 * Returned as `t` so call sites read `t.hero.headline`, which keeps the
 * translated origin of a string visible at the point of use. Destructuring a
 * bare `hero` would look identical to the old static import and make it easy to
 * reintroduce one by accident.
 */
export function useContent(): ContentValue {
  return useContext(ContentContext)
}
