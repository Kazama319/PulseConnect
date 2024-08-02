import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (

   <div style={{ width: "100%", margin: 0, padding: 0 }}>
  {user && <SideDrawer />}
  <Box display="flex" justifyContent="flex-start" w="100%" h="93vh" p={0} m={0}>
    {user && <MyChats fetchAgain={fetchAgain}  />}
    {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}  />}
  </Box>
</div>




  );
};

export default Chatpage;
