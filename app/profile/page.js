import { getServerSession } from "@/app/_lib/getServerSession";
import { redirect } from "next/navigation";
import ProfileInfoCard from "./components/ProfileInfoCard";
import PasswordChangeCard from "./components/PasswordChangeCard";

// This is a Server Component
export default async function ProfilePage() {
  // Get the session on the server using our wrapper
  const session = await getServerSession();

  // Redirect if not authenticated
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Profil Bilgileri</h1>

        {/* Profil Bilgileri Kartı */}
        <ProfileInfoCard user={session?.user} />

        {/* Şifre Değiştirme Kartı */}
        <PasswordChangeCard />
      </div>
    </div>
  );
}
