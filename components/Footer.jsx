import { Container, Flex, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Container>
      <Flex
        position="fixed"
        bottom="1rem"
        left="1rem"
        fontFamily="open-sans"
        pb={10}
      >
        <Text>© 2022 Anti-Covid.com. All rights reserved</Text>
      </Flex>
    </Container>
  );
}

export default Footer;
