import {Flex, Button, ButtonGroup} from "@chakra-ui/react";
import NextLink from "next/link";

export const NavBar = () => {
    return (
        <Flex>
            <Flex
                pos={"fixed"}
                top={"1rem"}
                right={"5rem"}
                px={[0,10,20]}
            >
                <ButtonGroup >
                    <NextLink href="/" passHref>
                        <Button variant='ghost' fontFamily="open-sans" >
                            Home
                        </Button>
                    </NextLink>
                    <NextLink href="/" passHref>
                        <Button variant='ghost'>
                            QR-code
                        </Button>
                    </NextLink>
                    <NextLink href="/" passHref>
                        <Button variant='ghost'>
                            Messages
                        </Button>
                    </NextLink>
                    <NextLink href="/" passHref>
                        <Button variant='ghost'>
                            FAQ
                        </Button>
                    </NextLink>
                    <NextLink href="/" passHref>
                        <Button variant='ghost'>
                            Sign In/Sign Up
                        </Button>
                    </NextLink>
                </ButtonGroup>
            </Flex>
        </Flex>

    )
}