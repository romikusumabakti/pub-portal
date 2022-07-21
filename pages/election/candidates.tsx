import CandidateCard from "../../components/election/candidate-card";
import Layout from "../../components/election/layout";
import { NextPage } from "next";
import { candidates } from ".";

const Candidates: NextPage = () => {
  return (
    <Layout title="election:candidates">
      <div className="flex flex-col gap-4 lg:gap-6 md:flex-row">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.number} candidate={candidate} />
        ))}
      </div>
    </Layout>
  );
};

export default Candidates;
