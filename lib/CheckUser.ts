import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export const checkUser = async () => {
  const user = await currentUser();

  // Check for current logged in clerk user
  if (!user) return null;

  // If there is a logged in clerk user, check if it exists in our database
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  // If the user exists in our database, return the user
  if (loggedInUser) return loggedInUser;

  // If the user does not exist in our database, create it and return it.
  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};
