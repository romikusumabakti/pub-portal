import Trans from "next-translate/Trans";
import { MdHowToVote } from "react-icons/md";
import CandidateCard from "./candidate-card";
import { ElectionCandidate } from "@prisma/client";

export default function Ballot({
  title,
  candidates,
  token,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  candidates: ElectionCandidate[];
  token: string;
}) {
  return (
    <div
      className={`flex flex-col items-center select-none justify-center gap-4 p-4 h-[14cm] ${className}`}
      {...props}
    >
      <div className="flex flex-col grow justify-center items-center gap-8">
        <div className="flex items-center gap-2">
          <MdHowToVote size={48} className="text-primary" />
          <h1 className="text-2xl display">
            <Trans
              i18nKey="elections:logo"
              components={[
                <span key={0} className="font-bold text-primary" />,
                <span key={1} />,
              ]}
            />{" "}
            <span>{title}</span>
          </h1>
        </div>
        <div className="flex gap-4">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.number}
              candidate={candidate}
              print={true}
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-1">
          Token:
          <div className="font-mono text-2xl border px-2 py-1">{token}</div>
        </div>
      </div>
      <div className="text-xs mt-auto flex flex-col gap-2">
        <p>
          *Setelah selesai melakukan pemungutan suara, Anda dapat menyimpan
          surat suara ini di tempat yang aman
        </p>
        <p>
          *Jangan memberitahu token ini kepada siapa pun, jangan membuang surat
          suara ini kecuali dihancurkan terlebih dahulu
        </p>
        <p>
          *Token digunakan sebagai tanda terima untuk memverifikasi bahwa suara
          Anda dihitung
        </p>
      </div>
    </div>
  );
}
