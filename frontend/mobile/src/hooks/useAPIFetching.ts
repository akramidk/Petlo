import { useMemo, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import useRequestBuilder from "./useRequestBuilder";
import { SWRConfiguration } from "swr";
import { Endpoints } from "../enums";
import { ErrorResponse } from "../interfaces";

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
  error?: ErrorResponse;
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

  const { URI, sessionToken } = useRequestBuilder({
    endpoint: SWREndpoint,
  });

  const fetcher = async () => {
    return await axios({
      method: "GET",
      url: URI,
      headers: {
        Authorization: `bearer ${sessionToken}`,
      },
    }).then((res) => res.data);
  };

  const { data, error, isLoading, isValidating } = useSWR(
    SWREndpoint,
    fetcher,
    SWROptions
  );

  const response: useAPIFetchingResponse<Response> = useMemo(() => {
    if (isLoading || isValidating) {
      return { isFetching: true };
    }

    if (data) {
      return {
        isFetching: false,
        statusCode: data,
        body: data,
      };
    }

    if (error) {
      return {
        isFetching: false,
        statusCode: error.response.status,
        error: error.response.data,
      };
    }
  }, [isLoading, isValidating, data, error]);

  return { response, setWait };
};

export default useAPIFetching;
