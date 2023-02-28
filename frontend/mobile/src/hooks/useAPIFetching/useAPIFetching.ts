import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Constants from "expo-constants";
import { Endpoints } from "../../enums";

const backendURL = Constants.expoConfig.extra.API_URL + "/en";

interface useAPIFetchingProps<Request> {
  endpoint: Endpoints;
  body: Request;
}

const useAPIFetching = <Request, Response>({
  endpoint,
  body,
}: useAPIFetchingProps<Request>) => {
  const [response, setResponse] = useState<Response>();
  const [status, setStatus] = useState<undefined | "loading">();

  const fetcher = (endpoint: string): Response => {
    let fullEndpoint = backendURL + endpoint;
    const params = new URLSearchParams(body as {}).toString();
    if (params.length > 0) fullEndpoint += `?${params}`;

    return axios.get(fullEndpoint).then((res) => res.data) as Response;
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
