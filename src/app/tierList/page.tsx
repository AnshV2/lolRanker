'use client'

import { Electrolize } from "next/font/google";
import { api } from "~/trpc/react";


const champsDB = ['Bowswer', 'Captain Falcon', 'Diddy Kong', 'Donkey Kong', 'Falco', 'Fox', 'Ganondorf', 'Ice Climbers', 'Ike', 'Jigglypuff', 'King Dedede', 'Kirby', 'Link', 'Lucario',
'Lucas', 'Luigi', 'Mario', 'Marth', 'Meta Knight', 'Mr. Game & Watch', 'Ness', 'Olimar', 'Peach', 'Pikachu', 'Pit', 'Pokemon Trainer', 'ROB', 'Samus', 'Sheik', 'Snake', 'Sonic',
 'Toon Link', 'Wario', 'Wolf', 'Yoshi', 'Zelda']
const champsImg = ['Bowser', 'Captain', 'Diddy', 'Donkey', 'Falco', 'Fox', 'Ganondorf', 'Ice', 'Ike', 'Jigglypuff', 'King', 'Kirby', 'Link', 'Lucario',
'Lucas', 'Luigi', 'Mario', 'Marth', 'Meta', 'Game', 'Ness', 'Olimar', 'Peach', 'Pikachu', 'Pit', 'Pokemon', 'ROB', 'Samus', 'Sheik', 'Snake', 'Sonic', 'Toon', 
'Wario', 'Wolf', 'Yoshi', 'Zelda', 'Bowser']
const numChamps = 36;



export default function TierList() {
    const list = api.post.getTierList.useQuery()
    let temp = 0;
    const posList = list.data?.map(element => {
        let position = 0;
        for (let i = 0; i < champsDB.length; i++) {
            if (champsDB[i] === element.name) {position = i}
        }
        console.log(position)
        temp++;
        return ({name: position, elo: element.elo, rank: temp})
    });
    return (
        <div className = "overflow-x-hidden h-screen w-screen bg-slate-200">
            <div className = "text-center bg-slate-200 text-slate-700 text-5xl p-14 font-bold">-------------------------- Cringe TierList --------------------------</div>
            <div className = "grid grid-rows-12 gap-y-28 grid-flow-col h-5/6 w-screen  overflow-x-hidden bg-slate-200 ">
                {posList && posList?.map((e) => {
                    return (
                        <div className = "flex h-30 w-60  m-4 text-slate-700 text-lg pl-36" key = {e.name}>
                            <div className = "text-slate-950 text-4xl pr-6 pt-4 font-bold"> {e.rank} </div>
                            <img className = "h-20 w-20" src = {"/Brawlers/" + champsImg[e.name] + "Icon" + ".PNG"}></img>
                            <div className = 'pl-5'> Cringe Rating: {e.elo} </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}