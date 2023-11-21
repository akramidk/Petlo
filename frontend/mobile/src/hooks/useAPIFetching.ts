import { useMemo, useRef, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import useRequestBuilder from "./useRequestBuilder";
import { SWRConfiguration } from "swr";
import { Endpoints } from "../enums";
import { ErrorResponse } from "../interfaces";

// TODO should do it again after a lot of changes it looks baaaad

interface useAPIFetchingProps<Request> {
  endpoint: Endpoints | null | string;
  body?: Partial<Request>;
  slugs?: { [key: string]: string };
  SWROptions?: SWRConfiguration;
  options?: {
    wait?: boolean;
    overwriteSessionToken?: string;
    withPagination?: boolean;
    isFunction?: boolean;
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
  slugs,
  SWROptions,
  options,
}: useAPIFetchingProps<Request>) => {
  const [wait, setWait] = useState<boolean>(options?.wait);
  const [paginationRound, setPaginationRound] = useState(1);
  const lastResponse = useRef({} as useAPIFetchingResponse<Response>);
  const savedData: { current: unknown[][] } = useRef();

  const SWREndpoint = useMemo(() => {
    if ((wait && options?.wait === true) || endpoint === null) {
      return null;
    }

    if (options?.isFunction) {
      return endpoint;
    }

    let endpointWithSlugs = endpoint as string;
    if (slugs) {
      Object.keys(slugs).forEach((slug) => {
        endpointWithSlugs = endpointWithSlugs.replaceAll(
          "${" + slug + "}",
          slugs[slug]
        );
      });
    }

    if (!body && options?.withPagination !== true) {
      return endpointWithSlugs;
    }

    let page;
    if (options?.withPagination) {
      page = { page: paginationRound };
    }

    const params = new URLSearchParams({ ...body, ...page } as {}).toString();
    return `${endpointWithSlugs}?${params}`;
  }, [
    endpoint,
    wait,
    paginationRound,
    options?.withPagination,
    options?.wait,
    body,
    slugs,
  ]);

  const { URI, sessionToken } = useRequestBuilder({
    endpoint: SWREndpoint,
    overwriteSessionToken: options?.overwriteSessionToken,
  });

  const fetcher = async () => {
    return await axios({
      method: "GET",
      url: options?.isFunction ? SWREndpoint : URI,
      headers: {
        Authorization: `bearer ${sessionToken}`,
      },
    }).then((res) => res);
  };

  const reset = () => {
    lastResponse.current = {};
    savedData.current = undefined;
    setPaginationRound(1);
  };

  const {
    data: swrResponse,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(SWREndpoint, fetcher, SWROptions);

  const fetchMore = () => {
    if (
      options?.withPagination &&
      (
        lastResponse.current as {
          has_more: boolean;
        }
      )?.has_more
    ) {
      setPaginationRound(paginationRound + 1);
    }
  };

  const response = useMemo(() => {
    const getData = () => {
      return savedData.current?.flatMap?.((data) => data);
    };

    if (isLoading || isValidating) {
      const body = options?.withPagination
        ? { body: { ...lastResponse.current, data: getData() } }
        : {};

      return { isFetching: true, ...body };
    }

    if (swrResponse) {
      if (options?.withPagination) {
        if (!savedData.current) savedData.current = [];

        savedData.current[paginationRound - 1] = swrResponse.data.data;
        lastResponse.current = swrResponse.data;
      }

      return {
        isFetching: false,
        statusCode: swrResponse.status,
        body: options?.withPagination
          ? { ...swrResponse.data, data: getData() }
          : swrResponse.data,
      };
    }

    if (error) {
      return {
        isFetching: false,
        statusCode: error.response.status,
        error: error.response.data,
      };
    }
  }, [isLoading, isValidating, swrResponse, error]);

  return {
    response,
    setWait,
    fetchMore,
    round: paginationRound,
    mutate,
    reset,
  };
};

export default useAPIFetching;
