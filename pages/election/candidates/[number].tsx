import { ElectionCandidate } from "@prisma/client";
import { GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Button from "../../../components/button";
import CandidatePhoto from "../../../components/election/candidate-photo";
import ElectionLayout, { pages } from "../../../components/election/layout";
import MaterialThemed from "../../../components/material-themed";
import prisma from "../../../lib/prisma";

export async function getStaticPaths() {
  return {
    paths: [
      { params: { number: "1" } },
      { params: { number: "2" } },
      { params: { number: "3" } },
    ],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const candidate = await prisma.electionCandidate.findFirst({
    where: {
      election: {
        is: {
          year: 2022,
        },
      },
      number: parseInt(params.number),
    },
  });
  return { props: { candidate }, revalidate: 60 };
};

const CandidateCard = ({ candidate }: { candidate: ElectionCandidate }) => {
  const { t } = useTranslation("common");

  return (
    <ElectionLayout page={pages[2]}>
      <MaterialThemed color={candidate.color || "#2196f3"}>
        <div className="flex flex-1 gap-4 p-4 md:px-8 md:py-6 md:gap-4 md:flex-col rounded-3xl bg-surface1 text-primary">
          <CandidatePhoto
            candidate={candidate}
            className="self-start w-1/4 text-xs md:w-full md:text-2xl"
            themed={false}
          />
          <div className="flex flex-col flex-1 gap-4">
            <div className="flex items-center flex-1 gap-4 text-xl font-bold display">
              <Image
                src="/images/generation-icons/20.svg"
                alt="PUB 20 Integer icon"
                width={24}
                height={24}
              />
              <div>{candidate.name}</div>
            </div>
            <p>{candidate.vision}</p>
            {candidate.mission.map((mission, i) => (
              <li key={i}>{mission}</li>
            ))}
            <div className="flex flex-wrap justify-between gap-4 md:mt-auto">
              <Button size="small">{t("view-profile")}</Button>
            </div>
          </div>
        </div>
      </MaterialThemed>
    </ElectionLayout>
  );
};

export default CandidateCard;
