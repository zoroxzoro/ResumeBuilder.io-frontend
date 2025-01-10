import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./costumeComps/Header";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isSignedIn && isLoaded) {
    return <Navigate to="/auth/sign-in" />;
  }
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}
