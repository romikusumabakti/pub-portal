import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useState } from "react";
import { MdBook } from "react-icons/md";
import Drawer, { Page } from "../drawer";
import Header from "../header";

const Layout = ({
  children,
  title,
  menu,
}: {
  children: any;
  title: string;
  menu: Page[];
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>
          {t(title)} - {t("books:title")}
        </title>
        <meta name="description" content="Pemilihan ketua PUB" />
        <link rel="icon" href="/favicon/books.ico" />
      </Head>
      <Drawer
        open={openDrawer}
        handleOpen={() => setOpenDrawer(false)}
        path="books"
        icon={MdBook}
        buttons={menu}
      />
      <div className="flex flex-col flex-1 min-h-0">
        <Header
          handleOpenDrawer={() => setOpenDrawer((prev) => !prev)}
          path="books"
          title={title}
        />
        <main className="flex flex-col flex-1 gap-4 p-4 overflow-auto lg:bg-surface lg:rounded-tl-2xl lg:gap-6 lg:px-8 lg:py-6">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
