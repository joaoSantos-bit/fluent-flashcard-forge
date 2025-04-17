
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { AppLanguageSelector } from "./AppLanguageSelector";
import { useAppLanguage } from "@/contexts/AppLanguageContext";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useAppLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              FluenFlash
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground px-3 py-2 text-sm font-medium"
            >
              {t("navbar.home")}
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground px-3 py-2 text-sm font-medium"
                >
                  {t("navbar.dashboard")}
                </Link>
                <Link
                  to="/words-learned"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground px-3 py-2 text-sm font-medium"
                >
                  {t("navbar.wordsLearned")}
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex md:items-center md:space-x-2">
            <AppLanguageSelector />
            <ThemeToggle />
            
            {isAuthenticated ? (
              <Button variant="destructive" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                {t("navbar.logout")}
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">
                    <LogIn className="mr-2 h-4 w-4" />
                    {t("navbar.login")}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button>{t("navbar.register")}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-1 px-4 py-3">
            <div className="mb-4">
              <AppLanguageSelector />
            </div>
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              onClick={closeMenu}
            >
              {t("navbar.home")}
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={closeMenu}
                >
                  {t("navbar.dashboard")}
                </Link>
                <Link
                  to="/words-learned"
                  className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={closeMenu}
                >
                  {t("navbar.wordsLearned")}
                </Link>
              </>
            )}
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              {isAuthenticated ? (
                <Button
                  variant="destructive"
                  className="w-full justify-center"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("navbar.logout")}
                </Button>
              ) : (
                <div className="grid gap-2">
                  <Link to="/login" className="w-full" onClick={closeMenu}>
                    <Button variant="outline" className="w-full justify-center">
                      <LogIn className="mr-2 h-4 w-4" />
                      {t("navbar.login")}
                    </Button>
                  </Link>
                  <Link to="/register" className="w-full" onClick={closeMenu}>
                    <Button className="w-full justify-center">
                      {t("navbar.register")}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
