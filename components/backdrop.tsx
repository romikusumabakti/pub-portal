import { Transition } from "@headlessui/react";
import { Fragment } from "react";

const Backdrop = () => {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 z-20 bg-black/50" />
    </Transition.Child>
  );
};

export default Backdrop;
