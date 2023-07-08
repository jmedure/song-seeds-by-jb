import React, { useEffect } from 'react';
import useSWR from 'swr';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Card = ({ card }) => {
  const { id, reg, ital } = card;

  const [effect, setEffect] = useState(false);
  let effectChecker = effect ? ' animate-flip' : ' ';

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      className={`${effectChecker} card -rotate-2 origin-left flex transform-style-3d transition-transform perspective-1000 animate-[wiggle_20s_ease_infinite] cursor-pointer mx-auto`}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <div className="card-face front cursor-pointer mx-auto flex items-center justify-center p-4 bg-white text-j-blue drop-shadow-[0px_25px_50px_rgba(0,0,0,0.4)] duration-300 sm:w-[420px] max-w-[420px] h-[260px] max-h-[260px] sm:h-[296px] sm:max-h-[296px] rounded-[2.5em] sm:rounded-[50px]">
          <p className="font-fruit mx-auto text-4xl font-medium sm:text-4xl tracking-tight align-middle items-center text-center p-16 m-8">
            {reg}
            <i className="font-medium"> {ital}</i>.
          </p>
          <p className="flex uppercase text-center absolute bottom-4 sm:bottom-6 font-mont tracking-tight font-normal sm:text-xs text-[10px]">
            song seeds by jacob&#39;s blue
          </p>
        </div>
      ) : (
        <div className="card-face origin-center rotate-y-180 card mx-auto flex items-center justify-center p-4 sm:w-[420px] max-w-[420px] h-[260px] max-h-[260px] sm:h-[296px] sm:max-h-[296px] rounded-[2.5em] sm:rounded-[50px] bg-j-blue text-white duration-300">
          <div className="flex-col rotate-y-180">
            <p className="font-mont uppercase mx-auto text-2xl sm:text-3xl tracking-tight align-middle items-center text-center ">
              Song Starters
            </p>
            <p className="font-fruit mx-auto text-4xl font-medium italic sm:text-2xl tracking-tight align-middle items-center text-center">
              Level 1
            </p>
          </div>
          <p className="flex rotate-y-180 uppercase text-center absolute bottom-4 sm:bottom-6 font-mont tracking-tight font-normal sm:text-xs text-[10px]">
            song seeds by jacob&#39;s blue
          </p>
        </div>
      )}
    </button>
  );
};

export default function Home() {
  const [count, setCount] = React.useState(0);

  const getRandomCard = (e) => {
    const cards = document.querySelector('#cards');
    const curr = cards.children[0];
    const next = cards.children[1];

    if (next) {
      curr.classList.replace('left-1/2', '-left-[280px]');
      next.classList.replace('left-[calc(100%+280px)]', 'left-1/2');

      setTimeout(() => {
        curr.remove();
        setCount(count + 1);
        let r = Math.floor(Math.random() * data.length);
        console.log(r, data.length);
        let randCard = data[r];
        let container = document.createElement('div');
        container.className =
          'absolute w-[90%] top-0 left-[calc(100%+280px)] ease-[cubic-bezier(.44,-0.02,.63,1)] transition-all duration-300 -translate-x-1/2';
        let card = document.createElement('div');
        card.className =
          'group origin-center perspective-1000 transform-style-3d backface-hidden	group-hover:rotate-y-180 cursor-pointer card mx-auto flex w-full rounded-[50px] items-center justify-center h-[260px] max-h-[260px] sm:h-[296px] sm:max-h-[296px] animate-[wiggle1_10s_ease_infinite] bg-white text-j-blue w-[420px] max-w-[420px] drop-shadow-[0px_25px_50px_rgba(0,0,0,0.5)]';
        let text = document.createElement('p');
        text.textContent = randCard.reg;
        text.className =
          'font-fruit font-normal mx-auto text-4xl tracking-tight align-middle items-center text-center p-16 m-8';
        let ital = document.createElement('i');
        ital.className = 'font-thin pl-2';
        ital.textContent = randCard.ital + '.';
        text.appendChild(ital);
        let footer = document.createElement('p');
        footer.className =
          'flex uppercase text-center absolute bottom-4 sm:bottom-6 font-mont tracking-tight font-normal sm:text-xs text-[10px]';
        footer.textContent = "song seeds by jacob's blue";
        card.appendChild(text);
        card.appendChild(footer);
        container.appendChild(card);
        cards.appendChild(container);
      }, 600);
    }
  };

  const { data, error } = useSWR('/api/cards', fetcher);

  const main = () => {
    if (error) {
      return <main>error: failed to load</main>;
    }
    if (!data) {
      return (
        <main className="flex text-xl py-auto w-full h-screen mx-auto justify-center items-center text-sans ">
          loading...
        </main>
      );
    }
    return (
      <main className="flex flex-col min-h-screen space-y-24 text-j-blue dark:text-white sm:space-y-48 items-center justify-center">
        <div className="uppercase w-full items-center flex justify-center space-x-1  mx-auto">
          <p>song seeds by jacob&#39;s blue</p>
          <p className="font-fruit lowercase italic opacity-70">(v 1.0)</p>
        </div>

        {/* cards */}
        <div className="flex space-y-8 sm:space-y-16 w-full flex-col min-h-full justify-center align-middle items-center">
          <div className="w-full overflow-x-clip">
            <div
              className="w-full relative h-[300px] sm:h-[320px] perspective-500 z-10"
              id="cards"
            >
              <div className="absolute w-[90%] top-0 left-1/2  transition-all  ease-[cubic-bezier(.44,-0.02,.63,1)] duration-300 -translate-x-1/2">
                <Card card={data[0]} />
              </div>
              <div className="absolute w-[90%] top-0 left-[calc(100%+280px)] ease-[cubic-bezier(.44,-0.02,.63,1)] transition-all duration-300 -translate-x-1/2">
                <Card card={data[1]} />
              </div>
            </div>
          </div>

          {/* draw button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={getRandomCard}
            className="cursor-pointer opacity-0 dark:opacity-100 dark:text-white text-center uppercase py-4 px-8 bg-none sm:hover:bg-white sm:active:drop-shadow-none sm:hover:drop-shadow-lg sm:hover:text-j-blue rounded-full border-solid border border-white transition-all"
          >
            draw card
          </motion.button>
        </div>
        <div className="opacity-0 dark:opacity-100 flex items-center justify-center underline-offset-2 space-x-8 ">
          <a
            className="underline uppercase items-center text-blue-200 p-2 hover:text-white transition-all duration-200"
            href="https://jacobs.blue/meditations/on-creative-contraints"
          >
            Why song seeds?
          </a>
          {/* <div
            onClick={copylink}
            className="flex no-underline cursor-pointer "
            href="https://jacobs.blue"
          >
            <p className="underline m-0 p-2 text-blue-200 transition-all duration-200 uppercase hover:text-white">
              Share
            </p>
          </div> */}
        </div>
      </main>
    );
  };

  const share = useRouter();
  const base = 'http://localhost:3000';
  const [isCopied, setIsCopied] = useState(false);

  const links = base + share.asPath;
  const copylink = (e) => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    navigator.clipboard.writeText(links);
  };

  return (
    <>
      <NextSeo
        title="Song Seeds by Jacob's Blue"
        description="Creative constraints for the modern musician - Now in beta"
        canonical="https://seeds.jacobs.blue"
        openGraph={{
          url: 'https://www.url.ie/a',
          title: "Song Seeds by Jacob's Blue",
          description:
            'Creative constraints for the modern musician - Now in beta',
          images: [
            {
              url: 'https://freegame.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fdfbd2cce-349e-43aa-8010-ebd3f593bd48%2F800x600.png?table=block&id=17af6561-13b6-4408-a5e2-11c2a16575b6&spaceId=2afffdaa-a1f9-48fc-8af5-a4f4e2aaefbf&width=2000&userId=&cache=v2',
              width: 800,
              height: 600,
              alt: 'Song Seeds Card',
              type: 'image/png',
            },
            {
              url: 'https://freegame.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd32e2176-2e59-40ba-b394-55191f497405%2F800x900.png?table=block&id=88d33293-b2e9-44e5-ba60-c38427398959&spaceId=2afffdaa-a1f9-48fc-8af5-a4f4e2aaefbf&width=2000&userId=&cache=v2',
              width: 900,
              height: 800,
              alt: 'Song Seeds Card',
              type: 'image/png',
            },
          ],
          siteName: "Song Seeds by Jacob's Blue",
        }}
        twitter={{
          handle: '@jacobs__blue',
          site: '@jacobs__blue',
          cardType: 'summary_large_image',
        }}
      />
      {main()}
      {/* {isCopied ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 1, y: '-100%' }}
            animate={{ opacity: 1, y: '100%' }}
            exit={{ opacity: 0 }}
            transition={{
              ease: 'linear',
              duration: 0.3,
            }}
            className="absolute font-mont flex items-center justify-center text-center rounded-lg no-underline p-4 mx-auto top-8 w-80 align-middle whitespace-nowrap transition-all bg-[#99FF69] text-black text-sans text-sm"
          >
            <p className="no-underline">Copied URL to clipboard!</p> */}
      {/* <FiCheck /> */}
      {/* </motion.div>
        </AnimatePresence>
      ) : null}
      <div className=" hidden sm:flex">
        <div
          onClick={copylink}
          className="absolute sm:hover:bg-white/20 transition-all cursor-pointer top-8 right-8 p-2 border border-solid border-j-blue bg-white/10 text-white rounded-full"
        > */}
      {/* <BsLink45Deg /> */}
      {/* {isCopied ? (
            <motion.div
              initial={{ opacity: 0, y: 1 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                ease: 'linear',
                duration: 0.3,
              }}
              className="absolute flex px-2 py-1 whitespace-nowrap transtion-all -top-7 -right-4 rounded-lg transition-all bg-black/50 drop-shadow-lg text-sans text-xs"
            >
              <p>URL copied!</p>
            </motion.div>
          ) : null}
        </div> */}
      {/* </div> */}
    </>
  );
}
