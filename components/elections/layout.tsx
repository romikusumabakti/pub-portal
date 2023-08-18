import { useSession } from "next-auth/react";
import {
  MdAccountBox,
  MdAdminPanelSettings,
  MdDataUsage,
  MdEvent,
  MdHome,
  MdHowToVote,
  MdPeople,
} from "react-icons/md";
import { Page } from "../drawer";
import Layout from "../layout";
import { apps } from "../right-bar";

export let pages: { [key: string]: Page } = {
  home: {
    id: "home",
    title: "home",
    path: "/",
    icon: <MdHome />,
  },
  //schedule: {
  //   id: "schedule",
  //   title: "elections:schedule",
  //   path: "/schedule",
  //   icon: <MdEvent />,
  // },
  candidates: {
    id: "candidates",
    title: "elections:candidates",
    path: "/candidates",
    icon: <MdAccountBox />,
  },
  voters: {
    id: "voters",
    title: "elections:voters",
    path: "/voters",
    icon: <MdPeople />,
  },
  simulation: {
    id: "simulation",
    title: "elections:simulation",
    path: "/simulation",
    icon: <MdHowToVote />,
  },
  result: {
    id: "result",
    title: "elections:result",
    path: "/result",
    icon: <MdDataUsage />,
  },
};

const ElectionLayout = ({
  children,
  year,
  page,
}: {
  children: any;
  year: number;
  page: Page;
}) => {
  const { data: session, status } = useSession();

  if (session?.user?.email === "romikusumab@gmail.com")
    pages = {
      ...pages,
      admin: {
        id: "admin",
        title: "Dasbor admin",
        path: "/admin",
        icon: <MdAdminPanelSettings />,
      },
    };

  return (
    <Layout
      app={{ ...apps.elections, title: `${apps.elections} ${year}` }}
      menu={Object.values(pages).map((page) => ({
        ...page,
        path: `/${year}${page.path}`,
      }))}
      page={page}
    >
      {children}
    </Layout>
  );
};

export default ElectionLayout;
