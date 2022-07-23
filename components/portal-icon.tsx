import { useTheme } from "next-themes";
import Image from "next/image";

const PortalIcon = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Image
      src={`/images/pub-portal-animated-${resolvedTheme}.svg`}
      alt="PUB Portal icon"
      width={32}
      height={32}
    />
  );
};

export default PortalIcon;
