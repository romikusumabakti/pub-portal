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

export const menu = [
  { title: "home", path: "", icon: <MdHome /> },
  { title: "election:schedule", path: "/schedule", icon: <MdEvent /> },
  { title: "election:candidate", path: "/candidate", icon: <MdAccountBox /> },
  { title: "election:voter", path: "/voter", icon: <MdPeople /> },
  { title: "election:simulation", path: "/simulation", icon: <MdHowToVote /> },
  { title: "election:statistic", path: "/statistic", icon: <MdBarChart /> },
  { title: "election:result", path: "/result", icon: <MdDataUsage /> },
];

const Layout = ({ children }: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { t, lang } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("election:title")}</title>
        <meta name="description" content="Pemilihan ketua PUB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header handleOpenDrawer={() => setOpenDrawer((prev) => !prev)} />
      <div className="flex flex-1 min-h-0">
        <Drawer
          open={openDrawer}
          handleOpen={() => setOpenDrawer(false)}
          path="election"
          buttons={menu}
        />
        <main className="flex flex-col flex-1 gap-4 p-4 overflow-auto md:gap-6 md:px-8 md:py-6">
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Layout;
