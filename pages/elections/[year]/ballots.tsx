import { ElectionBallot, ElectionCandidate } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import prisma from "../../../lib/prisma";
import { IParams } from ".";
import AppLogo from "../../../components/app-logo";
import { apps } from "../../../components/right-bar";
import CandidateCard from "../../../components/elections/candidate-card";
import { MdHowToVote } from "react-icons/md";
import Trans from "next-translate/Trans";

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
  const election = await prisma.election.findUnique({
    where: { year: parseInt(year) },
  });
  const ballots = await prisma.electionBallot.findMany({
    where: {
      electionId: election!.id,
    },
  });
  const candidates = await prisma.electionCandidate.findMany({
    where: {
      electionId: election!.id,
    },
    orderBy: {
      number: "asc",
    },
  });
  return {
    props: { year: parseInt(year), ballots, candidates },
    revalidate: 60,
  };
};

const Ballots = ({
  year,
  ballots,
  candidates,
}: {
  year: number;
  ballots: ElectionBallot[];
  candidates: ElectionCandidate[];
}) => {
  return (
    <div className="grid grid-cols-2 divide-x divide-y w-[21cm] border">
      {ballots.map((ballot, i) => (
        <div
          key={ballot.id}
          className={`flex flex-col items-center justify-center gap-4 p-4 h-[14cm] ${
            (i + 1) % 4 === 0 && "break-after-page"
          }`}
        >
          <div className="flex flex-col grow justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              <MdHowToVote size={48} className="text-primary" />
              <h1 className="text-2xl display">
                <Trans
                  i18nKey="elections:logo"
                  components={[
                    <span key={0} className="font-bold text-primary" />,
                    <span key={1} />,
                  ]}
                />{" "}
                <span>{year}</span>
              </h1>
            </div>
            <div className="flex gap-4">
              {candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  print={true}
                />
              ))}
            </div>
            <div className="flex flex-col items-center gap-1">
              Token:
              <div className="font-mono text-2xl border px-2 py-1">
                {ballot.token}
              </div>
            </div>
          </div>
          <div className="text-xs mt-auto flex flex-col gap-2">
            <p>
              *Setelah selesai melakukan pemungutan suara, Anda dapat menyimpan
              surat suara ini di tempat yang aman
            </p>
            <p>
              *Jangan memberitahu token ini kepada siapa pun, jangan membuang
              surat suara ini kecuali dihancurkan terlebih dahulu
            </p>
            <p>
              *Token digunakan sebagai tanda terima untuk memverifikasi bahwa
              suara Anda dihitung
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ballots;
