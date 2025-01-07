'use server'

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AuthCheck() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return null;
}
