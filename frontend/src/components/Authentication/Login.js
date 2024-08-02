import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack, Box, Heading } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import { set } from "mongoose";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const[guest,setguest]=useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if( guest){
          try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
            name: "Guest User",
          email,
          password,
          pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIs1XePP0G1O0AQB8x6uxPkXyY_PvXlYWGLTJWZfpios_3gsrcqX_jZz1dkxjgCZjrC-w",
        },
        config
      );

    }
    catch (error) { 
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }   }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
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
          Login to Your Account
        </Heading>
        <VStack spacing="24px">
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              value={email}
              textColor="white"
              type="email"
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
              borderColor="teal.500"
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={show ? "text" : "password"}
                placeholder="Enter password"
                borderColor="teal.500"
                _placeholder={{ color: 'gray.500' }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick} colorScheme="teal">
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            colorScheme="teal"
            width="full"
            mt={4}
            onClick={submitHandler}
            isLoading={loading}
          >
            Login
          </Button>
          <Button
            variant="outline"
            colorScheme="teal"
            width="full"
            onClick={() => {
              const random = Math.floor(Math.random() * 10000)+1;
              const email= "guest"+random+"@gmail.com";
              const password = Math.floor(Math.random() * 100000000000)+1;
              setguest(true);
              setEmail(email);
              setPassword("01"+password);
            }}
          >
            Get Guest User Credentials
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
