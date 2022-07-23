import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaUsers } from "react-icons/fa";
import { GiGalaxy } from "react-icons/gi";
import { IoLogoElectron } from "react-icons/io5";
import {
  MdArticle,
  MdBook,
  MdHome,
  MdHowToVote,
  MdLegendToggle,
  MdRssFeed,
} from "react-icons/md";
import AppLogo from "./app-logo";
import Button from "./button";
import IconButton from "./icon-button";
import Popover from "./popover";
import PortalIcon from "./portal-icon";
import QuickSettings from "./quick-settings";

export interface App {
  id: string;
  icon: ({}: any) => JSX.Element;
  title: string;
  description?: string;
  path: string;
}

export const apps: Record<string, App> = {
  portal: {
    id: "portal",
    icon: PortalIcon,
    title: "Beranda",
    description: "Kembali ke beranda",
    path: "/",
  },
  activity: {
    id: "activity",
    icon: MdLegendToggle,
    title: "Aktivitas",
    path: "/activity",
  },
  books: {
    id: "books",
    icon: MdBook,
    title: "Buku",
    path: "/books",
  },
  forum: {
    id: "forum",
    icon: FaUsers,
    title: "Forum",
    path: "/forum",
  },
  blog: {
    id: "blog",
    icon: MdRssFeed,
    title: "Blog",
    path: "/blog",
  },
  wiki: {
    id: "wiki",
    icon: MdArticle,
    title: "Wiki",
    path: "/wiki",
  },
  election: {
    id: "election",
    icon: MdHowToVote,
    title: "Pemilu",
    path: "/election",
  },
  "borland-x": {
    id: "borland-x",
    icon: IoLogoElectron,
    title: "Borland X",
    description: "Project IDE C/C++",
    path: "/borland-x",
  },
  universe: {
    id: "universe",
    icon: GiGalaxy,
    title: "Universe",
    description: "Jelajahi dunia baru",
    path: "/universe",
  },
};

const buttons = [
  {
    app: apps.portal,
    icon: MdHome,
  },
  {
    app: apps.books,
    icon: apps.books.icon,
  },
  {
    app: apps.wiki,
    icon: apps.wiki.icon,
  },
  {
    app: apps.election,
    icon: apps.election.icon,
  },
  {
    app: apps["borland-x"],
    icon: apps["borland-x"].icon,
  },
];

const RightBar = ({ activeAppId }: { activeAppId: string }) => {
  const { data: session, status } = useSession();

  return (
    <div className="flex items-center h-16 gap-4 px-4">
      <QuickSettings className="hidden md:flex" />
      <Popover>
        <Popover.Button as={IconButton}>
          <PortalIcon />
        </Popover.Button>
        <Popover.Panel className="flex flex-col gap-2 p-4 bg-surface1 rounded-3xl">
          <div className="flex justify-center p-2">
            <AppLogo app={apps.portal} />
          </div>
          <div className="grid grid-cols-3 gap-2 w-max">
            {buttons.map((button) => {
              const Icon = button.icon;
              return (
                <Link key={button.app.id} href={button.app.path}>
                  <a
                    className={`flex flex-col items-center justify-center flex-1 w-20 h-20 gap-2 cursor-pointer rounded-2xl ${
                      button.app.id === activeAppId
                        ? "bg-secondary-container text-on-secondary-container"
                        : "hover:bg-on-surface hover:bg-opacity-5"
                    }`}
                  >
                    <Icon className="text-2xl" />
                    <div className="text-sm">{button.app.title}</div>
                  </a>
                </Link>
              );
            })}
          </div>
          <QuickSettings className="self-end md:hidden" />
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
  );
};

export default RightBar;
