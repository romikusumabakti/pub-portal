import { ElectionCandidate } from "@prisma/client";
import Image from "next/image";
import MaterialThemed from "../material-themed";

const CandidatePhoto = ({
  candidate,
  className,
  size = 256,
  themed = true,
}: {
  candidate: ElectionCandidate;
  className?: string;
  size?: number;
  themed?: boolean;
}) => {
  const Component = () => (
    <div className={`relative ${className}`} title={candidate.name!}>
      <div className="absolute z-10 flex items-center justify-center w-1/4 font-bold rounded-full h-1/4 display bg-primary text-on-primary">
        0{candidate.number}
      </div>
      <Image
        src={`/images/election-candidate-photos/${candidate.electionId}/${candidate.number}.png`}
        alt={candidate.name!}
        // layout="responsive"
        width={size}
        height={size}
        className="rounded-full bg-secondary-container bg-[left_1rem_bottom_1rem] md:bg-[left_3rem_bottom_3rem] bg-no-repeat bg-[url('/images/pub-logo-animated-background.svg')] bg-blend-luminosity"
      ></Image>
    </div>
  );

  return themed ? (
    <MaterialThemed color={candidate.color}>
      <Component />
    </MaterialThemed>
  ) : (
    <Component />
  );
};

export default CandidatePhoto;
