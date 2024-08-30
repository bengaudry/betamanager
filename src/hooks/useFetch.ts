import useSWR from "swr";

export function useFetch<T extends any>(
  ...params: Parameters<typeof useSWR>
): [T, any, boolean] {
  const { data, error, isLoading } = useSWR(...params);
  return [data as (T), error, isLoading];
}
