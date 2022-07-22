import { Popover as HUIPopover } from "@headlessui/react";
import { Component } from "react";
import Scrim from "./scrim";
import MenuTransition from "./menu-transition";

class Popover extends Component {
  static Button = ({ ...props }) => {
    return <HUIPopover.Button {...props} />;
  };

  static Panel = ({ className, ...props }: any) => {
    return (
      <>
        <Scrim />
        <MenuTransition>
          <HUIPopover.Panel
            className={`absolute z-20 origin-top-right top-1/2 right-1/2 md:top-auto translate-x-1/2 -translate-y-1/2 md:transform-none md:right-0 ${className}`}
            {...props}
          />
        </MenuTransition>
      </>
    );
  };

  render() {
    return <HUIPopover className="md:relative" {...this.props} />;
  }
}

export default Popover;
