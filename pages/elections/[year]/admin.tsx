import { ElectionCandidate } from "@prisma/client";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import ElectionLayout, { pages } from "../../../components/elections/layout";
import { GetStaticPaths, GetStaticProps } from "next";
import prisma from "../../../lib/prisma";
import { IParams } from ".";

export const getStaticPaths: GetStaticPaths = async () => {
  const elections = await prisma.election.findMany();
  const paths = elections.map((election) => ({
    params: {
      year: election.year.toString(),
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { year } = context.params as IParams;
  return { props: { year: parseInt(year) }, revalidate: 60 };
};

const Result = ({ year }: { year: number }) => {
  const [candidates, setCandidates] = useState<ElectionCandidate[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/api/elections/${year}/count`, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((candidate) => console.log(candidate));

      fetch(`/api/elections/${year}/candidates`)
        .then((response) => response.json())
        .then((candidates) => setCandidates(candidates));
    }, 5000);
    return () => clearInterval(interval);
  }, [year]);

  return (
    <ElectionLayout year={year} page={pages.result}>
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
