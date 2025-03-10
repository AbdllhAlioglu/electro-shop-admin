"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SessionOverlay() {
  const { data: session, status, update } = useSession();
  const [timeLeft, setTimeLeft] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Kullanıcı aktivitesini izleme
  useEffect(() => {
    const handleActivity = () => {
      setIsActive(true);
      setLastActivity(Date.now());
    };

    // Kullanıcı etkileşimlerini dinle
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("mousedown", handleActivity);
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("touchmove", handleActivity);

    return () => {
      // Temizleme işlemleri
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("mousedown", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("touchmove", handleActivity);
    };
  }, []);

  // Oturum süresini kontrol etme
  useEffect(() => {
    // Oturum yoksa veya yükleniyor durumundaysa, hiçbir şey yapma
    if (status !== "authenticated" || !session) return;

    // Oturum süresini kontrol etmek için zamanlayıcı
    const interval = setInterval(() => {
      // Oturum sona erme zamanını kontrol et
      if (session.expires) {
        const expiryTime = new Date(session.expires).getTime();
        const now = Date.now();
        const timeRemaining = Math.floor((expiryTime - now) / 1000); // saniye cinsinden kalan süre

        setTimeLeft(timeRemaining);

        // Son aktiviteden bu yana geçen süre
        const timeSinceLastActivity = Math.floor((now - lastActivity) / 1000);

        // Eğer kullanıcı aktifse ve son 10 saniye içinde aktivite varsa, uyarıyı gizle
        if (timeSinceLastActivity < 10) {
          setIsActive(true);
        } else if (timeRemaining <= 30) {
          // 30 saniyeden az kaldıysa ve kullanıcı aktif değilse uyarı göster
          setIsActive(false);
        }

        // Eğer süre dolduysa, otomatik çıkış yap ve login sayfasına yönlendir
        if (timeRemaining <= 0) {
          signOut({ callbackUrl: "/login" });
        }

        // Kullanıcı aktifse ve süre 30 saniyeden az kaldıysa oturumu yenile
        if (isActive && timeRemaining <= 30 && timeSinceLastActivity < 5) {
          update(); // NextAuth oturumunu güncelle
        }
      }
    }, 1000); // Her saniye kontrol et

    return () => clearInterval(interval);
  }, [session, status, lastActivity, isActive, update]);

  // Kullanıcı aktifse veya süre 30 saniyeden fazlaysa uyarı gösterme
  if (isActive || !timeLeft || timeLeft > 30) return null;

  return (
    <>
      {/* Oturum süresi dolmak üzereyken gösterilecek uyarı */}
      <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-40">
        <p className="font-medium">
          Dikkat: Oturum süreniz doluyor: {timeLeft} saniye
        </p>
        <p className="text-sm">
          Süre dolduğunda otomatik olarak çıkış yapılacaktır.
        </p>
        <button
          onClick={() => {
            setIsActive(true);
            setLastActivity(Date.now());
            update(); // Oturumu manuel olarak yenile
          }}
          className="mt-2 bg-white text-red-500 px-3 py-1 rounded text-sm font-medium hover:bg-red-100"
        >
          Oturumu Yenile
        </button>
      </div>
    </>
  );
}
