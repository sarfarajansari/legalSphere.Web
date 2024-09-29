import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ViewSwitch from "./viewSwitch";
import ContentSwitch from "./contentSwitch";
import { useParams } from "react-router-dom";
import { apiClient } from "../../apiClient";
import { message } from "antd";
import Background from "./background";
import Chat, { ChatProvider } from "./chat";
import { useNavigate } from "react-router-dom";
const Container = styled.div``;
const Analysis = () => {
  const [mode, setMode] = useState("Tree");
  const { id } = useParams();
  const [sendingMessage, setSendingMessage] = useState(false);

  const [data, setData] = useState(null);
  const [userMessage, setUserMessage] = useState("");
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

  const newChat = async (caseDetails) => {
    setSendingMessage(true);
    addUserMessage(caseDetails);
    setUserMessage("");
    try {
      const res = await apiClient
        .post("/new-chat", { case: caseDetails })
        .catch((e) => {
          message.error("Something went wrong");
        });

      setSendingMessage(false);
      if (!res.data) {
        return message.error("Failed to create new chat");
      }
      navigate(`/analysis/${res.data["chat_id"]}`);
    } catch (e) {
      removeUserMessage(caseDetails);
      setSendingMessage(false);
      setUserMessage(caseDetails);
      console.log(e);
      message.error("Something went wrong");
    }
  };

  const sendUserMessage = async (msg) => {
    if (sendingMessage) {
      return;
    }

    message.info("Analyzing the case may take a few seconds");

    if (id === "new-chat") {
      return newChat(msg);
    }
    setSendingMessage(true);
    addUserMessage(msg);
    setUserMessage("");

    try {
      const res = await apiClient.post(`/chat/${id}`, { message: msg });
      if (!res.data) {
        return msg.error("Failed to send message");
      }
      setData(res.data);
      setSendingMessage(false);
    } catch (e) {
      removeUserMessage(msg);
      setUserMessage(msg);
      console.log(e);
      msg.error("Something went wrong");
      setSendingMessage(false);
    }
  };
  return (
    <Container>
      <ChatProvider
        value={{
          sendUserMessage,
          setUserMessage,
          userMessage,
          sending: sendingMessage,
          setSending: setSendingMessage,
        }}
      >
        <Background mode={mode}>
          {data && <ContentSwitch mode={mode} data={data} id={id} />}
        </Background>
        <ViewSwitch setMode={setMode} mode={mode} />

        <Chat data={data} sendUserMessage={sendUserMessage} />
      </ChatProvider>
    </Container>
  );
};

export default Analysis;
