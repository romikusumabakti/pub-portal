import Button from "../../../components/button";
import useTranslation from "next-translate/useTranslation";
import CandidatePhoto from "../../../components/elections/candidate-photo";
import ElectionLayout, { pages } from "../../../components/elections/layout";
import prisma from "../../../lib/prisma";
import { Election, ElectionCandidate, Person, Student } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Countdown from "react-countdown";
import Card from "../../../components/card";
import Link from "next/link";
import Trans from "next-translate/Trans";
import { MdHowToVote } from "react-icons/md";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import Candidates from "./vote";

export const getStaticPaths: GetStaticPaths = async () => {
  const elections = await prisma.election.findMany();
  const paths = elections.map((election) => ({
    params: {
      year: election.year.toString(),
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export interface IParams extends ParsedUrlQuery {
  year: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { year } = context.params as IParams;
  const election = await prisma.election.findUnique({
    where: { year: parseInt(year) },
  });
  const candidates = await prisma.electionCandidate.findMany({
    where: {
      electionId: election!.id,
    },
    include: {
      student: {
        include: {
          person: true,
        },
      },
    },
    orderBy: {
      number: "asc",
    },
  });
  return {
    props: {
      election: { ...election, date: election?.date.getTime() },
      candidates,
    },
    revalidate: 60,
  };
};

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  if (completed) {
    return <p>Pemilihan telah dimulai.</p>;
  } else {
    return (
      <span className="text-xl">
        {days} hari, {hours} jam, {minutes} menit, {seconds} detik
      </span>
    );
  }
};

const Home = ({
  election,
  candidates,
}: {
  election: Election;
  candidates: (ElectionCandidate & {
    student: Student & {
      person: Person;
    };
  })[];
}) => {
  const { t } = useTranslation("common");
  const electionDate = new Date(election.date);
  const formattedElectionDate = electionDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const [code, setCode] = useState("");
  const [tps, setTps] = useState<string>();

  useEffect(() => {
    setTps(localStorage.getItem("tps") || undefined);
  }, []);

  return (
    <ElectionLayout year={election.year} page={pages.home}>
      {tps ? (
        <Candidates
          candidates={candidates}
          onClose={() => {
            localStorage.removeItem("tps");
            setTps(undefined);
          }}
        />
      ) : (
        <>
          <Card>
            <form
              className="flex gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (code === "kpupub") {
                  const tps = "B31";
                  localStorage.setItem("tps", tps);
                  setTps(tps);
                } else {
                  alert("Kode TPS tidak valid.");
                }
              }}
            >
              <input
                type="password"
                className="p-3 border"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Masukkan kode TPS di sini"
                required
                autoFocus
              />
              <Button>Verifikasi komputer</Button>
            </form>
          </Card>
          <Card>
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <MdHowToVote size={48} className="text-primary" />
                  <h1 className="text-3xl display">
                    <Trans
                      i18nKey="elections:logo"
                      components={[
                        <span key={0} className="font-bold text-primary" />,
                        <span key={1} />,
                      ]}
                    />{" "}
                    <span>{election.year}</span>
                  </h1>
                </div>
                <p>Waktu tersisa sampai hari pemilihan:</p>
                <p>
                  <Countdown date={electionDate} renderer={renderer} />
                </p>
                <p className="font-bold">{formattedElectionDate}</p>
              </div>
              <div className="flex gap-4">
                {candidates.map((candidate) => (
                  <CandidatePhoto
                    key={candidate.id}
                    candidate={candidate}
                    className="text-xs md:text-sm"
                    size={128}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between gap-4 md:justify-end">
              <Link href={`/elections/${election.year}/candidates`}>
                <Button variant="tonal">{t("more")}</Button>
              </Link>
              <Button>{t("elections:try-simulation")}</Button>
            </div>
          </Card>
          <Card>
            <h1 className="text-3xl">Persyaratan menjadi pemilih</h1>
            <p>Untuk mengikuti pemilu Anda harus:</p>
            <ul>
              <li>Sedang menjadi mahasiswa PUB aktif atau pembina PUB</li>
            </ul>
          </Card>
          <Card>
            <h1 className="text-3xl">Mekanisme pemilihan</h1>
            <p>
              Pada hari pemilihan ({formattedElectionDate}) Anda dipersilakan:
            </p>
            <ul>
              <li>
                Datang ke TPS yang telah ditentukan sesuai dengan asramanya
                masing-masing:
              </li>
              <ul>
                <li>Aswan: 3B</li>
                <li>Astra: B31</li>
                <li>Asbar: 2E</li>
                <li>Asri: 2D</li>
              </ul>
              <li>Tunggu pemanggilan dari panitia</li>
              <li>
                Setelah nama Anda dipanggil, silakan ambil 1 surat suara digital
              </li>
              <li>Kemudian menuju ke bilik suara untuk melakukan pemilihan</li>
              <li>
                Di komputer bilik suara, masukkan token yang ada pada surat
                suara digital Anda (8 digit)
              </li>
              <li>Klik kotak kandidat pilihan Anda</li>
              <li>Anda dapat langsung meninggalkan TPS</li>
            </ul>
          </Card>
          <Card>
            <h1 className="text-3xl">Ingin mencoba pemilihan sekarang?</h1>
            <p>
              Kami menyediakan simulasi pemilihan sebelum pemilihan yang
              sebenarnya nanti dilaksanakan. Anda dapat mencobanya agar tahu
              bagaimana cara memilih nanti.
            </p>
            <div className="flex justify-end gap-4">
              <Button>{t("elections:try-simulation")}</Button>
            </div>
          </Card>
          <Card>
            <h1 className="text-3xl">Hasil pemilu</h1>
            <p>Hasil pemilu akan ditampilkan setelah pemilihan selesai.</p>
          </Card>
        </>
      )}
    </ElectionLayout>
  );
};

export default Home;
