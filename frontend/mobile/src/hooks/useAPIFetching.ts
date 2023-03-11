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

interface useAPIFetchingResponse<Response> {
  status?: "loading";
  statusCode?: number;
  body?: Response;
}

const useAPIFetching = <Request, Response>({
  endpoint,
  body,
  options,
}: useAPIFetchingProps<Request>) => {
  const [response, setResponse] = useState<useAPIFetchingResponse<Response>>();
  const [triggeredValue, trigger] = useState<null | Endpoints>(null);

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
      setResponse({
        statusCode: data ? 200 : error.response.status,
        body: data,
      });
    }

    if (isValidating || isLoading) {
      setResponse({
        status: "loading",
      });
    }
  }, [data, error, isValidating, isLoading]);

  return { trigger, response };
};

export default useAPIFetching;
