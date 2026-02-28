import { useState, useEffect } from "react";
import { WelcomePage } from "@/components/WelcomePage";
import { Dashboard } from "@/components/Dashboard";
import { UserData } from "@/types/finance";

const Index = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("smartsave_user");
    if (stored) {
      try { setUserData(JSON.parse(stored)); } catch {}
    }
    // Apply saved theme
    const theme = localStorage.getItem("theme");
    if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("smartsave_user");
    setUserData(null);
  };

  if (userData) {
    return <Dashboard userData={userData} onLogout={handleLogout} />;
  }

  return <WelcomePage onSubmit={setUserData} />;
};

export default Index;
