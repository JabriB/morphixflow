import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Ref } from 'react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Merges multiple refs into one callback ref, for wrapping a forwarded ref with an internal one. */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(node)
      else if (ref && typeof ref === 'object') (ref as { current: T | null }).current = node
    }
  }
}
