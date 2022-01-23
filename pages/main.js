import withAuth from "../components/WithAuth"
import { useAppContext } from "../context/context"
import {
    VStack, Button, Heading, createStandaloneToast,
} from "@chakra-ui/react"
import { useRouter } from 'next/router';

function Main() {
    const { logout } = useAppContext()
    const router = useRouter()


    const signout = async () => {
        const error = await logout()

        if (!error) {
            const toast = createStandaloneToast()
            toast({
                title: 'logout in successful.',
                description: 'redirecting you home page',
                status: 'success',
                duration: 6000,
                isClosable: true,
            })
            router.push('/')
        }

    }


    return (
        <>
            <>
                <VStack gap={3} alignItems={'center'}>
                    <Heading as='h2' > Hello {user.firstname} {user.lastname}</Heading>

                    <Button variant="solid" color="teal" size="lg" w="full" type='submit' maxWidth={'25%'} onClick={async () => signout()}>
                        Logout
                    </Button>
                </VStack>
            </>
        </>
    )
}

export default withAuth(Main)