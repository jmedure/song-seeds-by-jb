import Image from 'next/image';
import React from 'react';
import useSWR from 'swr';
import { ReactFragment } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Card = ({ card }) => {
  const { id, reg, ital } = card;

  return (
    <div className="card mx-auto flex w-full rounded-[50px] items-center justify-center p-4 h-[296px] max-h-[296px] animate-[wiggle_10s_ease_infinite] bg-white text-j-blue w-[420px] max-w-[420px] drop-shadow-[0px_25px_50px_rgba(0,0,0,0.4)]">
      <p className="font-fruit font-normal mx-auto text-4xl tracking-tight align-middle items-center text-center p-16 m-8">
        {reg} <i className="font-thin">{ital}</i>.
      </p>
      <p className="flex uppercase text-center absolute bottom-6 font-mont tracking-tight font-normal text-xs">
        song seeds by jacob&#39;s blue
      </p>
    </div>
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
          'absolute w-[90%] top-0 left-[calc(100%+280px)] transition-all duration-500 -translate-x-1/2';
        let card = document.createElement('div');
        card.className =
          'card mx-auto flex w-full rounded-[50px] items-center justify-center p-4 h-[296px] max-h-[296px] animate-[wiggle_10s_ease_infinite] bg-white text-j-blue w-[420px] max-w-[420px] drop-shadow-[0px_25px_50px_rgba(0,0,0,0.4)]';
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
          'flex uppercase text-center absolute bottom-6 font-mont tracking-tight font-normal text-xs';
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
      return <main className="text-xl py-20">loading...</main>;
    }
    return (
      <main className="flex flex-col min-h-screen items-center justify-center py-24">
        <div className="uppercase w-full flex justify-center mx-auto">
          song seeds by{' '}
          <a
            className="underline text-blue-200 hover:text-white transition-all transition-.2ms"
            href="https://jacobs.blue"
          >
            jacob&#39;s blue
          </a>
        </div>

        {/* cards */}
        <div className="w-full overflow-x-clip pt-20">
          <div className="w-full relative h-[320px] z-10" id="cards">
            <div className="absolute w-[90%] top-0 left-1/2 transition-all duration-500 -translate-x-1/2">
              <Card card={data[0]} />
            </div>
            <div className="absolute w-[90%] top-0 left-[calc(100%+280px)] transition-all duration-500 -translate-x-1/2">
              <Card card={data[1]} />
            </div>
          </div>
        </div>

        {/* draw button */}
        <button
          onClick={getRandomCard}
          className="my-12 cursor-pointer text-center uppercase py-3 px-8 bg-none hover:bg-white active:bg-white/90 active:drop-shadow-none hover:drop-shadow-lg hover:text-j-blue rounded-full border-solid border border-white transition-all .3s"
        >
          draw card
        </button>

        <div className="flex uppercase items-center justify-center  space-x-8">
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
