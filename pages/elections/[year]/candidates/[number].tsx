import { ElectionCandidate, Person, Student } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Button from "../../../../components/button";
import CandidatePhoto from "../../../../components/elections/candidate-photo";
import ElectionLayout, { pages } from "../../../../components/elections/layout";
import MaterialThemed from "../../../../components/material-themed";
import prisma from "../../../../lib/prisma";
import { ParsedUrlQuery } from "querystring";

export const getStaticPaths: GetStaticPaths = async () => {
  const candidates = await prisma.electionCandidate.findMany({
    include: { election: true },
  });
  const paths = candidates.map((candidate) => ({
    params: {
      year: candidate.election.year.toString(),
      number: candidate.number.toString(),
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

interface IParams extends ParsedUrlQuery {
  year: string;
  number: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { year, number } = context.params as IParams;
  const candidate = await prisma.electionCandidate.findFirst({
    where: {
      election: {
        is: {
          year: parseInt(year),
        },
      },
      number: parseInt(number),
    },
    include: {
      student: {
        include: {
          person: true,
        },
      },
    },
  });
  return { props: { year: parseInt(year), candidate }, revalidate: 60 };
};

const CandidateCard = ({
  year,
  candidate,
}: {
  year: number;
  candidate: ElectionCandidate & {
    student: Student & {
      person: Person;
    };
  };
}) => {
  const { t } = useTranslation("common");

  return (
    <ElectionLayout year={year} page={pages.candidates}>
      <MaterialThemed color={candidate.color}>
        <div className="flex flex-1 gap-4 p-4 md:px-8 md:py-6 md:gap-8 rounded-3xl bg-surface1 text-primary">
          <CandidatePhoto
            candidate={candidate}
            className="self-start w-1/4 text-xs md:text-2xl"
            themed={false}
          />
          <div className="flex flex-col flex-1 gap-4">
            <div className="flex items-center flex-1 gap-4 text-3xl font-bold display">
              {/* <Image
                src="/images/generation-icons/20.svg"
                alt="PUB 20 Integer icon"
                width={24}
                height={24}
              /> */}
              <div>{candidate.student.person.name}</div>
            </div>
            <h1 className="text-3xl">Visi</h1>
            <p>{candidate.vision}</p>
            <h1 className="text-3xl">Misi</h1>
            <ul>
              {candidate.missions.map((mission, i) => (
                <li key={i}>{mission}</li>
              ))}
            </ul>
            <div className="flex flex-wrap justify-between gap-4 md:mt-auto">
              <Button>{t("view-profile")}</Button>
            </div>
          </div>
        </div>
      </MaterialThemed>
    </ElectionLayout>
  );
};

export default CandidateCard;
