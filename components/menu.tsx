import { Menu as HUIMenu, Transition } from "@headlessui/react";
import { Component } from "react";
import Backdrop from "./backdrop";

class Menu extends Component {
  static Button = ({ ...props }) => {
    return <HUIMenu.Button {...props} />;
  };

  static Items = ({ className, ...props }: any) => {
    return (
      <Transition>
        <Backdrop />
        <HUIMenu.Items
          as="div"
          className={`absolute z-20 origin-top-right top-1/2 right-1/2 md:top-auto translate-x-1/2 -translate-y-1/2 md:transform-none md:right-0 w-48 rounded bg-surface1 flex flex-col ${className}`}
          {...props}
        />
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
    return <HUIMenu as="div" className="md:relative" {...this.props} />;
  }
}

export default Menu;
