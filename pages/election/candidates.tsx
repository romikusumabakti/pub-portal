import CandidateCard from "../../components/election/candidate-card";
import ElectionLayout, { pages } from "../../components/election/layout";
import { Candidate } from "@prisma/client";
import prisma from "../../lib/prisma";

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

export const getServerSideProps = async () => {
  const candidates = await prisma.candidate.findMany({
    where: {
      electionId: 3,
    },
  });
  return { props: { candidates } };
};

export default Candidates;
