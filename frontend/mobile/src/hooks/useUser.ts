import { useEffect, useState } from "react";
import { StorageKeys } from "../enums";
import * as SecureStore from "expo-secure-store";

const useUser = () => {
  const [sessionToken, setSessionToken] = useState<undefined | string>();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    (async () => {
      setSessionToken(
        await SecureStore.getItemAsync(StorageKeys.SESSION_TOKEN)
      );
    })();
  }, []);

  useEffect(() => {
    if (sessionToken === null) {
      setUser(null);
    }
  }, [sessionToken]);

  return { user };
};

export default useUser;
