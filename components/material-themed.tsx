import {
  argbFromHex,
  themeFromSourceColor,
} from "@material/material-color-utilities/dist";
import { applyTheme } from "../lib/theme";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

const MaterialThemed = ({
  children,
  color,
}: {
  children: any;
  color: string;
}) => {
  const { theme, systemTheme } = useTheme();
  const materialtheme = themeFromSourceColor(argbFromHex(color));
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let dark = false;
    if (theme === "system") {
      dark = systemTheme === "dark";
    } else if (theme === "dark") {
      dark = true;
    }
    applyTheme(materialtheme, {
      target: ref.current!,
      dark: dark,
    });
  }, [materialtheme, theme, systemTheme]);

  return <div ref={ref}>{children}</div>;
};

export default MaterialThemed;
