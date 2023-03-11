import axios from "axios";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Endpoints } from "../enums";
import useSWRMutation from "swr/mutation";

const backendURL = Constants.expoConfig.extra.API_URL + "/en";

interface useAPIMutationProps<Request> {
  endpoint: Endpoints;
  method: "POST";
  body?: Request;
}

interface useAPIMutationResponse<Response> {
  status?: "loading" | "succeeded" | "failed";
  statusCode?: number;
  body?: Response;
}

const useAPIMutation = <Request, Response>({
  endpoint,
  method,
}: useAPIMutationProps<Request>) => {
  const [response, setResponse] = useState<useAPIMutationResponse<Response>>();

  const fetcher = async (endpoint: string, { arg }: { arg: Request }) => {
    const fullEndpoint = backendURL + endpoint;

    return await axios({
      method: method,
      url: fullEndpoint,
      data: arg,
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
    }

    if (error && !isMutating) {
      setResponse({
        status: "failed",
        statusCode: error.response.status,
        body: error.response.data,
      });
    }

    if (isMutating) {
      setResponse({
        status: "loading",
      });
    }

    //reset SWR things & the status
    const timeout = setTimeout(() => {
      reset();
      setResponse({
        ...response,
        status: undefined,
      });
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isMutating]);

  return { trigger, response };
};

export default useAPIMutation;
