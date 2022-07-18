import CandidateCard from "../../components/election/candidate-card";
import Layout from "../../components/election/layout";
import { NextPage } from "next";
import { candidates } from ".";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-4 md:gap-6 md:flex-row">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.number} candidate={candidate} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
