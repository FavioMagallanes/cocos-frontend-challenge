import { NavLink } from "react-router-dom";
import { Logo } from "../ui/logo";
import { ModeToggle } from "../ui/mode-toggle";

export const Navbar = () => {
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
        <ModeToggle />
      </nav>
    </header>
  );
};
