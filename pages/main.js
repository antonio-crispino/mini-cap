import withAuth from "../components/WithAuth"
import { useAppContext } from "../context/context"
import {
    HStack, Button, Box, createStandaloneToast,
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
            <HStack gap={3} alignItems={'center'}>
                <Button variant="solid" color="teal" size="lg" w="full" type='submit' maxWidth={'25%'} onClick={async () => signout()}>
                    Logout
                </Button>
                <Box> Main</Box>
            </HStack>
        </>
    )
}

export default withAuth(Main)