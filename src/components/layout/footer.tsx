export const Footer = () => {
  return (
    <footer className="flex items-center justify-between h-16 px-4 md:px-6 border-t bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        &copy; Make with ❤️ by {"Favio Magallanes"}
      </div>
      <nav className="flex items-center gap-4 sm:gap-6">
        <a
          href="https://cocos.capital/"
          className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cocos Capital
        </a>
      </nav>
    </footer>
  );
};
