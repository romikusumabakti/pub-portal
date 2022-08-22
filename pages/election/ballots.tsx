import { ElectionBallot } from "@prisma/client";
import { GetStaticProps } from "next";
import prisma from "../../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const ballots = await prisma.electionBallot.findMany({
    where: {
      election: {
        is: {
          year: 2022,
        },
      },
    },
  });
  return { props: { ballots }, revalidate: 60 };
};

const Ballots = ({ ballots }: { ballots: ElectionBallot[] }) => {
  return (
    <div>
      {ballots.map((ballot) => (
        <div key={ballot.id}>{ballot.token}</div>
      ))}
    </div>
  );
};

export default Ballots;
