import { useEffect, useState } from 'react'

interface ApiResourceState<T> {
  data: T | null
  loading: boolean
  error: string | null
  retry: () => void
}

export function useApiResource<T extends { id: number }>(
  id: number | null,
  loader: (id: number) => Promise<T>,
  errorMessage: string,
): ApiResourceState<T> {
  const [data, setData] = useState<T | null>(null)
  const [settledId, setSettledId] = useState<number | null>(null)
  const [errorId, setErrorId] = useState<number | null>(null)
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    if (!id) return
    let active = true

    void loader(id)
      .then((result) => {
        if (!active) return
        setData(result)
        setErrorId(null)
      })
      .catch(() => {
        if (active) setErrorId(id)
      })
      .finally(() => {
        if (active) setSettledId(id)
      })

    return () => {
      active = false
    }
  }, [id, loader, retryKey])

  const currentData = data?.id === id ? data : null

  return {
    data: currentData,
    loading: Boolean(id) && settledId !== id,
    error: errorId === id ? errorMessage : null,
    retry: () => {
      setSettledId(null)
      setRetryKey((value) => value + 1)
    },
  }
}
