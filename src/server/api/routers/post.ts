import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const champsDB = ['Bowswer', 'Captain Falcon', 'Diddy Kong', 'Donkey Kong', 'Falco', 'Fox', 'Ganondorf', 'Ice Climbers', 'Ike', 'Jigglypuff', 'King Dedede', 'Kirby', 'Link', 'Lucario',
'Lucas', 'Luigi', 'Mario', 'Marth', 'Meta Knight', 'Mr. Game & Watch', 'Ness', 'Olimar', 'Peach', 'Pikachu', 'Pit', 'Pokemon Trainer', 'ROB', 'Samus', 'Sheik', 'Snake', 'Sonic',
 'Toon Link', 'Wario', 'Wolf', 'Yoshi', 'Zelda']

export const postRouter = createTRPCRouter({
  getOpponent: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ ctx, input }) => {
      var list = await ctx.db.champs.findMany()
      var temp = 0;
      for (let i = 0; i < list.length; i++) {
        if (input.text === list[i]?.name) {
          temp = list[i]?.elo ?? 0;
        }
      }
      list = list.map((e) => {return ({name:e.name, elo: e.elo - temp})})
      list.sort();
      const rand = Math.floor(Math.random() * 5) + 1
      const answer = list[rand]?.name ?? ""
      for (var i = 0; i < champsDB.length; i++) {
        if (champsDB[i] === answer) {return i;}
      }
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
