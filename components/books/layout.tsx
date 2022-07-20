import { useState } from "react";
import { MdBook } from "react-icons/md";
import Drawer from "../drawer";
import Header from "../header";

const Layout = ({ children, menu }: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Header
        handleOpenDrawer={() => setOpenDrawer((prev) => !prev)}
        path="books"
        icon={MdBook}
      />
      <div className="flex flex-1 min-h-0">
        <Drawer
          open={openDrawer}
          handleOpen={() => setOpenDrawer(false)}
          path="books"
          buttons={menu}
        />
        <main className="flex flex-col flex-1 gap-4 p-4 overflow-auto md:gap-6 md:px-8 md:py-6">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
