import {
  blueFromArgb,
  greenFromArgb,
  redFromArgb,
  Theme,
} from "@material/material-color-utilities/dist";

export function applyTheme(
  theme: Theme,
  options?: {
    dark?: boolean;
    target?: HTMLElement;
  }
): void {
  var _a;
  const target =
    (options === null || options === void 0 ? void 0 : options.target) ||
    document.body;
  const isDark =
    (_a = options === null || options === void 0 ? void 0 : options.dark) !==
      null && _a !== void 0
      ? _a
      : false;
  const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
  for (const [key, value] of Object.entries(scheme.toJSON())) {
    const token = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    target.style.setProperty(
      `--md-sys-color-${token}`,
      `${redFromArgb(value)} ${greenFromArgb(value)} ${blueFromArgb(value)}`
    );
  }
}
