import CandidateCard from "../../components/election/candidate-card";
import ElectionLayout, { pages } from "../../components/election/layout";
import { Candidate } from "@prisma/client";
import prisma from "../../lib/prisma";
import { GetStaticProps } from "next";

const Candidates = ({ candidates }: { candidates: Candidate[] }) => {
  return (
    <ElectionLayout page={pages[2]}>
      <div className="flex flex-col gap-4 lg:gap-6 md:flex-row">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </ElectionLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const candidates = await prisma.candidate.findMany({
    where: {
      electionId: 3,
    },
  });
  return { props: { candidates }, revalidate: 60 };
};

export default Candidates;
