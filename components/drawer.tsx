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
  buttons: Page[];
}

const Drawer = ({ open, handleOpen, buttons }: Props) => {
  const { pathname } = useRouter();
  const { t } = useTranslation("common");

  return (
    <>
      <div
        className={`absolute lg:static inset-0 bg-black ease-in-out z-20 duration-200 ${
          open ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"
        }`}
        onClick={handleOpen}
      ></div>
      <aside
        className={`bg-surface1 fixed z-20 left-0 flex flex-col ease-in-out duration-200 w-64 h-full py-2 pr-2 ${
          !open && "-translate-x-full"
        } lg:static lg:translate-x-0`}
      >
        {buttons.map((button) => (
          <Link key={button.path} href={`/election${button.path}`} shallow>
            <button
              className={`px-6 h-10 rounded-r-full flex gap-4 items-center hover:bg-surface4 ${
                `/election${button.path}` === pathname &&
                "bg-secondary-container text-on-secondary-container"
              }`}
            >
              <span className="text-xl">{button.icon}</span>
              <span className="text-sm">{t(button.title)}</span>
            </button>
          </Link>
        ))}
      </aside>
    </>
  );
};

export default Drawer;