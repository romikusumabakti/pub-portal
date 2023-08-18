import useTranslation from "next-translate/useTranslation";

const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer>
      <div>{t("part-of")}</div>
      <div>© 2023 Pemberdayaan Umat Berkelanjutan</div>
    </footer>
  );
};

export default Footer;
