const Card = ({ ...props }) => {
  return (
    <div
      className="flex flex-col gap-4 p-6 md:p-8 bg-surface1 rounded-3xl"
      {...props}
    />
  );
};

export default Card;
