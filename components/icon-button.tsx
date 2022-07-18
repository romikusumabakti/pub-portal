const IconButton = ({ large = false, className, ...rest }: any) => {
  return (
    <button
      className={`flex items-center justify-center ${
        large ? "w-12 h-12" : "w-10 h-10"
      } text-2xl rounded-full hover:bg-on-surface hover:bg-opacity-10 ${className}`}
      {...rest}
    />
  );
};

export default IconButton;
