import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
    setUser,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.clear();
    setUser(null);
    setChats([]);
    setNotification([]);
    
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.900"
        w="100%"
        p="5px 10px"
        borderWidth="0px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button onClick={onOpen} colorScheme="blue" variant="solid" m={1} p={2}>
            <i className="fas fa-search"></i>
           <Text d={{ base: "none", md: "flex" }} p={1} color="white">
  Search User
</Text>

          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans" color='white' fontWeight="bold">
          Pulse Connect
        </Text>
        <div className="bg-gray-900">
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} color="white" />
            </MenuButton>
            <MenuList pl={2} bg="gray.900" borderColor="gray.800">
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                  bg="gray.900"
                  _hover={{ bg: "gray.800" }}
                  color="white"
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="gray.500" rightIcon={<ChevronDownIcon />} _hover={{ bg: "purple.500" }}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
                _hover={{ bg: "purple.500" }}
              />
            </MenuButton>
            <MenuList bg="gray.900" borderColor="gray.800">
  <ProfileModal user={user}>
    <MenuItem
      color="white"
      _hover={{ color: "white", bg: "purple.500" }}
    >
      My Profile
    </MenuItem>
  </ProfileModal>
  <MenuDivider />
  <MenuItem
    onClick={logoutHandler}
    color="white"
    _hover={{ color: "white", bg: "purple.500" }}
  >
    Logout
  </MenuItem>
</MenuList>

          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="gray.900">
          <DrawerHeader borderBottomWidth="1px" borderBottomColor="gray.800" color="white">
            Search Users
          </DrawerHeader>
          <DrawerBody bg="gray.900" color="white">
            <Box d="flex" justifyContent="space-between"pb={2} bg="gray.700" borderRadius="md" mb={3}>
              <Input
                placeholder="Search by name or email"
                mr={0}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                bg="gray.600"
                color="white"
                borderColor="gray.400"
                _placeholder={{ color: "gray.400" }}
              />
              <Button onClick={handleSearch} bg="blue.700" color="white">Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user1) => (
                <UserListItem
                  key={user1._id}
                  user={user1}
                  handleFunction={() => accessChat(user1._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
