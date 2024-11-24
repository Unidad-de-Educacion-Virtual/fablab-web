import { useCallback, useEffect, useState } from "react";

export function useService<T>(serviceFn: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const memoizedServiceFn = useCallback(serviceFn, deps);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await memoizedServiceFn();
        setData(result);
      } catch (err) {
        setError(`${err}`);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [memoizedServiceFn, refreshToggle]);

  function refresh() {
    setRefreshToggle(!refreshToggle);
  }

  return { data, loading, error, refresh };
}
