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
import { useRouter } from 'next/router';
import { useAppContext } from '../context/context';
import NextLink from "next/link"
import { supabase } from "../utils/supabaseClient";

const Signup = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const { setError, setMessage } = useAppContext()
    const colSpan = useBreakpointValue({ base: 2, md: 1 });
    const router = useRouter()

    const signup = async ({email, password, firstname, lastname}) => {
        const { user, error } = await supabase.auth.signUp({
            email,
            password
        })
        if (error) {
            setError(error)
            return
        }
        const { createUserError } = await supabase
            .from('users')
            .insert([
                { firstname, lastname, id: user.id }
            ])
        if(createUserError){
            setError(createUserError)
        }

        await router.push('/login')

        const toast = createStandaloneToast()
        
        toast({
          title: 'Account created.',
          description: 'You can now login',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
    }


    return (
        <form onSubmit={handleSubmit((data) => signup(data))}>
            <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
                <VStack spacing={3} alignItems="flex-start">
                    <Heading size="2xl">Your details</Heading>
                    <Text>If you already have an account,
                        click <NextLink href={'/login'}><Link color={'blue.600'}>here to log in</Link></NextLink>.</Text>
                </VStack>
                <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">

                    <GridItem colSpan={colSpan}>
                        <FormControl isInvalid={errors.firstname}>
                            <FormLabel>First Name</FormLabel>
                            <Input id="firstname" placeholder="John"
                                {...register('firstname', {
                                    required: 'This is required',
                                    minLength: { value: 2, message: 'Minimum length should be 2' },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.firstname && errors.firstname.message}
                            </FormErrorMessage>
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={colSpan}>
                        <FormControl isInvalid={errors.lastname}>
                            <FormLabel>Last Name</FormLabel>
                            <Input id='lastname' placeholder="Doe"
                                {...register('lastname', {
                                    required: 'This is required',
                                    minLength: { value: 2, message: 'Minimum length should be 2' },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.lastname && errors.lastname.message}
                            </FormErrorMessage>
                        </FormControl>
                    </GridItem>


                    <GridItem colSpan={colSpan}>
                        <FormControl isInvalid={errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input id="email" placeholder="johndoe@test.com" type={'email'}
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
                            <Input id="password" placeholder="" type={'password'}
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
                                Sign Up
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




export default Signup;