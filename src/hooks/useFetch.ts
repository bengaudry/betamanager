import useSWR, { SWRConfiguration } from "swr";

export function useFetch<T extends any>(
  key: string,
  config?: SWRConfiguration
): [T, any, boolean] {
  const { data, error, isLoading } = useSWR(
    key,
    (url) => fetch(url).then((r) => r.json()),
    config
  );
  return [data as T, error, isLoading];
}
