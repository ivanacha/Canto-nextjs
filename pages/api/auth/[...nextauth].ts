import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import SpotifyProvider from 'next-auth/providers/spotify';
import GithubProvider from 'next-auth/providers/github'
import prisma from '@lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
        
    SpotifyProvider({
        clientId: process.env.SPOTIFY_ID,
        clientSecret: process.env.SPOTIFY_SECRET,
        authorization: "https://accounts.spotify.com/authorize?scope=user-top-read%20user-read-recently-played%20user-read-currently-playing",
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};