import { ElectionCandidate } from "@prisma/client";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import Button from "../button";
import MaterialThemed from "../material-themed";
import CandidatePhoto from "./candidate-photo";

const CandidateCard = ({ candidate }: { candidate: ElectionCandidate }) => {
  const { t } = useTranslation("common");

  return (
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
          <div className="flex flex-wrap justify-between gap-4 md:mt-auto">
            <Link href={`./candidates/${candidate.number}`}>
              <Button size="small">{t("more")}</Button>
            </Link>
            <Button variant="tonal" size="small">
              {t("view-profile")}
            </Button>
          </div>
        </div>
      </div>
    </MaterialThemed>
  );
};

export default CandidateCard;
