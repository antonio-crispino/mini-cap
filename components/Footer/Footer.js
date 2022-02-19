import {
    Container,
    Box,
    Text
} from '@chakra-ui/react';

export const Footer = () => {
    return (
        <Container>
            <Box
                flexDir="column"
                align={"center"}
                fontFamily="open-sans"
                pb={10}
            >
                <Text
                >© 2022 Anti-Covid.com. All rights reserved</Text>
            </Box>
        </Container>

    );
}