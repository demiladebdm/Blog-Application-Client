import React, { useState, useEffect, Suspense } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

import "./About.css";
import Loader from "../../components/Loader/Loader";
import ECard from "../../components/ECard/ECard";

const About = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <section className={`about ${showPopup ? "popup-visible" : ""}`}>
      <Suspense fallback={<Loader />}>
        <section className="about__container">
          <h3 className="about__container__title">About Me</h3>
          <article className="about__me">
            <Suspense fallback={<Loader />}>
              <section className="about__me__content">
                <p className="about__me__content__info">
                  The year was February 2019, I was pacing restlessly in my room
                  thinking of how to make an extra source of income when the
                  credit alert for my monthly salary dropped. <br />
                  Again, it was the paltry $50 credit alert (my monthly salary)
                  that dropped. <br />
                  It didn’t sit down well with me that a guy who graduated
                  University with a 4.38 CGPA in Economics should be earning
                  that measly salary.
                  <br />
                  My bills were piling up and growing wings, and I knew earning
                  $50 per month wouldn’t cut it.
                  <br />
                  Mumbling angrily beneath my breath and with a loud sigh of
                  frustration, I jumped on my computer and google searched{" "}
                  <span>“how to make money online”.</span>
                  <br />
                  <span>That’s where my trading career started…</span>
                  <br />
                  I saw a young man pose with a Lamborghini and he claimed forex
                  trading bought him the fast car.
                  <br />
                  I made up my mind that I would become a trader, I wanted the
                  trader’s lifestyle so bad.
                  <br />
                  Just as with every beginner trader, it didn’t take up to one
                  week before I blew my first trading account (my mother
                  actually sowed a seed of $200 after much pleading to fund the
                  account).
                  <br /> Then I blew the second account and the third.
                  <br /> I took a break from trading to learn how to trade
                  properly.
                  <br /> I would take jabs of coffee, empty cannisters of energy
                  drinks and stay up all nights to learn how to trade.
                  <br /> I started making little profits, but I struggled for
                  the most part.
                  <br /> Then I got a better paying job in 2020 but I didn’t
                  give up on trading. I was in fact becoming a better trader.
                  <br /> However, due to the busy nature of my job, I took the
                  ill-conceived move to invest the money I had saved up ($4,500)
                  with a forex investment company.
                  <br />
                  The company promised a Return on Investment (R.O.I) of 25%
                  every month. Long story short, I lost all the money to the
                  company along with thousands of unassuming investors.
                  <br /> It took me 2 years to realize that trading isn’t a
                  sprint race but a marathon and there is no short cut to
                  achieving success in trading.
                  <br /> For the umpteenth time, trading isn’t a get rich quick
                  scheme and 90% of people who throw their hats into the ring of
                  trading lose their money.
                  <br />
                  <span>But here’s the good news…</span>
                  <br />
                  My name is Wole (founder of wolstreet finance) and your
                  finance guy.
                  <br /> I have mastered the art of trading and I consider
                  myself to be part of the 10% winning traders.
                  <br /> I am also passionate about the global financial market.
                  I basically eat, sleep, sh*t finance.
                  <br />
                  <span>So…</span>
                  <br />
                  I will be offering myself as the bridge between the wall
                  street and the main street and this blog will break the nitty
                  gritty and mumbo jumbo of finance and trading into easy bits
                  for you.
                  <br /> I don’t drive a Lamborghini (in fact I still drive a
                  2008 Toyota Camry) so don’t expect me to turn you into a
                  millionaire overnight.
                  <br /> However, if you tattoo all the insights I will be
                  giving on this blog to your heart, you will be an inch closer
                  to becoming a profitable trader and a sound finance guy/lady.
                  <br />
                  <span className="highlight">
                    Click below to gain full access to the{" "}
                    <span className="highlight__text">FREE</span> E-book…
                  </span>
                </p>

                <section className="about__me__button">
                  <Link
                    className="about__me__button__link"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPopup(true);
                    }}
                  >
                    Get Started Free
                  </Link>
                </section>
              </section>
            </Suspense>
          </article>
        </section>
      </Suspense>
      
      {showPopup && (
        <Suspense fallback={<Loader />}>
          <ECard showPopup={showPopup} handleClosePopup={handleClosePopup} />
        </Suspense>
      )}

        {/* <Suspense fallback={<Loader />}>
          <ECard />
        </Suspense> */}

      {/* Delete confirmation modal */}
      {/* <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Confirm Delete"
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this post?</p>
        <button onClick={handleDelete}>Yes, delete</button>
        <button onClick={closeDeleteModal}>Cancel</button>
      </Modal> */}
    </section>
  );
};

export default About;
