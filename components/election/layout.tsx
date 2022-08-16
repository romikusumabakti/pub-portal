import {
  MdAccountBox,
  MdDataUsage,
  MdEvent,
  MdHome,
  MdHowToVote,
  MdPeople,
} from "react-icons/md";
import { Page } from "../drawer";
import Layout from "../layout";
import { apps } from "../right-bar";

export const pages: { [key: string]: Page } = {
  home: {
    id: "home",
    title: "home",
    path: "/",
    icon: <MdHome />,
  },
  //schedule: {
  //   id: "schedule",
  //   title: "election:schedule",
  //   path: "/schedule",
  //   icon: <MdEvent />,
  // },
  candidates: {
    id: "candidates",
    title: "election:candidates",
    path: "/candidates",
    icon: <MdAccountBox />,
  },
  voters: {
    id: "voters",
    title: "election:voters",
    path: "/voters",
    icon: <MdPeople />,
  },
  simulation: {
    id: "simulation",
    title: "election:simulation",
    path: "/simulation",
    icon: <MdHowToVote />,
  },
  result: {
    id: "result",
    title: "election:result",
    path: "/result",
    icon: <MdDataUsage />,
  },
};

const ElectionLayout = ({ children, page }: { children: any; page: Page }) => {
  return (
    <Layout app={apps.election} menu={Object.values(pages)} page={page}>
      {children}
    </Layout>
  );
};

export default ElectionLayout;
