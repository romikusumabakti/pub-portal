import useTranslation from "next-translate/useTranslation";
import Button from "../button";
import MaterialThemed from "../material-themed";
import CandidatePhoto from "./candidate-photo";
import { Candidate } from "./layout";

const CandidateCard = ({ candidate }: { candidate: Candidate }) => {
  const { t } = useTranslation("common");

  return (
    <MaterialThemed color={candidate.color}>
      <div className="flex flex-1 gap-4 p-4 md:px-8 md:py-6 md:gap-4 md:flex-col rounded-3xl bg-surface1 text-primary">
        <CandidatePhoto
          candidate={candidate}
          className="self-start w-1/4 text-xs md:w-full md:text-2xl"
          themed={false}
        />
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
