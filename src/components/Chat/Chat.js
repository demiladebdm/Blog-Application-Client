import React from "react";

import chatImg from "../../assets/chat.png";
import "./Chat.css";

const Chat = () => {
  // const whatsappNumber = "+9039984143";
  const whatsappNumber = "+8101591413";
  const emailAddress = "wolstreetfinance@gmail.com";

  const handleChat = () => {
    // // const whatsappLink = `https://wa.me/${whatsappNumber}`;
    // const whatsappLink = `https://web.whatsapp.com/send?phone=${whatsappNumber}`;
    // window.open(whatsappLink, "_blank");

    const mailtoLink = `mailto:${emailAddress}`;
    window.location.href = mailtoLink;
  };

  return (
    <section className="chat">
      <section className="chat__image" onClick={handleChat}>
        <h1 className="chat__text">Chat with us</h1>
        <img src={chatImg} alt="Chat" />
      </section>
    </section>
  );
};

export default Chat;
