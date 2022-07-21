import { Menu as HUIMenu, Transition } from "@headlessui/react";
import { Component } from "react";
import Backdrop from "./backdrop";
import MenuTransition from "./menu-transition";

class Menu extends Component {
  static Button = ({ ...props }) => {
    return <HUIMenu.Button {...props} />;
  };

  static Items = ({ ...props }) => {
    return (
      <Transition>
        <Backdrop />
        <MenuTransition>
          <HUIMenu.Items
            as="div"
            className="absolute top-0 right-0 flex flex-col w-48 origin-top-right rounded md:top-auto bg-surface1"
            {...props}
          />
        </MenuTransition>
      </Transition>
    );
  };

  static Item = ({ ...props }) => {
    return (
      <HUIMenu.Item>
        {({ active }) => (
          <button
            className={`px-4 h-12 text-sm text-left first:rounded-t last:rounded-b ${
              active && "bg-on-surface bg-opacity-5"
            }`}
            {...props}
          />
        )}
      </HUIMenu.Item>
    );
  };

  render() {
    return <HUIMenu as="div" className="z-20 md:relative" {...this.props} />;
  }
}

export default Menu;
