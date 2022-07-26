import Button from "../../components/button";
import useTranslation from "next-translate/useTranslation";
import CandidatePhoto from "../../components/election/candidate-photo";
import ElectionLayout, { pages } from "../../components/election/layout";
import prisma from "../../lib/prisma";
import { Candidate } from "@prisma/client";
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

const Home = ({ candidates }: { candidates: Candidate[] }) => {
  const { t } = useTranslation("common");

  return (
    <ElectionLayout page={pages[0]}>
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
              <Countdown date={new Date(2022, 7, 17, 7)} renderer={renderer} />
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
          <Button>{t("create-account")}</Button>
        </div>
      </Card>
      <Card>
        <h1 className="text-3xl">Persyaratan menjadi pemilih</h1>
        <p>Untuk mengikuti pemilu Anda harus:</p>
        <ul>
          <li>Sedang menjadi mahasiswa PUB aktif atau pembina PUB</li>
          <li>Memiliki akun PUB Portal sebelum hari pemilihan</li>
        </ul>
      </Card>
      <Card>
        <h1 className="text-3xl">Mekanisme pemilihan</h1>
        <p>Pada hari pemilihan (Rabu, 17 Agustus 2022) Anda dipersilakan:</p>
        <ul>
          <li>Datang ke TPS (ruang B31) pada waktu yang ditentukan:</li>
          <ul>
            <li>Angkatan 16 dan 17: pukul 07.00 s.d. 08.00 WIB</li>
            <li>Angkatan 18 dan 19: pukul 08.00 s.d. 09.00 WIB</li>
            <li>Angkatan 20: pukul 09.00 s.d. 10.00 WIB</li>
          </ul>
          <li>Tunggu pemanggilan dari panitia</li>
          <li>Sambil menunggu, di halaman Beranda pilih Hasilkan token*</li>
          <li>Setelah nama Anda dipanggil, silakan menuju ke bilik suara</li>
          <li>Masukkan token* yang telah Anda dapatkan</li>
          <li>Di komputer bilik suara, klik kotak kandidat pilihan Anda</li>
          <li>Anda dapat langsung meninggalkan TPS</li>
        </ul>
        <p className="text-sm">
          *token hanya berlaku selama 1 jam dan selalu dapat dihasilkan lagi
          sampai Anda melakukan pemilihan
        </p>
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
        <h1 className="text-3xl">Hitung cepat</h1>
        <p>
          Demi menjaga kerahasiaan pada saat pemilihan, jumlah suara tidak akan
          diperbarui sampai ada setidaknya 2 suara baru untuk masing-masing
          kandidat.
        </p>
      </Card>
      <Card>
        <h1 className="text-3xl">Hasil pemilu</h1>
        <p>Hasil pemilu akan ditampilkan setelah pemilihan selesai.</p>
      </Card>
    </ElectionLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const candidates = await prisma.candidate.findMany({
    where: {
      electionId: 3,
    },
  });
  return { props: { candidates }, revalidate: 60 };
};

export default Home;
