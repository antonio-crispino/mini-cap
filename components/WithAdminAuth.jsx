import { useRouter } from "next/router";
import { useAppContext } from "../context/context";
import ErrorCatcher from "./ErrorCatcher";
import SupaClient from "../utils/supabase";

let administratorIds = []; // Create array to store administrator IDs

/**
 * Fetch the administrator IDs from the database and store them in the
 * above array to use later.
 */
async function fetchAdministrators() {
  const client = new SupaClient();
  const { data: adminArray } = await client.supaGetAdministrators();
  administratorIds = adminArray.map((admin) => admin.id);
}

fetchAdministrators(); // Call the above function to store the administratorIds array

/**
 * Checks if the argument ID is in the administratorIds array.
 * Validates administrator.
 */
function isAdmin(adminID) {
  return administratorIds.includes(adminID);
}

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

    if (!isAdmin(user.id)) {
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
