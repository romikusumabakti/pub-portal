import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import Layout from "../../components/election/layout";
import Footer from "../../components/footer";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { menu } from ".";

const Page: NextPageWithLayout = () => {
  const { t, lang } = useTranslation("common");
  return (
    <>
      {/* <Head>
        <title>{t("election:title")}</title>
        <meta name="description" content="Pemilihan ketua PUB" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Layout menu={menu}>
        <h1>Halaman jadwal</h1>
        <Footer />
      </Layout>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout menu={menu}>{page}</Layout>;
};

export default Page;
