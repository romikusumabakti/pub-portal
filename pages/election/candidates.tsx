import CandidateCard from "../../components/election/candidate-card";
import { NextPage } from "next";
import ElectionLayout, {
  candidates,
  pages,
} from "../../components/election/layout";

const Candidates: NextPage = () => {
  return (
    <ElectionLayout page={pages[2]}>
      <div className="flex flex-col gap-4 lg:gap-6 md:flex-row">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.number} candidate={candidate} />
        ))}
      </div>
    </ElectionLayout>
  );
};

export default Candidates;
