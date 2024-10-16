'use client';
import React, {useEffect, useState} from "react";
// @ts-ignore
import {AnalogTime} from "react-clock-select";
// @ts-ignore
declare module "react-clock-select";

export default function Home() {
    const [generatedTime, setGeneratedTime] = useState(0);
    const [userInput, setUserInput] = useState(""); // Stocke l'heure entrée par l'utilisateur
    const [isCorrect, setIsCorrect] = useState(false); // Stocke si l'heure entrée par l'utilisateur est correcte


    // Générer l'heure aléatoire une seule fois lors du montage du composant
    useEffect(() => {
        creatRandomHour();
    }, []);

    const creatRandomHour = () => {

        const randomHour = Math.floor(Math.random() * 24); // Génère un nombre aléatoire entre 0 et 23
        const randomMinute = Math.random() < 0.5 ? 0 : 30; // Fixe les minutes à 00 ou 30 aléatoirement
        const fakeDate = new Date(`December 17, 1995 ${randomHour}:${randomMinute}:00`);
        // @ts-ignore
        console.log('fakeDate', fakeDate);
        // @ts-ignore
        setGeneratedTime(fakeDate);

    };
    const resultcheck = (userInput: string, generatedTime: any) => {
        const [userHour, userMinute] = userInput.split(':').map(Number);
        const generatedHour = generatedTime.getHours();
        const generatedMinute = generatedTime.getMinutes();
        console.log('userHour', userHour, 'userMinute', userMinute, 'generatedHour', generatedHour, 'generatedMinute', generatedMinute);
        return userHour === generatedHour && userMinute === generatedMinute;
    }
    const reset = (e: { preventDefault: () => void; }    ) => {
        e.preventDefault();
        setIsCorrect(false);
        creatRandomHour();
        setUserInput("");

    }
    const handleClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (resultcheck(userInput, generatedTime)) {
            console.log("Bravo, c'est la bonne heure !");
            setIsCorrect(true);
        }
        console.log('ici', userInput, generatedTime);

    }

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

                <div className={'flex flex-col gap-8'}>

                    <div>
                        <AnalogTime type={"display"}
                                    value={generatedTime}
                                    baseColor={"#60a5fa"}
                                    hourHandColor={"#2563eb"}
                                    minuteHandColor={"#2563eb"}
                                    secondHandColor={"black"}
                                    size={3}
                                    liveUpdater={false}
                        />
                    </div>
                    <div className={"flex flex-col"}>
                        <label className={'flex gap-2 text-xl'}>
                            <p>écrit l'heure : </p>
                            <input placeholder={"12:00"} className={'text-blue-300'} value={userInput}
                                   onChange={e => setUserInput(e.target.value)}/>
                        </label>
                        {isCorrect && <p className={'text-green-500'}>Bravo, c'est la bonne heure !</p> &&
                            <button className={" rounded bg-green-400 p-3 my-6 mx-6"} onClick={reset}> essaye encore
                            </button>
                        }


                            <button className={" rounded bg-amber-600 p-3 my-6 mx-6"} onClick={handleClick}> Essaye
                                ici</button>


                    </div>

                </div>


            </main>
        </div>
    );
}
