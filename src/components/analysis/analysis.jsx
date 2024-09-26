import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ViewSwitch from "./viewSwitch";
import ContentSwitch from "./contentSwitch";
import { useParams } from "react-router-dom";
import { apiClient } from "../../apiClient";
import { message } from "antd";
import Background from "./background";
import Chat from "./chat";
import { useNavigate } from "react-router-dom";
const Container = styled.div``;
const Analysis = () => {
  const [mode, setMode] = useState("Tree");
  const { id } = useParams();

  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (!id) {
        return navigate("/analysis/new-chat");
      }
      if (id === "new-chat") {
        setData({
          chat: [
            [
              "System",
              "",
              "Welcome to Legal Sphere!\nTo get started, I’ll need some basic details about your case. Please provide Brief description of the issue.",
            ],
          ],
        });
        return;
      }
      apiClient
        .get(`/analysis/${id}`)
        .then((res) => {
          if (!res.data) {
            return message.error("No data found");
          }
          setData(res.data);
        })
        .catch((e) => {
          message.error("Chat Not Found");
        });
    } catch (e) {
      // console.log(e);
      message.error("Something went wrong");
    }
  }, [id]);


  const addUserMessage = (message) => {
    setData((prev) => {
      return {
        ...prev,
        chat: [...prev.chat, ["user", "", message]],
      };
    });
  };


  const removeUserMessage = (message) => {
    setData((prev) => {
      return {
        ...prev,
        chat: prev.chat.filter((m) => m[2] !== message),
      };
    });
  };

  const newChat = async (caseDetails,setTextwindow) => {
    addUserMessage(caseDetails);
    setTextwindow("");
    try {
      const res = await apiClient.post("/new-chat", { case: caseDetails }).catch((e)=>{
        message.error("Something went wrong");
      });
      if (!res.data) {
        return message.error("Failed to create new chat");
      }
      navigate(`/analysis/${res.data["chat_id"]}`);
    } catch (e) {
      removeUserMessage(caseDetails);
      setTextwindow(caseDetails);
      console.log(e);
      message.error("Something went wrong");
    }
  };

  const sendUserMessage = async (message,setTextwindow) => {
    if(id === "new-chat"){
      return newChat(message,setTextwindow);
    }
    addUserMessage(message);
    setTextwindow("");
    try {
      const res = await apiClient.post(`/chat/${id}`, { message });
      if (!res.data) {
        return message.error("Failed to send message");
      }
      setData(res.data);
    } catch (e) {
      removeUserMessage(message);
      setTextwindow(message);
      console.log(e);
      message.error("Something went wrong");
    }
  };
  return (
    <Container>
      <Background>
        {data && <ContentSwitch mode={mode} data={data} />}
      </Background>
      <ViewSwitch setMode={setMode} />

      <Chat data={data} sendUserMessage={sendUserMessage} />
      
    </Container>
  );
};

export default Analysis;
