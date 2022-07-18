import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import {
  MdAccountBox,
  MdBarChart,
  MdDataUsage,
  MdEvent,
  MdHome,
  MdHowToVote,
  MdPeople,
} from "react-icons/md";
import CandidateCard from "../../components/election/candidate-card";
import Layout from "../../components/election/layout";
import Footer from "../../components/footer";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";

export const menu = [
  { title: "home", path: "", icon: <MdHome /> },
  { title: "election:schedule", path: "/schedule", icon: <MdEvent /> },
  { title: "election:candidate", path: "/candidate", icon: <MdAccountBox /> },
  { title: "election:voter", path: "/voter", icon: <MdPeople /> },
  { title: "election:simulation", path: "/simulation", icon: <MdHowToVote /> },
  { title: "election:statistic", path: "/statistic", icon: <MdBarChart /> },
  { title: "election:result", path: "/result", icon: <MdDataUsage /> },
];

const candidates = [
  {
    number: 1,
    name: "Anggi Permana",
    color: "#f44336",
  },
  {
    number: 2,
    name: "Azriel Pazarudin",
    color: "#ffc107",
  },
  {
    number: 3,
    name: "Fadli Fathurrahman",
    color: "#4caf50",
  },
  // {
  //   number: 4,
  //   name: "Sawaluddin Siregar",
  //   color: "#2196f3",
  // },
];

const Page: NextPageWithLayout = () => {
  const { t, lang } = useTranslation("common");
  return (
    <>
      {/* <Head>
        <title>{t("election:title")}</title>
        <meta name="description" content="Pemilihan ketua PUB" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Layout menu={menu}>
        <div className="flex flex-col gap-4 md:gap-6 md:flex-row">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.number} candidate={candidate} />
          ))}
        </div>
        <Footer />
      </Layout>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  console.log("Layout berfungsi");
  return <Layout menu={menu}>{page}</Layout>;
};

export default Page;
