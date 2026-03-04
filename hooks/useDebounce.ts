"use client"

import * as React from "react"

/**
 * Returns a debounced copy of `value` that only updates after
 * `delay` ms of no changes. Use this to avoid firing an API call
 * on every keystroke in a search input.
 */
export function useDebounce<T>(value: T, delay = 400): T {
    const [debounced, setDebounced] = React.useState<T>(value)

    React.useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debounced
}
