import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Endpoints } from "../enums";
import useSWRMutation from "swr/mutation";
import useAlertContext from "./useAlertContext";
import useRequestBuilder from "./useRequestBuilder";
import { ErrorResponse } from "../interfaces";

interface useAPIMutationProps {
  endpoint: Endpoints;
  method: "POST" | "PATCH" | "DELETE";
  slugs?: { [key: string]: string };
  options?: {
    onSucceeded?: () => void;
    onFailed?: () => void;
    fireOnSucceededAfter?: number;
    fireOnFailedAfter?: number;
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
  slugs,
  options: {
    onSucceeded,
    onFailed,
    fireOnSucceededAfter = 0,
    fireOnFailedAfter = 0,
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

  const SWREndpoint = useMemo(() => {
    let endpointWithSlugs = endpoint as string;
    if (slugs) {
      Object.keys(slugs).forEach((slug) => {
        endpointWithSlugs = endpointWithSlugs.replaceAll(
          "${" + slug + "}",
          slugs[slug]
        );
      });
    }

    return endpointWithSlugs;
  }, [endpoint, slugs]);

  const { URI, sessionToken } = useRequestBuilder({
    endpoint: SWREndpoint,
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
    SWREndpoint,
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
      //don't remove it plz
      console.log("error", error.response);

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

    if (onFailed) {
      setTimeout(() => {
        onFailed();
      }, fireOnFailedAfter);
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
