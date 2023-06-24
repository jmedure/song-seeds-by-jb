import Image from "next/image";
import React from "react";
import useSWR from "swr";
import { Card } from "../../components/Card";
import { ReactFragment } from "react";
// import { getRandomCard } from '../cards';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const [activeCard, setActiveCard] = React.useState(0);
  const [nextCard, setNextCard] = React.useState(1);

  const getRandomCard = (e) => {
    // Add a class to the current card to animate it off the screen
    const active = document.querySelector("#active-card");
    active.classList.replace("transition-none", "transition-all");
    active.classList.replace("left-1/2", "-left-[280px]");

    const next = document.querySelector("#next-card");
    next.classList.replace("transition-none", "transition-all");
    next.classList.replace("left-[calc(100%+280px)]", "left-1/2");

    /* const len = data.length; */
    /* setActiveCard(Math.floor(Math.random() * len)); */

    // Wait for a short time before removing the exit animation class
    setTimeout(() => {
      setActiveCard(nextCard);
      setNextCard(Math.floor(Math.random() * data.length));
      active.classList.replace("transition-all", "transition-none");
      active.classList.replace("-left-[280px]", "left-1/2");

      next.classList.replace("transition-all", "transition-none");
      next.classList.replace("left-1/2", "left-[calc(100%+280px)]");
    }, 600);
  };

  // const handleClick = () => {
  //   // Add a class to the current card to animate it off the screen
  //   document.querySelector('.card').classList.add('card-exit');

  //   // Generate a new random card
  //   const newCard = getRandomCard();
  //   setActiveCard(newCard);

  //   // Wait for a short time before removing the exit animation class
  //   setTimeout(() => {
  //     document.querySelector('.card').classList.remove('card-exit');
  //   }, 500);
  // };

  const { data, error } = useSWR("/api/cards", fetcher);

  const main = () => {
    if (error) {
      return <main>error: failed to load</main>;
    }
    if (!data) {
      return <main className="container-fg text-xl py-20">loading...</main>;
    }
    return (
      <main className="flex min-h-screen items-center justify-center py-24 font-mont font-thin mx-auto">
        <div className="w-full flex-block mx-auto">
          <div className="uppercase w-full flex justify-center mx-auto">
            song seeds by{" "}
            <a
              className="underline text-blue-200 hover:text-white transition-all transition-.2ms"
              href="https://jacobs.blue"
            >
              jacob&#39;s blue
            </a>
          </div>
          <div className="flex flex-wrap items-center col-span-1 justify-center mx-auto py-32 space-y-16 w-full overflow-hidden">
            <div className="w-full relative h-[320px] z-10">
              <div
                id="active-card"
                className="z-20 absolute top-0 left-1/2 transition-all duration-500 -translate-x-1/2"
              >
                <Card card={data[activeCard]} />
              </div>
              <div
                id="next-card"
                className="absolute top-0 left-[calc(100%+280px)] transition-all duration-500 -translate-x-1/2"
              >
                <Card card={data[nextCard]} />
              </div>
            </div>

            <div className="flex w-full justify-center mx-auto">
              <button
                onClick={getRandomCard}
                className="cursor-pointer text-center uppercase py-3 px-8 bg-none hover:bg-white active:bg-white/90 active:drop-shadow-none hover:drop-shadow-lg hover:text-j-blue rounded-full border-solid border border-white transition-all .3s"
              >
                draw card
              </button>
            </div>
          </div>
          <div className="flex uppercase w-full mx-auto items-center justify-center  space-x-8">
            <a
              className="underline text-blue-200 hover:text-white transition-all transition-.2ms"
              href="https://jacobs.blue"
            >
              About
            </a>
            <a
              className="underline text-blue-200 hover:text-white transition-all transition-.2ms"
              href="https://jacobs.blue"
            >
              Feedback
            </a>
          </div>
        </div>
      </main>
    );
  };

  return (
    <>
      {/* <BlogSEO
        title={
          "Jacob's Blue | All things artist, songwriter and producer Jacob's Blue"
        }
        description="Pursuing mastery in music...probably cooking something."
        image="/siteThumb.png"
        canonical="/index"
      /> */}
      {main()}
    </>
  );
}
