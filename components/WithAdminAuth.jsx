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

  // if (!administratorArray) return false;

  for (let index = 0; index < administratorArray.length; index += 1) {
    // console.log(administratorArray[index].id);
    // console.log(adminID);

    if (administratorArray[index].id === adminID) {
      console.log("isTrue");
      return true;
    }
  }
  console.log("isFalse");

  return false;
}

const withAdminAuth = (WrappedComponent) =>
  function (props) {
    const { user, isLoading } = useAppContext();
    const router = useRouter();

    if (isLoading) {
      console.log("isLoading");

      return "";
    }

    console.log("result", isAdmin(user.id));

    const val = isAdmin(user.id).then(() => true);
    if (val) {
      console.log(val);

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
