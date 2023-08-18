import { HTMLAttributes } from "react";

const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`flex flex-col gap-4 p-6 md:p-8 bg-surface1 rounded-3xl ${className}`}
      {...props}
    />
  );
};

export default Card;
