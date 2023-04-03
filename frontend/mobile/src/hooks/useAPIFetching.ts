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
    overwriteSessionToken?: string;
    withPagination?: boolean;
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
  const [paginationRound, setPaginationRound] = useState(1);

  const SWREndpoint = useMemo(() => {
    if (wait && options?.wait === true) {
      return null;
    }

    if (!body && options?.withPagination !== true) {
      return endpoint;
    }

    let page;
    if (options?.withPagination) {
      page = { page: paginationRound };
    }

    const params = new URLSearchParams({ ...body, ...page } as {}).toString();
    return `${endpoint}?${params}`;
  }, [
    endpoint,
    wait,
    paginationRound,
    options?.withPagination,
    options?.wait,
    body,
  ]);

  const { URI, sessionToken } = useRequestBuilder({
    endpoint: SWREndpoint,
    overwriteSessionToken: options?.overwriteSessionToken,
  });

  const fetcher = async () => {
    return await axios({
      method: "GET",
      url: URI,
      headers: {
        Authorization: `bearer ${sessionToken}`,
      },
    }).then((res) => res);
  };

  const { data, error, isLoading, isValidating } = useSWR(
    SWREndpoint,
    fetcher,
    SWROptions
  );

  const fetchMore = () => {
    setPaginationRound(paginationRound + 1);
  };

  const response: useAPIFetchingResponse<Response> = useMemo(() => {
    if (isLoading || isValidating) {
      return { isFetching: true };
    }

    if (data) {
      return {
        isFetching: false,
        statusCode: data.status,
        body: { ...response?.body, ...data.data },
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

  return { response, setWait, fetchMore, round: paginationRound };
};

export default useAPIFetching;
