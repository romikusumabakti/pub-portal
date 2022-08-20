import { ElectionCandidate } from "@prisma/client";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import ElectionLayout, { pages } from "../../components/election/layout";

const Result = () => {
  const [candidates, setCandidates] = useState<ElectionCandidate[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/election/count", {
        method: "POST",
      })
        .then((response) => response.json())
        .then((candidate) => console.log(candidate));

      fetch("/api/election/candidates")
        .then((response) => response.json())
        .then((candidates) => setCandidates(candidates));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ElectionLayout page={pages.result}>
      <ResponsiveContainer width="100%" height={256}>
        <PieChart width={256} height={256}>
          <Pie
            data={candidates.map((candidate) => ({
              name: `0${candidate.number} ${candidate.name} (${candidate.votes} suara)`,
              value: candidate.votes,
            }))}
            outerRadius={65}
            label={(entry) => entry.name}
            dataKey="value"
          >
            {candidates.map((candidate) => (
              <Cell key={candidate.number} fill={candidate.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <table>
        <thead>
          <tr>
            {candidates.map((candidate) => (
              <td
                key={candidate.number}
              >{`0${candidate.number} ${candidate.name} (${candidate.votes} suara)`}</td>
            ))}
          </tr>
        </thead>
      </table>
    </ElectionLayout>
  );
};

export default Result;
