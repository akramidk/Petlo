import { useMemo, useState } from "react";
import useSWR from "swr";
import { useAPIFetchingProps, useAPIFetchingResponse } from "./interfaces";
import axios from "axios";
import useSettingsContext from "../useSettingsContext";
import useRequestBuilder from "../useRequestBuilder";

const useAPIFetching = <Request, Response>({
  endpoint,
  body,
  SWROptions,
  options,
}: useAPIFetchingProps<Request>) => {
  const settingsContext = useSettingsContext();
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
    locale: settingsContext?.languageWithoutGender,
  });

  const fetcher = (): Response => {
    return axios
      .get(URI, { headers: { Authorization: sessionToken } })
      .then((res) => res.data) as Response;
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
