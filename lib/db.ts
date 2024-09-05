import { PrismaClient } from '@prisma/client';

// Here we want to prevent creating multiple instances of PrismaClient in development mode. We will use the global object to store the PrismaClient instance. If the instance already exists, we will use it. Otherwise, we will create a new instance.

declare global {
  // global is a global object in Node.js. Is is used here to extend the global object with a new property called prisma.
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();
// This db variable is the one we will use to interact with the database. We will export it so that we can import it in other files.

// Make sure we don't initialize multiple times due to Nextjs hot reloading.

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db; // globalThis is a global object in Node.js
}
