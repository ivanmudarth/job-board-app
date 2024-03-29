import { Flex, Box, Spacer, Link, HStack } from "@chakra-ui/react";

function Navbar(props) {
  return (
    <Flex p={6} bg="gray.50" justifyContent="center">
      <HStack>
        <Box>
          <Link href={`/home/${props.user_id}`}>Home</Link>
        </Box>
        <Spacer />
        <Spacer />
        <Spacer />
        <Box>
          <Link href={`/filter/${props.user_id}`}>Filter</Link>
        </Box>
        <Spacer />
        <Spacer />
        <Spacer />
        <Box>
          <Link href={`/postjob/${props.user_id}`}>Post Job</Link>
        </Box>
        <Spacer />
        <Spacer />
        <Spacer />
        <Box>
          <Link href={`/`}>Log Out</Link>
        </Box>
      </HStack>
    </Flex>
  );
}

export default Navbar;
