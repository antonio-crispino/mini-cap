/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useAppContext } from "../context/context";
import ErrorCatcher from "./ErrorCatcher";


const withAuth = (WrappedComponent) => {

    return props => {
        const { user, isLoading } = useAppContext();
        const router = useRouter()

        if (isLoading) {
            return ''
        }
        if (!user && !isLoading) {
            return (
                <ErrorCatcher message="You need to login to view this page" callback={() => { router.push('/login') }}></ErrorCatcher>
            )
        }
        return <WrappedComponent {...props} />;
    }
}

export default withAuth;