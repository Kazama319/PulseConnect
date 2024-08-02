import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
          backgroundColor="black"
          color="white"
          _hover={{ backgroundColor: "gray.700" }}
        />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          h="450px"
          backgroundColor="gray.900"
          color="white"
          borderRadius="15px"
          boxShadow="lg"
        >
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
            borderBottom="1px solid"
            borderColor="gray.700"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            padding="20px"
          >
            <Box
              borderRadius="full"
              overflow="hidden"
              boxSize="150px"
              mb={4}
              boxShadow="0 0 10px rgba(255, 255, 255, 0.5)"
            >
              <Image
                borderRadius="full"
                boxSize="150px"
                src={user.pic}
                alt={user.name}
              />
            </Box>
            <Text
              fontSize={{ base: "24px", md: "26px" }}
              fontFamily="Work sans"
              textAlign="center"
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter borderTop="1px solid" borderColor="black">
            <Button
              onClick={onClose}
              backgroundColor="black"
              color="white"
              _hover={{ backgroundColor: "gray.600" }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
