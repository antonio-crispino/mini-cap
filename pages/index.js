import NextLink from "next/link"
import { Container, Link, Flex, Box, Heading, Spacer, Button } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <>
    <Container maxW='container.xl' centerContent>
      <Flex h="100vh" alignItems={'center'}>
          <Sidebar />
          <Box p='2'>
            <Heading size='md'>mini cap</Heading>
          </Box>
          <Spacer />
          <Box>
            <Button colorScheme='teal' mr='4'>
              <NextLink href='/signup'>
                <Link >Sign up</Link>
              </NextLink>
            </Button>
            <Button colorScheme='teal'>
            <NextLink href='/login'>
                <Link >Login in</Link>
              </NextLink>
            </Button>
          </Box>
        </Flex>
    </Container>
    </>
  )
}