import Image from 'next/image';
import React from 'react';
import useSWR from 'swr';
import { Card } from '../../components/Card';
import { ReactFragment } from 'react';
// import { getRandomCard } from '../cards';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const [activeCard, setActiveCard] = React.useState(0);

  const getRandomCard = (e) => {
    // Add a class to the current card to animate it off the screen
    document.querySelector('.card').classList.add('card-exit');

    const len = data.length;
    setActiveCard(Math.floor(Math.random() * len));

    // Wait for a short time before removing the exit animation class
    setTimeout(() => {
      document.querySelector('.card').classList.remove('card-exit');
    }, 1000);
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

  const { data, error } = useSWR('/api/cards', fetcher);

  const main = () => {
    if (error) {
      return <main>error: failed to load</main>;
    }
    if (!data) {
      return <main className="container-fg text-xl py-20">loading...</main>;
    }
    return (
      <main className="flex min-h-screen items-center justify-center p-24 font-mont font-thin mx-auto">
        <div className="w-full max-w-5xl flex-block mx-auto">
          <div className="uppercase w-full flex justify-center mx-auto">
            song seeds by{' '}
            <a
              className="underline text-blue-200 hover:text-white transition-all transition-.2ms"
              href="https://jacobs.blue"
            >
              jacob&#39;s blue
            </a>
          </div>
          <div className="flex flex-wrap items-center col-span-1 justify-center mx-auto py-52 space-y-16 w-full">
            <div className="card mx-auto flex rounded-[50px] items-center justify-center p-4 h-[296px] max-h-[296px] animate-[wiggle_10s_ease_infinite]  bg-white text-j-blue w-[420px] max-w-[420px] drop-shadow-[0px_25px_50px_rgba(0,0,0,0.4)]">
              <p className="font-fruit font-normal mx-auto text-4xl tracking-tight align-middle items-center text-center p-16 m-8">
                {data[activeCard].reg}{' '}
                <i className="font-thin">{data[activeCard].ital}</i>.
              </p>
              <p className="flex uppercase text-center absolute bottom-6 font-mont tracking-tight font-normal text-xs">
                song seeds by jacob&#39;s blue
              </p>
            </div>

            {/* Was trying to use old function from JB */}
            {/* {data.map(function (card, index) {
              if (card.id > 0) return <Card key={index} card={card} />;
            })} */}
            {/* <Card
              reg={data[activeCard].reg}
              ital={data[activeCard].ital}
              id={data[activeCard].id}
            /> */}

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
