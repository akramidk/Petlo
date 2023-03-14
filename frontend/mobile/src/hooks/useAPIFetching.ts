import { useMemo, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import useSettingsContext from "./useSettingsContext";
import useRequestBuilder from "./useRequestBuilder";
import { SWRConfiguration } from "swr";
import { Endpoints } from "../enums";

interface useAPIFetchingProps<Request> {
  endpoint: Endpoints | null;
  body?: Request;
  SWROptions?: SWRConfiguration;
  options?: {
    wait?: boolean;
  };
}

interface useAPIFetchingResponse<Response> {
  isFetching?: boolean;
  statusCode?: number;
  body?: Response;
}

const useAPIFetching = <Request, Response>({
  endpoint,
  body,
  SWROptions,
  options,
}: useAPIFetchingProps<Request>) => {
  const [wait, setWait] = useState<boolean>(options?.wait);

  const SWREndpoint = useMemo(() => {
    if (wait) {
      return null;
    }

    if (!body) {
      return endpoint;
    }

    const params = new URLSearchParams(body as {}).toString();
    return `${endpoint}?${params}`;
  }, [endpoint, wait]);

  const { fetcher } = useRequestBuilder({
    endpoint: SWREndpoint,
    method: "GET",
  });

  const { data, error, isLoading, isValidating } = useSWR(
    SWREndpoint,
    fetcher,
    SWROptions
  );

  const response: useAPIFetchingResponse<Response> = useMemo(() => {
    if (isLoading || isValidating) {
      return { isFetching: true };
    }

    if (data || error) {
      return {
        isFetching: false,
        statusCode: data ? 200 : error.response.status,
        body: data as Response,
      };
    }
  }, [isLoading, isValidating, data, error]);

  return { response, setWait };
};

export default useAPIFetching;
