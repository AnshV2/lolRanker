import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const champsDB = ['Bowswer', 'Captain Falcon', 'Diddy Kong', 'Donkey Kong', 'Falco', 'Fox', 'Ganondorf', 'Ice Climbers', 'Ike', 'Jigglypuff', 'King Dedede', 'Kirby', 'Link', 'Lucario',
'Lucas', 'Luigi', 'Mario', 'Marth', 'Meta Knight', 'Mr. Game & Watch', 'Ness', 'Olimar', 'Peach', 'Pikachu', 'Pit', 'Pokemon Trainer', 'ROB', 'Samus', 'Sheik', 'Snake', 'Sonic',
 'Toon Link', 'Wario', 'Wolf', 'Yoshi', 'Zelda']

export const postRouter = createTRPCRouter({
  getOpponent: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ ctx, input }) => {
      let list = await ctx.db.champs.findMany()
      let temp = 0;
      for (let i = 0; i < list.length; i++) {
        if (input.text === list[i]?.name) {
          temp = list[i]?.elo ?? 0;
        }
      }
      list = list.map((e) => {return ({name:e.name, elo: Math.abs(e.elo - temp)})})
      list.sort((e: {name:string, elo:number}, e2: {name:string, elo:number}) => {return (e.elo - e2.elo)});
      let rand = Math.floor(Math.random() * 5) + 1
      let answer = list[rand]?.name ?? ""
      while (answer === input.text) {answer = list[Math.floor(Math.random() * 5) + 1]?.name ?? ""}
      for (let i = 0; i < champsDB.length; i++) {
        if (champsDB[i] === answer) {return i;}
      }
    }),

    getTierList: publicProcedure
    .query(async ({ ctx }) => {
      let list = await ctx.db.champs.findMany({
        orderBy: [
          {
            elo: 'desc',
          },
        ],
      })
      return list;
    }),

    getElo: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ ctx, input }) => {
      let player = await ctx.db.champs.findMany({
        where: {name: {equals: input.text}}
      })
      return player[0]?.elo
    }),

    setElo: publicProcedure
    .input(z.object({ text: z.string(), elo: z.number()}))
    .mutation(async ({ ctx, input }) => {
      console.log(input.text)
      console.log(input.elo)
      const updateUser = await ctx.db.champs.update({
        where: {name: input.text},
        data: {
          elo: input.elo
        },
      })
      return updateUser;     
    }),


  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
