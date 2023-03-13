import { SWRConfiguration } from "swr";
import { Endpoints } from "../../enums";

export interface useAPIFetchingProps<Request> {
  endpoint: Endpoints | null;
  body?: Request;
  SWROptions?: SWRConfiguration;
  options?: {
    wait?: boolean;
  };
}

export interface useAPIFetchingResponse<Response> {
  isFetching?: boolean;
  statusCode?: number;
  body?: Response;
}
