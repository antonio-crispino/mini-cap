/* eslint-disable react/display-name */
import { useAppContext } from "../context/context";


const withAuth = (WrappedComponent) => {

    return props => {
        const { user } = useAppContext();
        if (!user) {
            return (
                <h1>you need to login</h1>
            )
        }
        return <WrappedComponent {...props} />;
    }
}

export default withAuth;