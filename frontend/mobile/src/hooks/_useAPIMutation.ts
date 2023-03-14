import axios from "axios";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Endpoints } from "../enums";
import useSWRMutation from "swr/mutation";
import useAlertContext from "./useAlertContext";

const backendURL = Constants.expoConfig.extra.API_URL + "/en";

interface useAPIMutationProps<Response> {
  endpoint: Endpoints;
  method: "POST";
  onSucceeded?: (data: Response) => void;
  sessionToken?: string;
}

interface useAPIMutationResponse<Response> {
  status?: "loading" | "succeeded" | "failed";
  statusCode?: number;
  body?: Response;
}

const useAPIMutation = <Request, Response>({
  endpoint,
  method,
  onSucceeded,
  sessionToken,
}: useAPIMutationProps<Response>) => {
  const setAlert = useAlertContext();

  const [response, setResponse] = useState<useAPIMutationResponse<Response>>();

  const fetcher = async (endpoint: string, { arg }: { arg: Request }) => {
    const fullEndpoint = backendURL + endpoint;

    return await axios({
      method: method,
      url: fullEndpoint,
      data: arg,
      headers: {
        Authorization: `Bearer ${sessionToken}`,
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

  useEffect(() => {
    if (data && !isMutating) {
      setResponse({
        status: "succeeded",
        statusCode: 200,
        body: data,
      });

      onSucceeded && onSucceeded(data);
    }

    if (error && !isMutating) {
      setResponse({
        status: "failed",
        statusCode: error.response.status,
        body: error.response.data,
      });

      setAlert({
        variant: "failed",
        value: error.response.data.error.message,
      });
    }

    if (isMutating) {
      setResponse({
        status: "loading",
      });
    }

    //reset SWR things & the status
    const timeout = setTimeout(() => {
      setAlert(undefined);
      reset();
      setResponse({
        ...response,
        status: undefined,
      });
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isMutating]);

  return { trigger, response };
};

export default useAPIMutation;
