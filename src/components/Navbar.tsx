
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-primary to-accent py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-white text-2xl font-bold">
            FluenFlash
          </Link>
        </div>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>

            {isMenuOpen && (
              <div className="absolute top-16 right-0 left-0 bg-white shadow-md z-50 p-4 flex flex-col space-y-2">
                <Link
                  to="/"
                  className="px-4 py-2 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="px-4 py-2 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/words-learned"
                      className="px-4 py-2 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Words Learned
                    </Link>
                    <Button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      variant="ghost"
                      className="justify-start px-4 py-2 hover:bg-gray-100 rounded-md"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-gray-200">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-white hover:text-gray-200">
                  Dashboard
                </Link>
                <Link to="/words-learned" className="text-white hover:text-gray-200">
                  Words Learned
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="ml-2">
                      {user?.name || "Account"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:text-gray-200">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary">Register</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
