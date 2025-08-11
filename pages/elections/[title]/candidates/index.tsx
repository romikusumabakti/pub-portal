import CandidateCard from "../../../../components/elections/candidate-card";
import ElectionLayout, { pages } from "../../../../components/elections/layout";
import { ElectionCandidate } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { GetStaticProps } from "next";
import { IParams } from "..";

export async function getStaticPaths() {
  const elections = await prisma.election.findMany();
  const paths = elections.map((election) => ({
    params: {
      title: election.title,
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { title } = context.params as IParams;
  const candidates = await prisma.electionCandidate.findMany({
    where: {
      election: {
        is: {
          title,
        },
      },
    },
    orderBy: { number: "asc" },
  });
  return { props: { title, candidates }, revalidate: 60 };
};

const Candidates = ({
  title,
  candidates,
}: {
  title: string;
  candidates: ElectionCandidate[];
}) => {
  return (
    <ElectionLayout title={title} page={pages.candidates}>
      <div className="flex flex-col gap-4 lg:gap-6 md:flex-row">
        {candidates?.map((candidate) => (
          <CandidateCard
            key={candidate.number}
            candidate={candidate}
            buttons={true}
          />
        ))}
      </div>
    </ElectionLayout>
  );
};

export default Candidates;
