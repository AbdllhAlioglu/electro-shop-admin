import { auth } from "@/app/_lib/auth";
import React from "react";
import { FiUser, FiMail } from "react-icons/fi";
import ProfileCard from "./ProfileCard";
export default async function ProfileInfoCard() {
  const session = await auth();
  const user = session?.user;

  return <ProfileCard user={user} />;
}
