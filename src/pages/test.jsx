import React from 'react';

export default function SlideCard() {
    const [index, setIndex] = React.useState(0);

    const [currentPos, setCurrentPos] = React.useState("left-1/2");
    const [nextPos, setNextPos] = React.useState("left-[calc(100%+160px)]")

    const cards = [
        'first',
        'second',
        'third card',
        'fourth',
    ];

    const cardStyle = [
        "flex flex-col p-6 justify-center items-center",
        "bg-white text-black rounded",
        "w-[300px]",
        "absolute top-1/2",
        //"-translate-x-1/2 -translate-y-1/2",

    ].join(" ")

    return (
        <main className="w-full mt-4">
            <div className={[
                     "border p-6 w-[calc(100%-10px)] h-[200px] overflow-hidden",
                     "m-auto relative",
                 ].join(" ")}>

                {/* Current card */}
                <div className={[
                         cardStyle,
                         currentPos,
                         "animate-[wiggle_10s_ease_infinite]",
                     ].join(" ")}
                >
                    { cards[index] }
                </div>

                {/* Next card */}
                <div className={[
                         cardStyle,
                         nextPos,
                         "animate-[wiggle_10s_ease_infinite]",
                     ].join(" ")}
                >
                    { cards[(index + 1) % cards.length] }
                </div>
            </div>

            <button
                onClick={() => {
                    setNextPos("transition-all duration-500 left-1/2")
                    setCurrentPos("transition-all duration-500 -left-[160px]")

                    setTimeout(() => {
                        setIndex((index + 1) % cards.length)
                        setCurrentPos("left-1/2")
                        setNextPos("left-[calc(100%+160px)]")
                        }, 500);

                }}

                className="p-3 block mx-auto my-3 bg-white text-black"
            >Next card</button>
        </main>
    );
}
