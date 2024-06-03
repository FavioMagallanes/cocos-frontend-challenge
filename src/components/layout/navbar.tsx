import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "../ui/logo";
import { Icon } from "../icon";

type NavbarProps = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const Navbar: FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const handleToggleDarkMode = () => {
    toggleDarkMode();
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold">
        <Logo />
        <span className="sr-only">Acme Inc</span>
      </NavLink>
      <nav className="flex items-center gap-4 sm:gap-6">
        <NavLink
          to="/"
          className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
        >
          Home
        </NavLink>
        <NavLink
          to="portfolio"
          className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
        >
          Portfolio
        </NavLink>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleDarkMode}
          className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
        >
          {isDarkMode ? (
            <Icon className="w-4 h-4" name="sun" />
          ) : (
            <Icon className="w-4 h-4" name="moon" />
          )}
          <span className="sr-only">Toggle dark mode</span>
        </Button>
      </nav>
    </header>
  );
};
