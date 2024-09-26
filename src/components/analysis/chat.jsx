import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { BiSolidSend as SendIcon } from "react-icons/bi";

import { AiOutlineLoading3Quarters as Loading } from "react-icons/ai";
import { message } from "antd";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.04);
  aspect-ratio: 13/16;
  width: 300px;
  position: fixed;
  right: 40px;
  bottom: 40px;
  border-radius: 30px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  transition: transform 1s ease, width 1s ease;

  &:hover {
    width: 600px;
    .content {
      height: 610px;
    }
  }

  .header {
    color: #fff;
    display: flex;
    padding: 20px;
    align-items: center;
  }

  #pfpname {
    transition: letter-spacing 0.3s ease;
  }
  #pfpname:hover {
    letter-spacing: 2px;
  }

  .header .pfp {
    aspect-ratio: 1;
    width: 40px;
    border-radius: 100%;
    cursor: pointer;
    transition: transform 1s ease;
  }
  .pfp:hover {
    transform: scale(1.2);
  }

  .header .center {
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
  }

  .header .center div p {
    margin: 0;
    font-weight: 700;
  }

  .footer {
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0;
    display: inline-flex;
    align-items: center;
  }

  .text-box {
    float: right;
    border-radius: 100px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    background: none;
    padding: 8px 10px;
    width: 75%;
    outline: none;
    color: #fff;
    transition: transform 1s ease, width 1s ease;
    padding-right: 50px;
  }
  .text-box:hover {
    width: 90%;
  }

  .send-ico {
    color: #fff;
    position: absolute;
    right: 0;
    background: #012b39;
    border-radius: 100%;
    margin-right: 15px;
    display: flex;
    margin-top: 2px;
    align-items: center;
    justify-content: center;
    padding: 7px;
    cursor: pointer;
  }

  .text-box::placeholder {
    color: #c6c6c6;
    font-family: BraahOne;
  }

  .content {
    width: 100%;
    bottom: 100px;
    position: absolute;
    height: 270px;
    text-align: justify;
    color: #afafaf;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
    scroll-behavior: smooth;
  }

  .msg-btn {
    color: #fff;
    word-wrap: break-word;
    border-radius: 10px;
    display: block;
    max-width: 80%;
    font-size: 14px;
    font-family: "BraahOne";
  }
  .msg-btn p {
    padding: 10px 15px;
    margin: 0;
    white-space: pre-wrap;
  }

  .receiver-msg {
    background: #4c4c4c;
    float: left;
  }
  .sender-msg {
    background: #012b39;
    float: right;
  }

  .loading-svg {
    animation: rotate 1s infinite;
  }
  @keyframes rotate {
    from {
      rotate: 0deg;
    }

    50% {
      scale: 1 1.5;
    }

    to {
      rotate: 360deg;
    }
  }
`;
const Chat = ({ data, sendUserMessage }) => {
  const scrollRef = useRef();
  const [sending, setSending] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  const chatData = useMemo(() => {
    if (data) {
      return data.chat.map((message, index) => ({
        by: message[0],
        message: message[2],
      }));
    }
    return [];
  }, [data]);

  const ScrollToBottom = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };
  useEffect(() => {
    ScrollToBottom();
  }, [chatData]);

  const sendMessage = async () => {
    if (sending) {
      return;
    }

    if (!userMessage) {
      message.error("Message cannot be empty");
      return;
    }
    message.info("Analyzing the case may take a few seconds");

    setSending(true);

    await sendUserMessage(userMessage, setUserMessage);

    setSending(false);
  };

  return (
    <Container
      onMouseEnter={ScrollToBottom}
      onMouseLeave={() => setTimeout(ScrollToBottom, 1000)}
    >
      <div class="content" ref={scrollRef}>
        <div
          style={{
            padding: 11,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {chatData.map((message, index) => {
            if (message.by === "user") {
              return (
                <div>
                  <div class="sender-msg msg-btn">
                    <p>{message.message}</p>
                  </div>
                </div>
              );
            }
            return (
              <div>
                <div class="receiver-msg msg-btn">
                  <p>
                    {/* {message.message} */}

                    <Markdown rehypePlugins={[rehypeHighlight]}>
                      {message.message}
                    </Markdown>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div class="footer">
        <div style={{ width: "100%", padding: "11px" }}>
          <input
            placeholder="Message"
            class="text-box"
            name="message"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <div class="send-ico" onClick={sendMessage}>
            {sending ? (
              <Loading fontSize={16} className="loading-svg" />
            ) : (
              <SendIcon fontSize={16} />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Chat;
