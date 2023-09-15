import Chat from "@/components/chats/chat";
import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

const Home = () => {
  return (
    <div className="  h-screen flex items-center justify-center">
      <div className="flex h-full py-10 px-36 bg-black shadow-2xl  w-full ">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
