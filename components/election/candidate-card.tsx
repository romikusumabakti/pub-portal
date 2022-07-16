import {
  argbFromHex,
  themeFromSourceColor,
} from "@material/material-color-utilities/dist";
import { useTheme } from "next-themes";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Button from "../button";
import { applyTheme } from "../../utils/theme";

const CandidateCard = ({ candidate }: any) => {
  const { t, lang } = useTranslation("common");

  const { theme, systemTheme } = useTheme();
  const materialtheme = themeFromSourceColor(argbFromHex(candidate.color));
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let dark = false;
    if (theme === "system") {
      dark = systemTheme === "dark";
    } else if (theme === "dark") {
      dark = true;
    }
    applyTheme(materialtheme, {
      target: cardRef.current,
      dark: dark,
    });
  }, [materialtheme, theme, systemTheme]);

  return (
    <div
      ref={cardRef}
      className="flex flex-1 gap-8 px-8 py-6 md:gap-4 md:flex-col rounded-3xl bg-surface1 text-primary"
    >
      <div className="relative w-1/3 md:w-full">
        <div className="absolute z-10 flex items-center justify-center w-1/4 font-bold rounded-full md:text-2xl h-1/4 display bg-primary text-on-primary">
          0{candidate.number}
        </div>
        <Image
          src={`/images/election-candidates/${candidate.number}.png`}
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
  );
};

export default CandidateCard;
