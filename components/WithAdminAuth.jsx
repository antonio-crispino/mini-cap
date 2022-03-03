import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";
import ErrorCatcher from "./ErrorCatcher";

/**
 * Redirects user if not an Administrator.
 */
const withAdminAuth = (WrappedComponent) =>
  function (props) {
    const { user, isLoading } = useAppContext();
    const router = useRouter();

    if (isLoading) {
      return "";
    }

    if (!user?.user_type === "administrator") {
      return (
        <ErrorCatcher
          message="You must be an administrator to view this page!"
          callback={() => {
            router.push("/main");
          }}
        />
      );
    }
    return <WrappedComponent {...props} />;
  };

export default withAdminAuth;
