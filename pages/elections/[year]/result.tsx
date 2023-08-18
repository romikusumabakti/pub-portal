import { ElectionBallot, ElectionCandidate } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import useSWR, { Fetcher } from "swr";
import Card from "../../../components/card";
import ElectionLayout, { pages } from "../../../components/elections/layout";
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
  const ballotsWithToken = await prisma.electionBallot.findMany({
    where: {
      election: {
        is: {
          year: parseInt(year),
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
  return { props: { year: parseInt(year), ballots }, revalidate: 60 };
};

const fetcher: Fetcher<ElectionCandidate[], string> = (...args) =>
  fetch(...args).then((res) => res.json());

const Result = ({
  year,
  ballots,
}: {
  year: number;
  ballots: (ElectionBallot & {
    candidate: {
      number: number;
      name: string;
    } | null;
  })[];
}) => {
  const { data } = useSWR<ElectionCandidate[]>(
    `/api/elections/${year}/candidates`,
    fetcher,
    { refreshInterval: 5000, fallbackData: [] }
  );

  return (
    <ElectionLayout year={year} page={pages.result}>
      <ResponsiveContainer width="100%" height={256}>
        <PieChart width={256} height={256}>
          <Pie
            data={data!.map((candidate) => ({
              name: `0${candidate.number} ${candidate.name} (${candidate.votes} suara)`,
              value: candidate.votes,
            }))}
            outerRadius={65}
            label={(entry) => entry.name}
            dataKey="value"
          >
            {data!.map((candidate) => (
              <Cell key={candidate.number} fill={candidate.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <table>
        <thead>
          <tr>
            {data!.map((candidate) => (
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
