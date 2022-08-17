import Button from "../../components/button";
import useTranslation from "next-translate/useTranslation";
import CandidatePhoto from "../../components/election/candidate-photo";
import ElectionLayout, { pages } from "../../components/election/layout";
import prisma from "../../lib/prisma";
import { ElectionCandidate } from "@prisma/client";
import { GetStaticProps } from "next";
import Countdown from "react-countdown";
import Card from "../../components/card";
import Link from "next/link";
import Trans from "next-translate/Trans";
import { MdHowToVote } from "react-icons/md";

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

const Home = ({ candidates }: { candidates: ElectionCandidate[] }) => {
  const { t } = useTranslation("common");

  return (
    <ElectionLayout page={pages.home}>
      <Card>
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <MdHowToVote size={48} className="text-primary" />
              <h1 className="text-3xl display">
                <Trans
                  i18nKey="election:logo"
                  components={[
                    <span key={0} className="font-bold text-primary" />,
                    <span key={1} />,
                  ]}
                />{" "}
                <span>2022</span>
              </h1>
            </div>
            <p>Waktu tersisa sampai hari pemilihan:</p>
            <p>
              <Countdown date={new Date(2022, 7, 17, 13)} renderer={renderer} />
            </p>
            <p className="font-bold">Rabu, 17 Agustus 2022</p>
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
          <Link href="/election/candidates">
            <Button variant="tonal">{t("more")}</Button>
          </Link>
          <Button>{t("election:try-simulation")}</Button>
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
        <p>Pada hari pemilihan (Rabu, 17 Agustus 2022) Anda dipersilakan:</p>
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
            Di komputer bilik suara, masukkan token yang ada pada surat suara
            digital Anda (8 digit)
          </li>
          <li>Klik kotak kandidat pilihan Anda</li>
          <li>Anda dapat langsung meninggalkan TPS</li>
        </ul>
      </Card>
      <Card>
        <h1 className="text-3xl">Ingin mencoba pemilihan sekarang?</h1>
        <p>
          Kami menyediakan simulasi pemilihan sebelum pemilihan yang sebenarnya
          nanti dilaksanakan. Anda dapat mencobanya agar tahu bagaimana cara
          memilih nanti.
        </p>
        <div className="flex justify-end gap-4">
          <Button>{t("election:try-simulation")}</Button>
        </div>
      </Card>
      <Card>
        <h1 className="text-3xl">Hasil pemilu</h1>
        <p>Hasil pemilu akan ditampilkan setelah pemilihan selesai.</p>
      </Card>
    </ElectionLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const candidates = await prisma.electionCandidate.findMany({
    where: {
      electionId: 3,
    },
  });
  return { props: { candidates }, revalidate: 60 };
};

export default Home;
