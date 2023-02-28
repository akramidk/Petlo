import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

const backendURL = "https://api.dev.petlo.co/en/v1";

interface useAPIFetchingProps<Request> {
  endpoint: string | null;
  body: Request;
}

//todo: add types
const useAPIFetching = <Request, Response>({
  endpoint,
  body,
}: useAPIFetchingProps<Request>) => {
  const [response, setResponse] = useState<Response>();
  const [status, setStatus] = useState<undefined | "loading">();

  const fetcher = (endpoint: string) => {
    let fullEndpoint = backendURL + endpoint;
    const params = new URLSearchParams(body as {}).toString();
    if (params.length > 0) fullEndpoint += `?${params}`;

    return axios.get(fullEndpoint).then((res) => res.data);
  };

  const { data, error, mutate, isLoading, isValidating } = useSWR(
    endpoint,
    fetcher
  );

  useEffect(() => {
    if ((data || error) && !(isValidating || isLoading)) {
      mutate(undefined, { revalidate: false });
      setStatus(undefined);
      setResponse(data ?? undefined);
    }

    if (isValidating || isLoading) {
      setStatus("loading");
    }
  }, [data, error, isValidating, isLoading, mutate]);

  return { response, status };
};

export default useAPIFetching;
