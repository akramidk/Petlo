import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Endpoints } from "../enums";
import useSWRMutation from "swr/mutation";
import useAlertContext from "./useAlertContext";
import useRequestBuilder from "./useRequestBuilder";
import { ErrorResponse } from "../interfaces";

interface useAPIMutationProps {
  endpoint: Endpoints;
  method: "POST";
  options?: {
    onSucceeded?: () => void;
    withoutAuthorization?: boolean;
    overwriteSessionToken?: string;
    showFailedAlert?: boolean;
    hideFailedAlertAfter?: number;
  };
}

interface useAPIMutationResponse<Response> {
  status?: "loading" | "succeeded" | "failed";
  statusCode?: number;
  body?: Response;
  error?: ErrorResponse;
}

const useAPIMutation = <Request, Response>({
  endpoint,
  method,
  options: {
    onSucceeded,
    withoutAuthorization = false,
    overwriteSessionToken,
    showFailedAlert = true,
    hideFailedAlertAfter = 2000,
  },
}: useAPIMutationProps) => {
  const setAlert = useAlertContext();

  const { URI, sessionToken } = useRequestBuilder({
    endpoint: endpoint,
    withoutAuthorization: withoutAuthorization,
    overwriteSessionToken: overwriteSessionToken,
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

  const { trigger, data, error, isMutating } = useSWRMutation(
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

    if (data) {
      return {
        status: "succeeded",
        statusCode: 200,
        body: data,
      };
    }

    if (error) {
      return {
        status: "failed",
        statusCode: error.response.status,
        error: error.response.data.error,
      };
    }
  }, [isMutating]);

  const onFailedStatus = () => {
    console.log("response", response);
    if (showFailedAlert) {
      setAlert({
        variant: "failed",
        value: response.error.message,
        hideAfter: hideFailedAlertAfter,
      });
    }
  };

  const onSucceededStatus = () => {
    if (onSucceeded) {
      onSucceeded();
    }
  };

  useEffect(() => {
    if (!response?.status || response.status === "loading") return;

    if (response.status === "failed") {
      onFailedStatus();
      return;
    }

    if (response.status === "succeeded") {
      onSucceededStatus();
      return;
    }
  }, [response]);

  return { trigger, response };
};

export default useAPIMutation;
