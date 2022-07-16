import { useState } from "react";
import Drawer from "./drawer";
import Header from "./header";

const Layout = ({ children, menu }: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Header handleOpenDrawer={() => setOpenDrawer((prev) => !prev)} />
      <div className="flex flex-1 min-h-0">
        <Drawer
          open={openDrawer}
          handleOpen={() => setOpenDrawer(false)}
          buttons={menu}
        />
        <main className="flex flex-col flex-1 gap-6 px-8 py-6 overflow-auto">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
