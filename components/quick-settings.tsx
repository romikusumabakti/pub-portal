import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { MdDarkMode, MdLanguage, MdLightMode } from "react-icons/md";
import IconButton from "./icon-button";
import Menu from "./menu";

const languages = [
  { locale: "id", name: "Bahasa Indonesia" },
  { locale: "en", name: "English" },
  { locale: "ar", name: "العربية" },
  { locale: "su", name: "Basa Sunda" },
  { locale: "jv", name: "Basa Jawa" },
  { locale: "min", name: "Baso Minangkabau" },
  { locale: "ms", name: "Bahasa Melayu" },
  { locale: "btk", name: "Hata Batak" },
];

const QuickSettings = ({ className }: any) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const { theme, systemTheme, setTheme } = useTheme();

  return (
    <div
      className={`flex rounded-full bg-secondary-container border-on-surface ${className}`}
    >
      <IconButton onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" || (!theme && systemTheme === "dark") ? (
          <MdLightMode className="w-6 h-6" />
        ) : (
          <MdDarkMode className="w-6 h-6" />
        )}
      </IconButton>
      <Menu>
        <Menu.Button as={IconButton}>
          <MdLanguage />
        </Menu.Button>
        <Menu.Items>
          {languages.map((language) => (
            <Menu.Item
              key={language.locale}
              onClick={() =>
                router.push({ pathname, query }, asPath, {
                  locale: language.locale,
                })
              }
            >
              {language.name}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default QuickSettings;
