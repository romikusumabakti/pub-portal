interface VariantStyle {
  button: string;
  stateLayer: string;
}

interface Prop {
  children: any;
  className?: string;
  variant?: string;
  size: string;
}

const Button = ({ children, className, variant, size, ...rest }: Prop) => {
  const variants: Record<string, VariantStyle> = {
    filled: {
      button: "bg-primary text-on-primary",
      stateLayer: "bg-on-primary",
    },
    tonal: {
      button: "bg-secondary-container text-on-secondary-container",
      stateLayer: "bg-on-secondary-container",
    },
  };

  const sizes: Record<string, string> = {
    small: "text-xs h-8 px-4",
    medium: "text-sm h-10 px-6",
    large: "text-md h-12 px-8",
  };

  return (
    <button
      className={`group rounded-full font-medium relative ${
        variants[variant || "filled"].button
      } ${sizes[size || "medium"]} ${className}`}
      {...rest}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full rounded-full opacity-0 ${
          variants[variant || "filled"].stateLayer
        } group-hover:opacity-hover group-focus:opacity-focus`}
      ></div>
      {children}
    </button>
  );
};

export default Button;
