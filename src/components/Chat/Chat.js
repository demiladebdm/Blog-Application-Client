import React from "react";

import chatImg from "../../assets/chat.png";
import "./Chat.css"

const Chat = () => {
  const whatsappNumber = "+9039984143";

  const handleChat = () => {
    // const whatsappLink = `https://wa.me/${whatsappNumber}`;
    const whatsappLink = `https://web.whatsapp.com/send?phone=${whatsappNumber}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <section className="chat__image" onClick={handleChat}>
      <img src={chatImg} />
    </section>
  );
};

export default Chat;
