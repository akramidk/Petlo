import { useEffect } from "react";
import { useCustomerContext } from "../../src/hooks";
import Loading from "../Loading";

const SignOut = () => {
  const { clearCustomer } = useCustomerContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearCustomer();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <Loading />;
};

export default SignOut;
