import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Button from "../button";
import MaterialThemed from "../material-themed";

const CandidateCard = ({ candidate }: any) => {
  const { t, lang } = useTranslation("common");

  return (
    <MaterialThemed color={candidate.color}>
      <div className="flex flex-1 gap-4 p-4 md:px-8 md:py-6 md:gap-4 md:flex-col rounded-3xl bg-surface1 text-primary">
        <div className="relative self-start w-1/4 md:w-full">
          <div className="absolute z-10 flex items-center justify-center w-1/4 text-xs font-bold rounded-full md:text-2xl h-1/4 display bg-primary text-on-primary">
            0{candidate.number}
          </div>
          <Image
            // src={`/images/election-candidates/${candidate.number}.png`}
            src="/images/pica.png"
            alt={candidate.name}
            // layout="responsive"
            width={256}
            height={256}
            className={"z-0 rounded-full bg-secondary-container"}
          ></Image>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center flex-1 text-xl font-bold display">
            {candidate.name}
          </div>
          <div className="flex flex-wrap justify-between gap-4 md:mt-auto">
            <Button size="small">{t("more")}</Button>
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
