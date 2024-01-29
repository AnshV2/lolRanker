'use client'

import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";


import { api } from "~/trpc/react";
import {useState, useEffect} from "react"

const Elo = require( 'elo-js' );
const elo = new Elo();

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
  const opponent = api.post.getOpponent.useQuery({text: champsImg[player] ?? ""}, {refetchOnWindowFocus: false})


  const playerElo = api.post.getElo.useQuery({text: champsDB[player] ?? ""}).data
  const opponentElo = api.post.getElo.useQuery({text: champsDB[opponent.data ?? 1] ?? ""}).data
  
  const newWinnerEloPlayer  = elo.ifWins( playerElo, opponentElo );
  const newWinnerEloOpponent  = elo.ifWins( opponentElo, playerElo );
  const newLoserEloPlayer  = elo.ifLoses( playerElo, opponentElo );
  const newLoserEloOpponent  = elo.ifLoses( opponentElo, playerElo );

  const {mutate} = api.post.setElo.useMutation()

  return (
    <div className = "flex flex-col h-screen w-screen bg-slate-200 items-center justify-center">
      <div className = "text-center bg-slate-200 text-slate-700 text-5xl font-bold"> Which Brawler is More Cringe </div>
      {opponent.data && <div className = "flex w-full h-2/3 items-center justify-center">
        <div className = "relative h-1/2 w-1/3 l-1/9 justify-center items-center  ">
          <img onClick={() => {
            mutate({text: champsDB[player] ?? "", elo: newWinnerEloPlayer})
            mutate({text: champsDB[opponent.data?? 1] ?? "", elo: newLoserEloOpponent})
            upPlayer(Math.floor(Math.random() * numChamps))
          }} className = "w-full h-full object-contain border-2  hover:border-slate-400" src = {"/Brawlers/" + champsImg[player] + ".jpg"}></img>
        </div>
        <div className = "h-1/2 w-1/3 r-1/9 justify-center items-center   ">
          <img onClick={() => {
            mutate({text: champsDB[opponent.data?? 1] ?? "", elo: newWinnerEloOpponent})
            mutate({text: champsDB[player] ?? "", elo: newLoserEloPlayer})
            upPlayer(Math.floor(Math.random() * numChamps))
          }} className = "w-full h-full object-contain border-2  hover:border-slate-400" src = {"/Brawlers/" + champsImg[opponent.data] + ".jpg"}></img>
        </div>
      </div>}
      <Link href = "/tierList"><div className = "text-cente text-slate-700 text-2xl font-bold"> Global Tierlist </div></Link>
    </div>
  );
}

