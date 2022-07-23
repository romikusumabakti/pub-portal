import { forwardRef } from "react";

const IconButton = forwardRef(
  ({ large = false, className, ...props }: any, ref) => {
    return (
      <button
        ref={ref}
        className={`flex items-center justify-center ${
          large ? "w-12 h-12" : "w-10 h-10"
        } text-2xl rounded-full hover:bg-on-surface hover:bg-opacity-10 ${className}`}
        {...props}
      />
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
