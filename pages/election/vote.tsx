import CandidateBallot from "../../components/election/candidate-ballot";
import ElectionLayout, { pages } from "../../components/election/layout";
import { ElectionBallot, ElectionCandidate } from "@prisma/client";
import prisma from "../../lib/prisma";
import { GetStaticProps } from "next";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../../components/button";

export const getStaticProps: GetStaticProps = async () => {
  const candidates = await prisma.electionCandidate.findMany({
    where: {
      election: {
        is: {
          year: 2022,
        },
      },
    },
  });
  return { props: { candidates }, revalidate: 60 };
};

function Confirm({ candidate, setCandidate, token, setBallot, setToken }: any) {
  return (
    <Transition show={candidate !== undefined} as={Fragment}>
      <Dialog onClose={() => setCandidate()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="flex flex-col w-full max-w-sm gap-2 p-4 bg-white rounded">
              <Dialog.Title className="text-xl">
                Pilih 0{candidate?.number} {candidate?.name}
              </Dialog.Title>
              <Dialog.Description>
                Apakah Anda yakin ingin memilih 0{candidate?.number}{" "}
                {candidate?.name} sebagai ketua PUB berikutnya?
              </Dialog.Description>
              <div className="flex justify-between">
                <Button
                  onClick={() => {
                    fetch("/api/election/vote", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        token,
                        candidateId: candidate.id,
                      }),
                    })
                      .then((response) => response.json())
                      .then((ballot) => {
                        setCandidate();
                        setBallot();
                        setToken();
                      });
                  }}
                >
                  Pilih
                </Button>
                <Button variant="tonal" onClick={() => setCandidate()}>
                  Batal
                </Button>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

const Candidates = ({ candidates }: { candidates: ElectionCandidate[] }) => {
  const [token, setToken] = useState<string>();
  const [ballot, setBallot] = useState<ElectionBallot>();
  const [candidate, setCandidate] = useState<ElectionCandidate>();

  return (
    <ElectionLayout page={pages.candidates}>
      {ballot ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:gap-6 md:flex-row">
            {candidates.map((candidate) => (
              <CandidateBallot
                key={candidate.id}
                candidate={candidate}
                onClick={() => {
                  setCandidate(candidate);
                }}
              />
            ))}
          </div>
          <Confirm
            candidate={candidate}
            setCandidate={setCandidate}
            token={token}
            setBallot={setBallot}
            setToken={setToken}
          />
          <Button className="self-center" onClick={() => setBallot(undefined)}>
            Batal memilih sekarang
          </Button>
        </div>
      ) : (
        <form
          className="flex flex-col max-w-md gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            fetch("/api/election/check_ballot", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token,
              }),
            })
              .then((response) => response.json())
              .then((ballot) => {
                if (ballot) {
                  if (ballot.candidateId) {
                    alert("Token sudah digunakan.");
                  } else {
                    setBallot(ballot);
                  }
                } else {
                  alert("Token tidak valid.");
                }
              });
          }}
        >
          <div>Token</div>
          <input
            className="p-3 border"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Masukkan token di sini"
            required
          />
          <Button>Lakukan pemilihan</Button>
        </form>
      )}
    </ElectionLayout>
  );
};

export default Candidates;
