import { ElectionBallot, ElectionCandidate } from "@prisma/client";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import Card from "../../components/card";
import ElectionLayout, { pages } from "../../components/election/layout";
import prisma from "../../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const ballotsWithToken = await prisma.electionBallot.findMany({
    where: {
      election: {
        is: {
          year: 2022,
        },
      },
      counted: true,
    },
    include: {
      candidate: {
        select: {
          number: true,
          name: true,
        },
      },
    },
  });
  const ballots = ballotsWithToken.map((ballot) => ({
    ...ballot,
    token: `${ballot.token.slice(0, 2)}****${ballot.token.slice(-2)}`,
  }));
  return { props: { ballots }, revalidate: 60 };
};

const Result = ({
  ballots,
}: {
  ballots: (ElectionBallot & {
    candidate: {
      number: number;
      name: string;
    } | null;
  })[];
}) => {
  const [candidates, setCandidates] = useState<ElectionCandidate[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
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
              <th
                key={candidate.number}
              >{`0${candidate.number} ${candidate.name} (${candidate.votes} suara)`}</th>
            ))}
          </tr>
        </thead>
      </table>
      <Card>
        <h1 className="text-3xl display">Surat suara terhitung</h1>
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Suara</th>
            </tr>
          </thead>
          <tbody>
            {ballots.map((ballot) => (
              <tr key={ballot.id}>
                <td>
                  <code>{ballot.token}</code>
                </td>
                <td>
                  {ballot.candidate
                    ? `0${ballot.candidate.number} ${ballot.candidate.name}`
                    : "(rusak)"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </ElectionLayout>
  );
};

export default Result;
