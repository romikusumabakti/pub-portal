const IconButton = ({ children, large, onClick, className }: any) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center ${
        large ? "w-12 h-12" : "w-10 h-10"
      } text-2xl rounded-full ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
