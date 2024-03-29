import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { MouseEventHandler } from "react";
import AppLogo from "./app-logo";
import { App } from "./right-bar";

export interface Page {
  id: string;
  title: string;
  path: string;
  icon: JSX.Element;
}

const Drawer = ({
  open,
  handleOpen,
  app,
  page,
  buttons = [],
}: {
  open: boolean;
  handleOpen: MouseEventHandler<Element>;
  app: App;
  page: Page;
  buttons: Page[];
}) => {
  const { t } = useTranslation("common");

  return (
    <>
      <div
        className={`fixed lg:static inset-0 bg-black ease-in-out z-20 duration-200 ${
          open ? "bg-opacity-[0.32]" : "bg-opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={handleOpen}
      />
      <aside
        className={`bg-surface1 fixed lg:static lg:translate-x-0 z-20 lg:bg-none lg:bg-transparent rounded-r-2xl flex flex-col gap-4 ease-in-out duration-200 w-80 lg:w-64 h-full px-3 py-4 lg:rounded-none ${
          !open && "-translate-x-full"
        }`}
      >
        <AppLogo app={app} />
        <nav className="flex flex-col">
          {buttons.map((button) => (
            <Link key={button.path} href={`/elections${button.path}`}>
              <button
                className={`pl-4 pr-6 w-full font-medium h-14 rounded-full flex gap-3 items-center ${
                  button.id === page.id
                    ? "bg-secondary-container text-on-secondary-container"
                    : "hover:bg-on-surface hover:bg-opacity-5"
                }`}
              >
                <span className="text-2xl">{button.icon}</span>
                <span className="text-sm">{t(button.title)}</span>
              </button>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Drawer;
