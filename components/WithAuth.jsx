import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";
import ErrorCatcher from "./ErrorCatcher";

const withAuth = (WrappedComponent) =>
  function (props) {
    const { user, isLoading } = useAppContext();
    const router = useRouter();

    if (isLoading) {
      return "";
    }
    if (!user && !isLoading) {
      return (
        <ErrorCatcher
          message="You need to login to view this page"
          callback={() => {
            router.push("/login");
          }}
        />
      );
    }
    return <WrappedComponent {...props} />;
  };

export default withAuth;
