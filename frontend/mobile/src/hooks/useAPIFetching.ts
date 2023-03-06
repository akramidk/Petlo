import axios from "axios";
import { useMemo, useState } from "react";
import useSWR from "swr";
import Constants from "expo-constants";
import { Endpoints } from "../enums";
import type { SWRConfiguration } from "swr";

const backendURL = Constants.expoConfig.extra.API_URL + "/en";

interface useAPIFetchingProps<Request> {
  endpoint: Endpoints;
  body?: Request;
  options?: SWRConfiguration;
}

const useAPIFetching = <Request, Response>({
  endpoint,
  body,
  options,
}: useAPIFetchingProps<Request>) => {
  const [triggeredValue, trigger] = useState<null | Endpoints>(null);
  const [response, setResponse] = useState<Response>();
  const [status, setStatus] = useState<undefined | "loading">();

  const fetcher = (endpoint: string): Response => {
    let fullEndpoint = backendURL + endpoint;
    const params = new URLSearchParams(body as {}).toString();
    if (params.length > 0) fullEndpoint += `?${params}`;

    return axios.get(fullEndpoint).then((res) => res.data) as Response;
  };

  const { data, error, isLoading, isValidating } = useSWR(
    endpoint ?? triggeredValue,
    fetcher,
    options
  );

  useMemo(() => {
    if ((data || error) && !(isValidating || isLoading)) {
      setStatus(undefined);
      setResponse(data ?? error.response.data);
    }

    if (isValidating || isLoading) {
      setStatus("loading");
    }
  }, [data, error, isValidating, isLoading]);

  return { trigger, response, status };
};

export default useAPIFetching;
