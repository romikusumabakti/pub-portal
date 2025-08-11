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
    <div className={`relative ${className}`} title={candidate.nickname!}>
      <div className="absolute z-10 flex items-center justify-center w-1/4 font-bold rounded-full h-1/4 display bg-primary text-on-primary">
        0{candidate.number}
      </div>
      <div className="relative aspect-square">
        <Image
          src={`/images/election-candidate-photos/${candidate.electionId}/${candidate.number}.png`}
          alt={candidate.nickname!}
          fill
          className="bg-secondary-container rounded-full bg-[url('https://portal.pubpasim.org/images/pub-logo-animated-background.svg')] bg-[left_1rem_bottom_1rem] bg-no-repeat object-top object-cover bg-blend-luminosity md:bg-[left_3rem_bottom_3rem]"
          style={{ backgroundColor: `${candidate.color}33` }}
        />
      </div>
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
