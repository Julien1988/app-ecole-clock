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
    const [isAM, setIsAM] = useState(false); // Stocke si l'heure générée est AM ou PM


    // Générer l'heure aléatoire une seule fois lors du montage du composant
    useEffect(() => {
        creatRandomHour();
    }, []);

    const creatRandomHour = () => {
        setIsAM(false);
        const randomHour = Math.floor(Math.random() * 24); // Génère un nombre aléatoire entre 0 et 23
        const randomMinute = Math.random() < 0.5 ? 0 : 30; // Fixe les minutes à 00 ou 30 aléatoirement
        const fakeDate = new Date(`December 17, 1995 ${randomHour}:${randomMinute}:00`);
        // @ts-ignore
        console.log('fakeDate', fakeDate);
        if (randomHour < 12) {
            setIsAM(true);
        }
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

    // @ts-ignore
    return (
        <div
            className="">
            <main className="flex flex-col min-h-dvh gap-8 items-center justify-center  bg-black">

                <div className={'flex flex-col gap-8 justify-center items-center'}>

                    <div>
                        <AnalogTime type={"display"}
                                    value={generatedTime}
                                    baseColor={"rgb(219 39 119"}
                                    hourHandColor={"rgb(219 39 119"}
                                    minuteHandColor={"rgb(219 39 119"}
                                    secondHandColor={"black"}
                                    size={3}
                                    liveUpdater={false}
                        />
                    </div>
                    <div className={"flex flex-col"}>
                        <label className={'flex gap-2 text-xl flex-col'}>
                            <p className={"text-center text-2xl first-letter:uppercase"}>écris l'heure ici :</p>
                            {isAM && <p className={ 'text-center text-green-500'}>le matin</p>}
                            {!isAM && <p className={' text-center text-green-500'}>le soir</p>}
                            <input placeholder={"12:00"} className={'text-blue-300 font-bold h-12 rounded text-center '} value={userInput}
                                   onChange={e => setUserInput(e.target.value)}/>
                        </label>
                        {isCorrect && <p className={'text-green-500'}>Bravo, c'est la bonne heure !</p> &&
                            <a className={" rounded bg-green-400 p-3 my-6 mx-6"} onClick={reset}> essaie encore
                            </a>
                        }
                        {!isCorrect &&
                            <a className={" rounded bg-rose-900\t p-3 my-6 mx-6 text-center text-2xl" +
                                " hover:bg-pink-600 "} onClick={handleClick}> Essaie
                                ici</a>
                        }

                    </div>

                </div>


            </main>
        </div>
    );
}
