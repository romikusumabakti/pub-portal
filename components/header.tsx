import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import {
  FaBlog,
  FaBook,
  FaInfoCircle,
  FaUsers,
  FaWaveSquare,
} from "react-icons/fa";
import { GiGalaxy } from "react-icons/gi";
import { IoLogoElectron } from "react-icons/io5";
import {
  MdDarkMode,
  MdHome,
  MdHowToVote,
  MdLanguage,
  MdLightMode,
  MdMenu,
  MdSettingsBrightness,
} from "react-icons/md";
import { Fragment, MouseEventHandler, useState } from "react";
import Trans from "next-translate/Trans";
import { useRouter } from "next/router";
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
    icon: FaBook,
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

interface Props {
  handleOpenDrawer: MouseEventHandler;
  path: string;
  icon: ({}: any) => JSX.Element;
}

import Popover from "./popover";
import QuickSettings from "./quick-settings";

const Header = ({ handleOpenDrawer, path = "common", icon }: Props) => {
  const { data: session, status } = useSession();

  const { theme } = useTheme();

  const AppIcon = icon;

  return (
    <header className="z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-surface1 text-on-surface">
      <div className="flex gap-2">
        <IconButton onClick={handleOpenDrawer} large className="lg:hidden">
          <MdMenu />
        </IconButton>
        <Link href={`/${path}`}>
          <a className="flex items-center gap-2">
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
      </div>
      {/* <input
        placeholder="Telusuri"
        className="h-10 px-4 bg-black rounded-full outline-none dark:bg-white bg-opacity-10 dark:bg-opacity-10 grow placeholder:text-gray-500"
      /> */}
      <div className="flex items-center gap-4">
        <QuickSettings />
        <Popover>
          <Popover.Button as={IconButton}>
            <Image
              src={`/images/pub-portal-animated-${theme}.svg`}
              alt="PUB Portal icon"
              width={32}
              height={32}
            />
          </Popover.Button>
          <Popover.Panel className="grid grid-cols-3 gap-2 p-4 w-max bg-surface1 rounded-3xl">
            {apps.map((app) => {
              const Icon = app.icon;
              return (
                <a
                  key={app.name}
                  className="flex flex-col items-center justify-center flex-1 w-20 h-20 gap-2 cursor-pointer hover:bg-on-surface hover:bg-opacity-5 rounded-2xl"
                >
                  <Icon className="text-2xl" />
                  <div className="text-sm">{app.title}</div>
                </a>
              );
            })}
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
