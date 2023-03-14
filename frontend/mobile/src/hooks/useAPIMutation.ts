import axios from "axios";
import Constants from "expo-constants";
import { useEffect, useMemo, useState } from "react";
import { Endpoints } from "../enums";
import useSWRMutation from "swr/mutation";
import useAlertContext from "./useAlertContext";
import useRequestBuilder from "./useRequestBuilder";

interface useAPIMutationProps<Response> {
  endpoint: Endpoints;
  method: "POST";
  options?: {
    onSucceeded?: (data: Response) => void;
    withoutAuthorization?: boolean;
    overwriteSessionToken?: string;
  };
}

interface useAPIMutationResponse<Response> {
  status?: "loading" | "succeeded" | "failed";
  statusCode?: number;
  body?: Response;
}

const useAPIMutation = <Request, Response>({
  endpoint,
  method,
  options,
}: useAPIMutationProps<Response>) => {
  const setAlert = useAlertContext();

  const { URI, sessionToken } = useRequestBuilder({
    endpoint: endpoint,
    method: method,
  });

  const fetcher = async (endpoint: string, { arg }: { arg: Request }) => {
    return await axios({
      method: method,
      url: URI,
      data: arg,
      headers: {
        Authorization: sessionToken,
      },
    }).then((res) => res.data);
  };

  const { trigger, data, error, isMutating, reset } = useSWRMutation(
    endpoint,
    fetcher,
    {
      throwOnError: false,
    }
  );

  const response: useAPIMutationResponse<Response> = useMemo(() => {
    if (isMutating) {
      return { status: "loading" };
    }

    if (!data && !error) {
      return null;
    }

    if (data) {
      options?.onSucceeded && options?.onSucceeded(data);

      return {
        status: "succeeded",
        statusCode: 200,
        body: data,
      };
    }

    if (error) {
      setAlert({
        variant: "failed",
        value: error.response.data.error.message,
      });

      return {
        status: "failed",
        statusCode: error.response.status,
        body: error.response.data,
      };
    }
  }, [isMutating, data, error]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(undefined);
      reset();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [response]);

  return { trigger, response };
};

export default useAPIMutation;
