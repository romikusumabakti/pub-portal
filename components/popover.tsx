import { Popover as HUIPopover } from "@headlessui/react";
import { Component } from "react";
import Backdrop from "./backdrop";

class Popover extends Component {
  static Button = ({ ...props }) => {
    return <HUIPopover.Button {...props} />;
  };

  static Panel = ({ className, ...props }: any) => {
    return (
      <>
        <Backdrop />
        <HUIPopover.Panel
          className={`absolute z-20 origin-top-right top-1/2 right-1/2 md:top-auto translate-x-1/2 -translate-y-1/2 md:transform-none md:right-0 ${className}`}
          {...props}
        />
      </>
    );
  };

  render() {
    return <HUIPopover className="md:relative" {...this.props} />;
  }
}

export default Popover;
