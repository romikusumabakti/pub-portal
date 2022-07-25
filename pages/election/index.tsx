import Button from "../../components/button";
import useTranslation from "next-translate/useTranslation";
import CandidatePhoto from "../../components/election/candidate-photo";
import ElectionLayout, { pages } from "../../components/election/layout";
import prisma from "../../lib/prisma";
import { Candidate } from "@prisma/client";
import { GetStaticProps } from "next";
import Countdown from "react-countdown";
import Card from "../../components/card";

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
        {days} hari, {hours} jam, {minutes} menit, {seconds} detik lagi
      </span>
    );
  }
};

const Home = ({ candidates }: { candidates: Candidate[] }) => {
  const { t } = useTranslation("common");

  return (
    <ElectionLayout page={pages[0]}>
      <Card>
        <h1 className="text-3xl">Pemilu PUB 2022</h1>
        <p>Waktu tersisa sampai hari pemilihan:</p>
        <p>
          <Countdown date={new Date(2022, 7, 17, 7)} renderer={renderer} />
        </p>
        <p>Rabu, 17 Agustus 2022</p>
        <div className="flex justify-between gap-4 md:justify-end">
          <Button variant="tonal">{t("more")}</Button>
          <Button>{t("create-account")}</Button>
        </div>
      </Card>
      <Card>
        <h1 className="text-3xl">Persyaratan menjadi pemilih</h1>
        <p>Untuk mengikuti pemilu Anda harus:</p>
        <ul>
          <li>Menjadi mahasiswa PUB aktif atau pembina PUB</li>
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
          <li>Anda bisa meninggalkan TPS</li>
        </ul>
        <p className="text-sm">
          *token hanya berlaku 1 jam dan selalu dapat dihasilkan lagi sampai
          Anda melakukan pemilihan
        </p>
      </Card>
      <Card>
        <h1 className="text-3xl">Kandidat</h1>
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
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate.id}>
              0{candidate.number} {candidate.name}
            </li>
          ))}
        </ul>
        <div className="flex justify-end gap-4">
          <Button variant="tonal">{t("more")}</Button>
        </div>
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
        <p>
          Demi menjaga kerahasiaan pada saat pemilihan, halaman ini diperbarui
          paling cepat 5 menit sekali.
        </p>
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
