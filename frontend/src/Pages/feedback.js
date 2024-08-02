import React from "react";
import { Box, VStack, Heading, FormControl, FormLabel, Input, Textarea, Button, useToast } from "@chakra-ui/react";

export default function Contact() {
  const [result, setResult] = React.useState("");
  const toast = useToast();

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "3ea4b0f5-77c9-41f4-bf7b-c6b0dbc287a1");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Submitted Successfully! Thank you for your feedback.");
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      event.target.reset();
    } else {
      console.error("Error", data);
      setResult(data.message);
      toast({
        title: "Error",
        description: data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      w="full"
      alignItems="center"
      height="100vh"
      bgGradient="linear(to-r, teal.500, blue.500)"
      p={4}
    >
      <Box
        bg="gray.700"
        textColor="white"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        width="100%"
        maxWidth="md"
        textAlign="center"
      >
        <Heading mb={6} size="lg" color="teal.600">
          Share Your Feedback
        </Heading>
        <form onSubmit={onSubmit} className="space-y-6">
          <VStack spacing="24px">
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                required
                textColor="white"
                placeholder="Enter Your Name"
                borderColor="teal.500"
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                name="email"
                required
                textColor="white"
                placeholder="Enter Your Email Address"
                borderColor="teal.500"
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id="message" isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea
                name="message"
                rows={8}
                required
                textColor="white"
                placeholder="Enter Your Message"
                borderColor="teal.500"
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              width="full"
              mt={4}
            >
              Submit
            </Button>
            {result && (
              <Box mt={4} textAlign="center">
                {result}
                {result !== "" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    alignItems="center"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-smile inline-block align-middle ml-2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                )}
              </Box>
            )}
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
