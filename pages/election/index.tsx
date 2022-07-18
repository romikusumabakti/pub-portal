import Layout from "../../components/election/layout";
import { NextPage } from "next";
import Button from "../../components/button";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

export const candidates = [
  {
    number: 1,
    name: "Anggi Permana",
    color: "#f44336",
  },
  {
    number: 2,
    name: "Azriel Pazarudin",
    color: "#ffc107",
  },
  {
    number: 3,
    name: "Fadli Fathurrahman",
    color: "#4caf50",
  },
  // {
  //   number: 4,
  //   name: "Sawaluddin Siregar",
  //   color: "#2196f3",
  // },
];

const Home: NextPage = () => {
  const { t, lang } = useTranslation("common");

  return (
    <Layout>
      <div className="flex flex-col gap-4 p-6 md:p-8 bg-surface1 rounded-3xl">
        <h1 className="text-3xl">Pendaftaran Pemilu PUB 2022</h1>
        <p>
          Pemilihan Ketua PUB tahun 2022 insya Allah akan dilaksanakan pada
          tanggal 17 Agustus 2022. Untuk mengikutinya, Anda harus mengklaim hak
          pilih Anda dengan membuat Akun PUB Portal. Daftar sekarang juga!
        </p>
        <p className="text-sm">
          *Anda harus memiliki Akun Google yang diperlukan untuk otentikasi
          Google OAuth 2.0 nanti.
        </p>
        <div className="flex justify-between gap-4 md:justify-end">
          <Button variant="tonal">{t("more")}</Button>
          <Button>{t("create-account")}</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-8 bg-surface1 rounded-3xl">
        <h1 className="text-3xl">3 kandidat dari S1 Teknik Informatika</h1>
        <div className="flex gap-4">
          {candidates.map((candidate) => (
            <div key={candidate.number} className="relative">
              <div className="absolute z-10 flex items-center justify-center w-1/4 font-bold rounded-full h-1/4 display bg-primary text-on-primary">
                0{candidate.number}
              </div>
              <Image
                src={`/images/election-candidates/${candidate.number}.png`}
                alt={candidate.name}
                // layout="responsive"
                width={128}
                height={128}
                className={"z-0 rounded-full bg-secondary-container"}
              ></Image>
            </div>
          ))}
        </div>
        <p>
          Berbeda dengan pemilihan sebelumnya yang kandidatnya berbeda fakultas,
          Pemilu kali ini semua kandidatnya berasal dari fakultas, program
          studi, serta jenjang yang sama, yaitu S1 Teknik Informatika.
        </p>
        <ul>
          <li>01 Anggi Permana</li>
          <li>02 Muhammad Fadli Fathurrahman</li>
          <li>03 Sawaluddin Siregar</li>
        </ul>
        <div className="flex justify-end gap-4">
          <Button variant="tonal">{t("more")}</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-8 bg-surface1 rounded-3xl">
        <h1 className="text-3xl">Ingin mencoba pemilihan sekarang?</h1>
        <p>
          Kami menyediakan simulasi pemilihan sebelum pemilihan yang sebenarnya
          nanti dilaksanakan. Anda dapat mencobanya agar tahu bagaimana cara
          memilih nanti.
        </p>
        <div className="flex justify-end gap-4">
          <Button>{t("election:try-simulation")}</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
