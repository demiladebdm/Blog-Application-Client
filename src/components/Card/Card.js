import React from "react";
import { Link } from "react-router-dom";

import "./Card.css";
import CardImage from "../../assets/newsletter-ebook.png";

const Card = ({ showPopupPage }) => {
  const cardData = [
    {
      title: "NOT THE HOLY GRAIL",
      description:
        "Get insight into the inner workings of the trading world. A must read for every trader.",
      link: "/your-guide-link1",
      buttonText: "Access the guide now",
      buttonSpan: "(Free)",
    },
    {
      title: "PRICE ACTION TRADING HACKED",
      description:
        "Discover the secret to price action trading including over 30 proprietary candlesticks patterns that could help you beat the market.",
      link: "/your-guide-link2",
      buttonText: "I want",
      buttonSpan: "($29.99)",
    },
  ];

  const handleButtonClick = () => {
    showPopupPage();
  };

  return (
    <section className="card">
      <section className="card__title">
        <h1>What do you want to learn</h1>
      </section>
      <section className="card__all__content">
        {cardData.map((card, index) => (
          <section key={index} className="card__container">
            <section className="card__container__title">{card.title}</section>
            <section className="card__container__image">
              <img src={CardImage} alt="Card" />
            </section>
            <section className="card__container__desc">
              {card.description}
            </section>
            <section className="card__container__button">
              <Link
                // to={card.link}
                className="card__container__button__link"
                onClick={handleButtonClick}
              >
                {card.buttonText} <span>{card.buttonSpan}</span>
              </Link>
            </section>
          </section>
        ))}
      </section>
    </section>
  );
};

export default Card;
