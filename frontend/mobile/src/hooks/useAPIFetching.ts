import { useMemo, useRef, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import useRequestBuilder from "./useRequestBuilder";
import { SWRConfiguration } from "swr";
import { Endpoints } from "../enums";
import { ErrorResponse } from "../interfaces";

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
  const savedResponse = useRef({} as useAPIFetchingResponse<Response>);
  const onlyValidating = useRef(false);

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
    savedResponse.current = {};
    onlyValidating.current = false;
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
      savedResponse.current?.isFetching === false &&
      (savedResponse.current?.body as { has_more: boolean })?.has_more
    ) {
      setPaginationRound(paginationRound + 1);
      onlyValidating.current = false;
    }
  };

  const response = useMemo(() => {
    let newResponse;
    let previousResponseBody = (
      options?.withPagination ? savedResponse.current?.body : undefined
    ) as {
      data: unknown[];
    };

    if (isLoading || isValidating) {
      const _response = {
        isFetching: true,
      };

      if (previousResponseBody) {
        _response["body"] = {
          ...previousResponseBody,
          data: previousResponseBody?.data,
        };
      }

      newResponse = _response;
      onlyValidating.current = isValidating && !isLoading;
    } else if (swrResponse) {
      const common = {
        isFetching: false,
        statusCode: swrResponse.status,
      };

      newResponse = {
        ...common,
        body: previousResponseBody
          ? {
              ...swrResponse.data,
              data: [...previousResponseBody?.data, ...swrResponse.data?.data],
            }
          : swrResponse.data,
      };
    } else if (error) {
      newResponse = {
        isFetching: false,
        statusCode: error.response.status,
        error: error.response.data,
      };
    }

    savedResponse.current = onlyValidating.current
      ? savedResponse.current
      : newResponse;

    if (
      isLoading === false &&
      isValidating === false &&
      onlyValidating.current
    ) {
      onlyValidating.current = false;
    }

    return savedResponse.current;
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
