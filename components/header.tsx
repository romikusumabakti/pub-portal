import { MouseEventHandler } from "react";
import IconButton from "./icon-button";

import useTranslation from "next-translate/useTranslation";
import RightBar from "./right-bar";
import { MdMenu } from "react-icons/md";

const Header = ({
  handleOpenDrawer,
  appId,
  title,
}: {
  handleOpenDrawer?: MouseEventHandler;
  appId: string;
  title: string;
}) => {
  const { t } = useTranslation("common");

  return (
    <header className="flex justify-between bg-surface1 lg:bg-none lg:bg-transparent text-on-surface">
      <div className="flex items-center gap-2 px-2 lg:px-0">
        <IconButton onClick={handleOpenDrawer} large className="lg:hidden">
          <MdMenu />
        </IconButton>
        <h1 className="text-xl">{t(title)}</h1>
      </div>
      {/* <input
        placeholder="Telusuri"
        className="h-10 px-4 bg-black rounded-full outline-none dark:bg-white bg-opacity-10 dark:bg-opacity-10 grow placeholder:text-gray-500"
      /> */}
      <RightBar activeAppId={appId} />
    </header>
  );
};

export default Header;
