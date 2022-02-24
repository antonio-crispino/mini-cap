import { useState } from "react";
import { Flex, Button, IconButton, ButtonGroup } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export function NavBar() {
  const [display, changeDisplay] = useState("none");
  return (
    <Flex fontFamily="open-sans">
      <Flex position="fixed" top="1rem" right="1rem">
        {/* Desktop Version */}
        <Flex display={["none", "none", "flex", "flex"]}>
          <ButtonGroup>
            <NextLink href="/" passHref>
              <Button
                variant="ghost"
                _hover={{ textDecoration: "underline" }}
                color="white"
                fontFamily="opensans-bold"
              >
                Home
              </Button>
            </NextLink>
            <NextLink href="/" passHref>
              <Button
                variant="ghost"
                _hover={{ textDecoration: "underline" }}
                color="white"
                fontFamily="opensans-bold"
              >
                QR-code
              </Button>
            </NextLink>
            <NextLink href="/" passHref>
              <Button
                variant="ghost"
                _hover={{ textDecoration: "underline" }}
                color="white"
                fontFamily="opensans-bold"
              >
                Messages
              </Button>
            </NextLink>
            <NextLink href="/" passHref>
              <Button
                variant="ghost"
                _hover={{ textDecoration: "underline" }}
                color="white"
                fontFamily="opensans-bold"
              >
                FAQ
              </Button>
            </NextLink>
            <NextLink href="/signup" passHref>
              <Button
                variant="ghost"
                _hover={{ textDecoration: "underline", outline: "none" }}
                color="white"
                fontFamily="opensans-bold"
              >
                Sign In/Sign Up
              </Button>
            </NextLink>
          </ButtonGroup>
        </Flex>

        {/* Mobile */}
        <IconButton
          aria-label="Hamburger Menu Icon"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          onClick={() => changeDisplay("flex")}
          display={["flex", "flex", "none", "none"]}
        />
      </Flex>

      {/* Mobile Content */}
      <Flex
        w="100vw"
        display={display}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
      >
        <Flex justify="flex-end">
          <IconButton
            aria-label="Close Hamburger Menu"
            mt={4}
            mr={6}
            size="lg"
            icon={<CloseIcon />}
            onClick={() => changeDisplay("none")}
          />
        </Flex>

        <Flex flexDir="column" align="center">
          <ButtonGroup flexDir="column">
            <NextLink href="/" passHref>
              <Button
                variant="ghost"
                _hover={{ textDecoration: "underline" }}
                color="white"
                fontFamily="opensans-bold"
              >
                Home
              </Button>
            </NextLink>
            <NextLink href="/" passHref>
              <Button
                variant="ghost"
                _hover={{ textDecoration: "underline" }}
                color="white"
                fontFamily="opensans-bold"
              >
                QR-code
              </Button>
            </NextLink>
            <NextLink href="/" passHref>
              <Button
                variant="ghost"
                _hover={{ textDecoration: "underline" }}
                color="white"
                fontFamily="opensans-bold"
              >
                Messages
              </Button>
            </NextLink>
            <NextLink href="/" passHref>
              <Button
                variant="ghost"
                _hover={{ textDecoration: "underline" }}
                color="white"
                fontFamily="opensans-bold"
              >
                FAQ
              </Button>
            </NextLink>
            <NextLink href="/" passHref>
              <Button
                variant="ghost"
                _hover={{ textDecoration: "underline" }}
                color="white"
                fontFamily="opensans-bold"
              >
                Sign In/Sign Up
              </Button>
            </NextLink>
          </ButtonGroup>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default NavBar;
