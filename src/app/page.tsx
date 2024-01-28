'use client'

import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { api } from "~/trpc/react";
import {useState, useEffect} from "react"

const champsDB = ['Bowswer', 'Captain Falcon', 'Diddy Kong', 'Donkey Kong', 'Falco', 'Fox', 'Ganondorf', 'Ice Climbers', 'Ike', 'Jigglypuff', 'King Dedede', 'Kirby', 'Link', 'Lucario',
'Lucas', 'Luigi', 'Mario', 'Marth', 'Meta Knight', 'Mr. Game & Watch', 'Ness', 'Olimar', 'Peach', 'Pikachu', 'Pit', 'Pokemon Trainer', 'ROB', 'Samus', 'Sheik', 'Snake', 'Sonic',
 'Toon Link', 'Wario', 'Wolf', 'Yoshi', 'Zelda']
const champsImg = ['Bowser', 'Captain', 'Diddy', 'Donkey', 'Falco', 'Fox', 'Ganondorf', 'Ice', 'Ike', 'Jigglypuff', 'King', 'Kirby', 'Link', 'Lucario',
'Lucas', 'Luigi', 'Mario', 'Marth', 'Meta', 'Game', 'Ness', 'Olimar', 'Peach', 'Pikachu', 'Pit', 'Pokemon', 'ROB', 'Samus', 'Sheik', 'Snake', 'Sonic', 'Toon', 
'Wario', 'Wolf', 'Yoshi', 'Zelda', 'Bowser']
const numChamps = 36;




export default function Home() {
  noStore();
  const [player, upPlayer] = useState(Math.floor(Math.random() * numChamps))
  const opponent = api.post.getOpponent.useQuery({text: champsImg[player] ?? ""})

  return (
    <div className = "flex h-screen w-screen bg-slate-200 items-center justify-center">
      {opponent.data && <div className = "flex w-full h-2/3 items-center justify-center">
        <div className = "relative h-1/2 w-1/3 l-1/9 justify-center items-center  ">
          <img className = "w-full h-full object-contain" src = {"/Brawlers/" + champsImg[player] + ".jpg"}></img>
        </div>
        <div className = "h-1/2 w-1/3 r-1/9 justify-center items-center   ">
          <img className = "w-full h-full object-contain" src = {"/Brawlers/" + champsImg[opponent.data] + ".jpg"}></img>
        </div>
      </div>}
    </div>
  );
}

