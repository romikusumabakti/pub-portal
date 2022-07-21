import useTranslation from "next-translate/useTranslation";

const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer>
      <div>{t("made-with-by")}</div>
      <div>© 2022 Pemberdayaan Umat Berkelanjutan</div>
    </footer>
  );
};

export default Footer;
