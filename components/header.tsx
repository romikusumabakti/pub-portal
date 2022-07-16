import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import {
  FaBlog,
  FaBook,
  FaChrome,
  FaHome,
  FaInfoCircle,
  FaUsers,
  FaVoteYea,
  FaWaveSquare,
} from "react-icons/fa";
import { GiGalaxy } from "react-icons/gi";
import {
  MdDarkMode,
  MdLightMode,
  MdMenu,
  MdSettingsBrightness,
} from "react-icons/md";
import { NextPage } from "next";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Trans from "next-translate/Trans";
import { useRouter } from "next/router";
import IconButton from "./icon-button";
import { signIn, useSession } from "next-auth/react";
import Button from "./button";

const apps = [
  {
    name: "home",
    icon: <FaHome />,
    title: "Beranda",
    description: "Kembali ke beranda",
  },
  {
    name: "activity",
    icon: <FaWaveSquare />,
    title: "Aktivitas",
  },
  {
    name: "learn",
    icon: <FaBook />,
    title: "Belajar",
  },
  {
    name: "forum",
    icon: <FaUsers />,
    title: "Forum",
  },
  {
    name: "blog",
    icon: <FaBlog />,
    title: "Blog",
  },
  {
    name: "wiki",
    icon: <FaInfoCircle />,
    title: "Wiki",
  },
  {
    name: "election",
    icon: <FaVoteYea />,
    title: "Pemilu",
  },
  {
    name: "universe",
    icon: <GiGalaxy />,
    title: "Universe",
    description: "Jelajahi dunia baru",
  },
];

const languages = [
  { locale: "id", name: "Bahasa Indonesia" },
  { locale: "en", name: "English" },
  { locale: "ar", name: "العربية" },
  { locale: "su", name: "Basa Sunda" },
  { locale: "jv", name: "Basa Jawa" },
  { locale: "min", name: "Baso Minangkabau" },
  { locale: "ms", name: "Bahasa Melayu" },
  { locale: "btk", name: "Hata Batak" },
];

interface Props {
  handleOpenDrawer: MouseEventHandler;
}

const Header = ({ handleOpenDrawer }: Props) => {
  const [appsButton, setAppsButton] = useState();
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  const { data: session, status } = useSession();

  const { theme, systemTheme, setTheme } = useTheme();
  
  return (
    <header className="z-30 flex justify-between h-16 px-6 py-2 bg-surface1">
      <div className="flex gap-2">
        <IconButton onClick={handleOpenDrawer} large className="lg:hidden">
          <MdMenu />
        </IconButton>
        <Link href="/">
          <a className="flex items-center gap-2">
            <Image
              src="/images/icon.svg"
              alt="PUB Portal icon"
              width={32}
              height={32}
            />
            <span className="text-xl display">
              <Trans
                i18nKey="election:title"
                components={[
                  <span key={0} className="font-bold text-blue-500" />,
                  <span key={1} className="text-zinc-700 dark:text-zinc-400" />,
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
        <IconButton
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" || (!theme && systemTheme === "dark") ? (
            <MdLightMode className="w-6 h-6" />
          ) : (
            <MdDarkMode className="w-6 h-6" />
          )}
        </IconButton>
        <select
          value={locale}
          onChange={(e) =>
            router.push({ pathname, query }, asPath, { locale: e.target.value })
          }
        >
          {languages.map((language) => (
            <option key={language.locale} value={language.locale}>
              {language.name}
            </option>
          ))}
        </select>
        {status === "authenticated" ? (
          <Image
            src={session.user?.image}
            alt={session.user?.name}
            width={32}
            height={32}
            layout="fixed"
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <Button onClick={() => signIn("google")}>Login</Button>
        )}
      </div>
    </header>
  );
};

export default Header;
