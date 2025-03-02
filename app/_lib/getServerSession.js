import { auth } from "./auth";
import { cookies, headers } from "next/headers";

// This is a wrapper around the auth function that ensures it's called in a server context
export async function getServerSession() {
  // Make sure headers and cookies are accessed within this function
  // to ensure they're accessed in a server context
  const headersList = headers();
  const cookiesList = cookies();

  try {
    // Now call auth() which will use the headers and cookies internally
    return await auth();
  } catch (error) {
    console.error("Error getting server session:", error);
    return null;
  }
}
