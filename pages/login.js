import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    Text,
    SimpleGrid,
    GridItem,
    Button,
    useBreakpointValue,
    HStack,
    Link,
    createStandaloneToast,
    FormErrorMessage
} from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { useAppContext } from '../context/context';
import NextLink from "next/link"
import { useRouter } from 'next/router';


const Details = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const { setError, login } = useAppContext()
    const router = useRouter()

    const colSpan = useBreakpointValue({ base: 2, md: 1 });

    const signIn = async ({ email, password }) => {

        const error = await login(email, password)

        if (!error) {
            const toast = createStandaloneToast()
            router.push('/main')
            toast({
                title: 'logged in successful.',
                description: 'redirecting you to your profile',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }

    }

    return (
        <form onSubmit={handleSubmit((data) => { signIn(data) })}>
            <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
                <VStack spacing={3} alignItems="flex-start">
                    <Heading size="2xl">Login</Heading>
                    <Text>Need to create an account
                        click <NextLink href={'/signup'}><Link color={'blue.600'}>here to sign up</Link></NextLink>.</Text>
                </VStack>
                <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">

                    <GridItem colSpan={colSpan}>
                        <FormControl isInvalid={errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input id='email' placeholder="johndoe@test.com" type='email'
                                {...register('email', {
                                    required: 'This is required',
                                })}
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>
                    </GridItem>


                    <GridItem colSpan={colSpan}>
                        <FormControl isInvalid={errors.password}>
                            <FormLabel>Password</FormLabel>
                            <Input id='password' placeholder="" type={'password'}
                                {...register('password', {
                                    required: 'This is required',
                                    minLength: { value: 8, message: 'Minimum length should be 8' },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>
                    </GridItem>


                    <GridItem colSpan={2}>
                        <HStack gap={3} alignItems={'center'}>
                            <Button variant="solid" color="teal" size="lg" w="full" type='submit' maxWidth={'25%'}>
                                Sign In
                            </Button>

                            <Button variant="solid" colorScheme='teal' size="lg" w="full" maxWidth={'25%'} onClick={() => setError(new Error("yio"))}>
                                Create Error
                            </Button>
                        </HStack>
                    </GridItem>
                </SimpleGrid>
            </VStack>
        </form>
    );
};

export default Details;