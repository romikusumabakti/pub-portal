import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { Key, MouseEventHandler } from "react";

interface Page {
  title: string;
  path: Key;
  icon: any;
}

interface Props {
  open: Boolean;
  handleOpen: MouseEventHandler;
  path: string;
  buttons: Page[];
}

const Drawer = ({ open, handleOpen, path, buttons }: Props) => {
  const { pathname } = useRouter();
  const { t } = useTranslation("common");

  return (
    <>
      <div
        className={`fixed md:static inset-0 bg-black ease-in-out z-20 duration-200 ${
          open ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={handleOpen}
      />
      <aside
        className={`bg-surface1 fixed z-20 left-0 flex flex-col ease-in-out duration-200 w-80 md:w-64 h-full pr-4 ${
          !open && "-translate-x-full"
        } lg:static lg:translate-x-0`}
      >
        {buttons.map((button) => (
          <Link key={button.path} href={`/${path}${button.path}`} shallow>
            <button
              className={`px-6 font-medium h-14 rounded-r-full flex gap-3 items-center ${
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
      </aside>
    </>
  );
};

export default Drawer;
