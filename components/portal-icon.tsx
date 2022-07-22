import { useTheme } from "next-themes";
import Image from "next/image";

const PortalIcon = () => {
  const { theme } = useTheme();

  return (
    <Image
      src={`/images/pub-portal-animated-${theme}.svg`}
      alt="PUB Portal icon"
      width={32}
      height={32}
    />
  );
};

export default PortalIcon;
