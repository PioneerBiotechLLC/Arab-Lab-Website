import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { CSSProperties } from 'react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Shared by server and client components, so it lives outside any 'use client' module.
export const eyebrowOnDark = 'font-mono text-xs text-orange-on-dark'
// Stagger index for entrance/reveal animations (read by CSS as --i).
export const delay = (i: number) => ({ '--i': i } as CSSProperties)
