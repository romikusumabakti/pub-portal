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
            className="absolute right-0 z-10 flex flex-col w-48 origin-top-right rounded bg-surface1"
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
    return <HUIMenu as="div" className="relative z-10" {...this.props} />;
  }
}

export default Menu;
