import CandidateCard from "../../components/election/candidate-card";
import ElectionLayout, { pages } from "../../components/election/layout";
import { ElectionCandidate } from "@prisma/client";
import prisma from "../../lib/prisma";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const candidates = await prisma.electionCandidate.findMany({
    where: {
      election: {
        is: {
          year: 2022,
        },
      },
    },
  });
  return { props: { candidates }, revalidate: 60 };
};

const Candidates = ({ candidates }: { candidates: ElectionCandidate[] }) => {
  return (
    <ElectionLayout page={pages.candidates}>
      <div className="flex flex-col gap-4 lg:gap-6 md:flex-row">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </ElectionLayout>
  );
};

export default Candidates;
