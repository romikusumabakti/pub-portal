import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { Key, MouseEventHandler } from "react";
import QuickSettings from "./quick-settings";

export interface Page {
  title: string;
  path: Key;
  icon: any;
}

const Drawer = ({
  open,
  handleOpen,
  path,
  icon,
  buttons = [],
}: {
  open: Boolean;
  handleOpen: MouseEventHandler;
  path: string;
  icon: ({}: any) => JSX.Element;
  buttons: Page[];
}) => {
  const { pathname } = useRouter();
  const { t } = useTranslation("common");

  const AppIcon = icon;

  return (
    <>
      <div
        className={`fixed lg:static inset-0 bg-black ease-in-out z-30 duration-200 ${
          open ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={handleOpen}
      />
      <aside
        className={`bg-surface1 fixed lg:static lg:translate-x-0 z-30 lg:bg-none lg:bg-transparent rounded-r-2xl flex flex-col gap-4 ease-in-out duration-200 w-80 lg:w-64 h-full px-3 py-4 lg:rounded-none ${
          !open && "-translate-x-full"
        }`}
      >
        <Link href={`/${path}`}>
          <a className="flex items-center gap-2 ml-4">
            <AppIcon className="w-8" />
            <span className="text-xl display">
              <Trans
                i18nKey={`${path}:logo`}
                components={[
                  <span key={0} className="font-bold text-primary" />,
                  <span key={1} />,
                ]}
              />
            </span>
          </a>
        </Link>
        <nav className="flex flex-col">
          {buttons.map((button) => (
            <Link key={button.path} href={`/${path}${button.path}`}>
              <button
                className={`pl-4 pr-6 font-medium h-14 rounded-full flex gap-3 items-center ${
                  `/${path}${button.path}` === pathname
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
        <QuickSettings className="self-end md:hidden" />
      </aside>
    </>
  );
};

export default Drawer;
