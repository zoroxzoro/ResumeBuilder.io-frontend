import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./Toggle";

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-3 px-5 flex justify-between items-center shadow-md">
      {/* Logo Section */}
      <Link to={"/dashboard"}>
        <img
          src="/logo.svg"
          className="cursor-pointer"
          width={100}
          height={100}
          alt="Logo"
        />
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Mode Toggle */}
        <ModeToggle />

        {/* Authentication and Dashboard Links */}
        {isSignedIn ? (
          <div className="flex gap-2 items-center">
            <Link to={"/dashboard"}>
              <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <Link to={"/auth/sign-in"}>
            <Button>Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
