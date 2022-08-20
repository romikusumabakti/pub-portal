import CandidateBallot from "../../components/election/candidate-ballot";
import ElectionLayout, { pages } from "../../components/election/layout";
import {
  ElectionBallot,
  ElectionCandidate,
  Person,
  Student,
} from "@prisma/client";
import prisma from "../../lib/prisma";
import { GetStaticProps } from "next";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../../components/button";
import Scrim from "../../components/scrim";

export const getStaticProps: GetStaticProps = async () => {
  const candidates = await prisma.electionCandidate.findMany({
    where: {
      election: {
        is: {
          year: 2022,
        },
      },
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
  return { props: { candidates }, revalidate: 60 };
};

function Confirm({ show, title, description, onOK, onCancel }: any) {
  return (
    <Transition show={show} as={Fragment}>
      <Dialog onClose={onCancel}>
        <Scrim />
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
            <Dialog.Panel className="flex flex-col w-full max-w-sm gap-2 p-4 bg-white rounded">
              <Dialog.Title className="text-xl">{title}</Dialog.Title>
              <Dialog.Description>{description}</Dialog.Description>
              <div className="flex justify-between">
                <Button onClick={onOK}>Pilih</Button>
                <Button variant="tonal" onClick={onCancel}>
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

const Candidates = ({
  candidates,
}: {
  candidates: (ElectionCandidate & {
    student: Student & {
      person: Person;
    };
  })[];
}) => {
  const [token, setToken] = useState<string>();
  const [ballot, setBallot] = useState<ElectionBallot>();
  const [candidate, setCandidate] = useState<
    ElectionCandidate & {
      student: Student & {
        person: Person;
      };
    }
  >();

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
            show={candidate !== undefined}
            title={`Pilih 0${candidate?.number} ${candidate?.name}`}
            description={`Apakah Anda yakin ingin memilih 0${candidate?.number} ${candidate?.student.person.name} sebagai ketua PUB berikutnya?`}
            onOK={() => {
              fetch("/api/election/vote", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token,
                  candidateId: candidate?.id,
                }),
              })
                .then((response) => response.json())
                .then(() => {
                  setCandidate(undefined);
                  setBallot(undefined);
                  setToken(undefined);
                });
            }}
            onCancel={() => {
              setCandidate(undefined);
            }}
          />
          <Button
            variant="tonal"
            className="self-center"
            onClick={() => {
              setCandidate(undefined);
              setBallot(undefined);
              setToken(undefined);
            }}
          >
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
