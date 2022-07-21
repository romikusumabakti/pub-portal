import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { FaBlog, FaInfoCircle, FaUsers, FaWaveSquare } from "react-icons/fa";
import { GiGalaxy } from "react-icons/gi";
import { IoLogoElectron } from "react-icons/io5";
import { MdBook, MdHome, MdHowToVote, MdMenu } from "react-icons/md";
import { MouseEventHandler } from "react";
import Trans from "next-translate/Trans";
import IconButton from "./icon-button";
import { signIn, useSession } from "next-auth/react";
import Button from "./button";

const apps = [
  {
    name: "home",
    icon: MdHome,
    title: "Beranda",
    description: "Kembali ke beranda",
  },
  {
    name: "activity",
    icon: FaWaveSquare,
    title: "Aktivitas",
  },
  {
    name: "books",
    icon: MdBook,
    title: "Buku",
  },
  {
    name: "forum",
    icon: FaUsers,
    title: "Forum",
  },
  {
    name: "blog",
    icon: FaBlog,
    title: "Blog",
  },
  {
    name: "wiki",
    icon: FaInfoCircle,
    title: "Wiki",
  },
  {
    name: "election",
    icon: MdHowToVote,
    title: "Pemilu",
  },
  {
    name: "borland-x",
    icon: IoLogoElectron,
    title: "Borland X",
    description: "Project IDE C/C++",
  },
  {
    name: "universe",
    icon: GiGalaxy,
    title: "Universe",
    description: "Jelajahi dunia baru",
  },
];

import Popover from "./popover";
import QuickSettings from "./quick-settings";
import useTranslation from "next-translate/useTranslation";

const Header = ({
  handleOpenDrawer,
  path = "common",
  icon,
  title,
}: {
  handleOpenDrawer: MouseEventHandler;
  path: string;
  icon: ({}: any) => JSX.Element;
  title: string;
}) => {
  const { data: session, status } = useSession();
  const { t } = useTranslation("common");
  const { theme } = useTheme();

  const AppIcon = icon;

  return (
    <header className="flex justify-between h-16 pl-2 pr-4 lg:pl-0 md:pr-6 bg-surface1 lg:bg-none lg:bg-transparent text-on-surface">
      <div className="flex items-center gap-2">
        <IconButton onClick={handleOpenDrawer} large className="lg:hidden">
          <MdMenu />
        </IconButton>
        <h1 className="text-xl">{t(title)}</h1>
      </div>
      {/* <input
        placeholder="Telusuri"
        className="h-10 px-4 bg-black rounded-full outline-none dark:bg-white bg-opacity-10 dark:bg-opacity-10 grow placeholder:text-gray-500"
      /> */}
      <div className="flex items-center gap-4">
        <QuickSettings className="hidden md:flex" />
        <Popover>
          <Popover.Button as={IconButton}>
            <Image
              src={`/images/pub-portal-animated-${theme}.svg`}
              alt="PUB Portal icon"
              width={32}
              height={32}
            />
          </Popover.Button>
          <Popover.Panel className="flex flex-col gap-2 p-4 bg-surface1 rounded-3xl">
            <div className="flex items-center justify-center gap-2 p-2">
              <Image
                src={`/images/pub-portal-animated-${theme}.svg`}
                alt="PUB Portal icon"
                width={32}
                height={32}
              />
              <div className="text-xl">
                <span className="font-bold text-primary">PUB</span>{" "}
                <span>Portal</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 w-max">
              {apps.map((app) => {
                const Icon = app.icon;
                return (
                  <a
                    key={app.name}
                    className={`flex flex-col items-center justify-center flex-1 w-20 h-20 gap-2 cursor-pointer hover:bg-on-surface hover:bg-opacity-5 rounded-2xl ${
                      path.includes(app.name) &&
                      "bg-secondary-container text-on-secondary-container"
                    }`}
                  >
                    <Icon className="text-2xl" />
                    <div className="text-sm">{app.title}</div>
                  </a>
                );
              })}
            </div>
          </Popover.Panel>
        </Popover>
        {status === "authenticated" ? (
          <IconButton>
            <Image
              src={session.user?.image!}
              alt={session.user?.name!}
              width={32}
              height={32}
              layout="fixed"
              className="w-6 h-6 rounded-full"
            />
          </IconButton>
        ) : (
          <Button onClick={() => signIn("google")}>Login</Button>
        )}
      </div>
    </header>
  );
};

export default Header;
