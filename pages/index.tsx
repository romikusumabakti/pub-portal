import type { NextPage } from "next";
import AppLogo from "../components/app-logo";
import Footer from "../components/footer";
import RightBar, { apps } from "../components/right-bar";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <header className="flex justify-between">
        <AppLogo app={apps.portal} />
        <RightBar activeAppId={apps.portal.id} />
      </header>
      <Footer />
    </div>
  );
};

export default Home;
