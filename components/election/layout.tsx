import {
  MdAccountBox,
  MdBarChart,
  MdDataUsage,
  MdEvent,
  MdHome,
  MdHowToVote,
  MdPeople,
} from "react-icons/md";
import { Page } from "../drawer";
import Layout from "../layout";
import { apps } from "../right-bar";

export interface Candidate {
  number: number;
  name: string;
  color: string;
}

export const candidates: Candidate[] = [
  {
    number: 1,
    name: "Anggi Permana",
    color: "#f44336",
  },
  {
    number: 2,
    name: "Fadli Fathurrahman",
    color: "#ffc107",
  },
  {
    number: 3,
    name: "Sawaluddin Siregar",
    color: "#2196f3",
  },
];

export const pages: Page[] = [
  {
    id: "home",
    title: "home",
    path: "/",
    icon: <MdHome />,
  },
  {
    id: "schedule",
    title: "election:schedule",
    path: "/schedule",
    icon: <MdEvent />,
  },
  {
    id: "candidates",
    title: "election:candidates",
    path: "/candidates",
    icon: <MdAccountBox />,
  },
  {
    id: "voters",
    title: "election:voters",
    path: "/voters",
    icon: <MdPeople />,
  },
  {
    id: "simulation",
    title: "election:simulation",
    path: "/simulation",
    icon: <MdHowToVote />,
  },
  {
    id: "statistics",
    title: "election:statistics",
    path: "/statistics",
    icon: <MdBarChart />,
  },
  {
    id: "result",
    title: "election:result",
    path: "/result",
    icon: <MdDataUsage />,
  },
];

const ElectionLayout = ({ children, page }: { children: any; page: Page }) => {
  return (
    <Layout app={apps.election} menu={pages} page={page}>
      {children}
    </Layout>
  );
};

export default ElectionLayout;
