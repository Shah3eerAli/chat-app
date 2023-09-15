"use client";
import { dp, dp1 } from "@/assets";
import {
  ListFilter,
  MessageSquare,
  MessageSquareDashed,
  MessageSquarePlus,
  MoreVertical,
  Search,
  SearchIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ActiveChats from "./activeChats";
import ArchievedChats from "./archievedChats";
import Me from "./me";
import { API } from "@/api";
import { useMyContext } from "../../context/MyContext";
import NewChats from "./newChats";

const Sidebar = () => {
  const { value, setValue } = useMyContext();
  const [addUsers, setAddUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [openedChat, setOpenedChat] = useState();
  const [allChat, setAllChat] = useState();
  const [profile, setProfile] = useState(false);

  const createNewChat = async (recipient) => {
    console.log(recipient);
    try {
      const res = await API.createNewChat(recipient.id);
      console.log(res?.data?.data?.chatId);
      recipient.chatId = res?.data?.data?.chatId;
      console.log(recipient);
      setValue(recipient);
      setAddUsers(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async () => {
    try {
      const res = await API.getAllUsers();
      if (res) {
        console.log(res);
        setUsers(res?.data?.data);
      }
      setAddUsers(true);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {profile ? (
        <Me setProfile={setProfile} />
      ) : addUsers ? (
        <NewChats
          createNewChat={createNewChat}
          data={users}
          setAddUsers={setAddUsers}
        />
      ) : (
        <div className="flex flex-col min-w-[15vw] h-full bg-[#111b21] ">
          <div className="flex items-center max-h-20 bg-[#343f46] p-4 ">
            <Image
              src={dp1}
              alt=""
              height={250}
              width={250}
              className="rounded-full h-12 w-12 hover: cursor-pointer"
              onClick={() => setProfile(true)}
            />
            <div className="flex-1 flex justify-end text-gray-500">
              <MessageSquarePlus
                className="hover:text-gray-600 cursor-pointer"
                onClick={addUser}
              />
              <MoreVertical className="ml-2 hover:text-gray-600 cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center justify-center h-12 w-full p-2 text-gray-600">
            <div className="bg-[#343f46] flex py-2  rounded-xl justify-between px-4 items-center w-full">
              <Search size={15} />
              <input
                className="ml-2 text-xs flex-1 bg-[#343f46] outline-none text-gray-600"
                placeholder="Search or start new chat"
              />
            </div>
            <ListFilter className="ml-2 hover: cursor-pointer" size={20} />
          </div>

          <div className="flex flex-col px-2">
            <ActiveChats setValue={setValue} value={value} />
            {/* <ArchievedChats /> */}
          </div>
        </div>
      )}
      ;
    </div>
  );
};
export default Sidebar;
