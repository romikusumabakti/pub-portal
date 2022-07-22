import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useState } from "react";
import Drawer, { Page } from "./drawer";
import Footer from "./footer";
import Header from "./header";
import { App } from "./right-bar";

const Layout = ({
  children,
  app,
  page,
  menu,
}: {
  children: any;
  app: App;
  page: Page;
  menu: Page[];
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>
          {t(page.title)} - {t(`${app.id}:title`)}
        </title>
        <meta name="description" content="Pemilihan ketua PUB" />
        <link rel="icon" href="/favicon/election.ico" />
      </Head>
      <div className="flex h-screen bg-surface lg:bg-surface1">
        <Drawer
          open={openDrawer}
          handleOpen={() => setOpenDrawer(false)}
          app={app}
          page={page}
          buttons={menu}
        />
        <div className="flex flex-col flex-1 min-h-0">
          <Header
            handleOpenDrawer={() => setOpenDrawer((prev) => !prev)}
            appId="election"
            title={page.title}
          />
          <main className="flex flex-col flex-1 gap-4 p-4 overflow-auto lg:bg-surface lg:rounded-tl-2xl lg:gap-6 lg:px-8 lg:py-6">
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
