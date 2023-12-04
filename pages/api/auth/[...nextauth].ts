import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import SpotifyProvider from 'next-auth/providers/spotify';
import prisma from '../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    SpotifyProvider({
        clientId: process.env.SPOTIFY_ID,
        clientSecret: process.env.SPOTIFY_SECRET,
      authorization: "https://accounts.spotify.com/authorize?scope=user-top-read%20user-read-recently-played%20user-read-currently-playing",
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};