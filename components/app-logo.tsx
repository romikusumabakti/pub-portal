import Trans from "next-translate/Trans";
import Link from "next/link";
import { App } from "./right-bar";

const AppLogo = ({ app }: { app: App }) => {
  const AppIcon = app.icon;

  return (
    <Link href={app.path}>
      <a className="flex items-center gap-2">
        <AppIcon size={32} className="text-primary" />
        <span className="text-xl display">
          <Trans
            i18nKey={`${app.id}:logo`}
            components={[
              <span key={0} className="font-bold text-primary" />,
              <span key={1} />,
            ]}
          />
        </span>
      </a>
    </Link>
  );
};

export default AppLogo;
