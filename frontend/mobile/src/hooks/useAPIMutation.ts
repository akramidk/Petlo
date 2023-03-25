import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Endpoints } from "../enums";
import useSWRMutation from "swr/mutation";
import useAlertContext from "./useAlertContext";
import useRequestBuilder from "./useRequestBuilder";
import { ErrorResponse } from "../interfaces";

interface useAPIMutationProps {
  endpoint: Endpoints;
  method: "POST" | "PATCH" | "DELETE" | "GET";
  options?: {
    onSucceeded?: () => void;
    fireOnSucceededAfter?: number;
    withoutAuthorization?: boolean;
    overwriteSessionToken?: string;
    showFailedAlert?: boolean;
    hideFailedAlertAfter?: number;
    resetFailedStatusAfter?: number;
    resetSucceededStatusAfter?: number;
    preventSucceededStatus?: boolean;
  };
}

type status = "loading" | "succeeded" | "failed";
interface useAPIMutationResponse<Response> {
  status?: status;
  statusCode?: number;
  body?: Response;
  error?: ErrorResponse;
}

const useAPIMutation = <Request, Response>({
  endpoint,
  method,
  options: {
    onSucceeded,
    fireOnSucceededAfter = 0,
    withoutAuthorization = false,
    overwriteSessionToken,
    showFailedAlert = true,
    hideFailedAlertAfter = 2000,
    resetFailedStatusAfter = 2000,
    resetSucceededStatusAfter = 2000,
    preventSucceededStatus = false,
  },
}: useAPIMutationProps) => {
  const [status, setStatus] = useState<status>();
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
        Authorization: `bearer ${sessionToken}`,
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
        error: error.response.data,
      };
    }
  }, [isMutating]);

  const onLoadingStatus = () => {
    setStatus("loading");
  };

  const onFailedStatus = () => {
    setStatus("failed");

    if (showFailedAlert) {
      setAlert({
        variant: "failed",
        value: response.error.error.message,
        hideAfter: hideFailedAlertAfter,
      });
    }

    setTimeout(() => {
      setStatus(undefined);
    }, resetFailedStatusAfter);
  };

  const onSucceededStatus = () => {
    if (!preventSucceededStatus) {
      setStatus("succeeded");
    }

    if (onSucceeded) {
      setTimeout(() => {
        onSucceeded();
      }, fireOnSucceededAfter);
    }

    setTimeout(() => {
      setStatus(undefined);
    }, resetSucceededStatusAfter);
  };

  useEffect(() => {
    if (!response?.status) return;

    if (response.status === "loading") {
      onLoadingStatus();
      return;
    }

    if (response.status === "failed") {
      onFailedStatus();
      return;
    }

    if (response.status === "succeeded") {
      onSucceededStatus();
      return;
    }
  }, [response]);

  return { trigger, response, status };
};

export default useAPIMutation;
