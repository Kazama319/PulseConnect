import React from "react";
import { Box, Flex, Text, Button, Image, VStack, HStack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import feeback from "./feedback.js";
const HomePage = () => {
  const history = useHistory();
  const handleSignUpClick = () => {
    history.push('/signup'); // Navigate to the signup page
  };
  const loginup = () => {
    history.push('/login'); // Navigate to the login page
  };
  const handleFeedbackClick = () => {
    // Handle feedback button click
    history.push('/feedback'); // Navigate to the feedback page
  };

  return (
    <Box bg="gray.900" color="white" minH="100vh" p={4} position="relative">
      <Flex direction={{ base: "column", md: "row" }} align="center" justify="center" w="full" spacing={4}>
        {/* Left Section */}
        <VStack spacing={8} textAlign="center" flex="1" maxW="full">
          <Text fontSize="5xl" fontWeight="bold" color="teal.400">
            Welcome to Pulse Connect
          </Text>
          <Text fontSize="xl" color="gray.300">
            Connect with your friends and family seamlessly. Experience the best chat application with real-time messaging, groups, and more.
          </Text>
          <HStack spacing={4}>
            <Button colorScheme="teal" variant="solid" size="lg" onClick={loginup}>
              Login
            </Button>
            <Button colorScheme="teal" variant="outline" size="lg" onClick={handleSignUpClick}>
              Sign Up
            </Button>
          </HStack>
        </VStack>
        {/* Right Section */}
        <Box
          position="relative"
          flex="1"
          maxW="700px"
          w="full"
          h="full"
          ml={{ base: 0, md: 4 }}
        >
          <Image
            src="https://i.imgur.com/U3vTGjX.png" // Replace with your chat app image URL
            alt="Chat App"
            borderRadius="md"
            boxShadow="lg"
            objectFit="cover"
            w="85%"
            h="85%"
          />
          <VStack
            position="absolute"
            top="20%"
            left="5%"
            spacing={4}
            align="flex-start"
            bg="gray.800"
            p={4}
            borderRadius="md"
            boxShadow="lg"
            maxW="300px"
          >
            <HStack align="flex-start">
              <Box bg="teal.500" p={3} borderRadius="md" color="white">
                Hey! How are you?
              </Box>
            </HStack>
            <HStack align="flex-start">
              <Box bg="gray.700" p={3} borderRadius="md" color="white">
                I'm good, how about you?
              </Box>
            </HStack>
            <HStack align="flex-start">
              <Box bg="teal.500" p={3} borderRadius="md" color="white">
                Doing great! Let's catch up soon.
              </Box>
            </HStack>
          </VStack>
        </Box>
      </Flex>
      {/* Feedback Button */}
      <Flex position="absolute" bottom={4} w="full" justify="center">
        <Button
          colorScheme="teal"
          variant="solid"
          size="lg"
          onClick={handleFeedbackClick}
        >
          Give Us Feedback
        </Button>
      </Flex>
    </Box>
  );
};

export default HomePage;
