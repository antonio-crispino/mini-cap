import { useRouter } from "next/router";

import { useAppContext } from "../context/context";
import ErrorCatcher from "./ErrorCatcher";
import SupaClient from "../utils/supabase";

async function isAdmin(adminID) {
  const client = new SupaClient();

  const { data: administratorArray, error } =
    await client.supaGetAdministrators();

  if (error) {
    throw new Error(error);
  }

  for (let index = 0; index < administratorArray.length; index += 1) {
    if (administratorArray[index].id === adminID) {
      return true;
    }
  }

  return false;
}

const withAdminAuth = (WrappedComponent) =>
  function (props) {
    const { user, isLoading } = useAppContext();
    const router = useRouter();

    if (isLoading) {
      return "";
    }

    if (isAdmin(user.id)) {
      return (
        <ErrorCatcher
          message="You need to be an admin to view this page!!!"
          callback={() => {
            router.push("/main");
          }}
        />
      );
    }

    return <WrappedComponent {...props} />;
  };

export default withAdminAuth;
