import {
  MdAccountBox,
  MdBarChart,
  MdDataUsage,
  MdEvent,
  MdHome,
  MdHowToVote,
  MdPeople,
} from "react-icons/md";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useState } from "react";
import Drawer from "../drawer";
import Footer from "../footer";
import Header from "../header";
import ElectionIcon from "../icons/election-icon";

export const menu = [
  { title: "home", path: "", icon: <MdHome /> },
  { title: "election:schedule", path: "/schedule", icon: <MdEvent /> },
  { title: "election:candidates", path: "/candidates", icon: <MdAccountBox /> },
  { title: "election:voters", path: "/voters", icon: <MdPeople /> },
  { title: "election:simulation", path: "/simulation", icon: <MdHowToVote /> },
  { title: "election:statistic", path: "/statistic", icon: <MdBarChart /> },
  { title: "election:result", path: "/result", icon: <MdDataUsage /> },
];

const Layout = ({ children, title }: { children: any; title: string }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>
          {t(title)} - {t("election:title")}
        </title>
        <meta name="description" content="Pemilihan ketua PUB" />
        <link rel="icon" href="/favicon/election.ico" />
      </Head>
      <Drawer
        open={openDrawer}
        handleOpen={() => setOpenDrawer(false)}
        path="election"
        icon={ElectionIcon}
        buttons={menu}
      />
      <div className="flex flex-col flex-1 min-h-0">
        <Header
          handleOpenDrawer={() => setOpenDrawer((prev) => !prev)}
          path="election"
          title={title}
        />
        <main className="flex flex-col flex-1 gap-4 p-4 overflow-auto lg:bg-surface lg:rounded-tl-2xl lg:gap-6 lg:px-8 lg:py-6">
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Layout;
