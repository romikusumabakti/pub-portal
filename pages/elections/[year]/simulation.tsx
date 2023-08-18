import CandidateBallot from "../../../components/elections/candidate-ballot";
import ElectionLayout, { pages } from "../../../components/elections/layout";
import {
  ElectionBallot,
  ElectionCandidate,
  Person,
  Student,
} from "@prisma/client";
import prisma from "../../../lib/prisma";
import { GetStaticPaths, GetStaticProps } from "next";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../../../components/button";
import Scrim from "../../../components/scrim";
import { IParams } from ".";
import MaterialThemed from "../../../components/material-themed";
import Card from "../../../components/card";

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

export const getStaticProps: GetStaticProps = async (context) => {
  const { year } = context.params as IParams;
  const candidates = await prisma.electionCandidate.findMany({
    where: {
      election: {
        is: {
          year: parseInt(year),
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
  return { props: { year: parseInt(year), candidates }, revalidate: 60 };
};

function Confirm({ color, show, title, description, onOK, onCancel }: any) {
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
            <Dialog.Panel className="w-full max-w-sm gap-2 bg-white rounded">
              <MaterialThemed color={color}>
                <div className="flex flex-col gap-2 p-4">
                  <Dialog.Title className="text-xl">{title}</Dialog.Title>
                  <Dialog.Description>{description}</Dialog.Description>
                  <div className="flex justify-between">
                    <Button onClick={onOK}>Pilih</Button>
                    <Button variant="tonal" onClick={onCancel}>
                      Batal
                    </Button>
                  </div>
                </div>
              </MaterialThemed>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

const Candidates = ({
  year,
  candidates,
}: {
  year: number;
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
    <ElectionLayout year={year} page={pages.simulation}>
      {ballot ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:gap-6 md:flex-row justify-center">
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
            color={candidate?.color}
            show={candidate !== undefined}
            title={`Pilih 0${candidate?.number} ${candidate?.name}`}
            description={`Apakah Anda yakin ingin memilih 0${candidate?.number} ${candidate?.student.person.name} sebagai ketua PUB berikutnya?`}
            onOK={() => {
              setCandidate(undefined);
              setBallot(undefined);
              setToken(undefined);
              alert("Berhasil. Terima kasih. Amankan surat suara Anda!");
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
        <Card className="m-auto">
          <form
            className="flex flex-col max-w-md gap-4 m-auto"
            onSubmit={(e) => {
              e.preventDefault();
              if (token === "abcd1234") {
                setBallot({
                  id: 1,
                  electionId: 4,
                  token: "abcd1234",
                  strength: 1,
                  candidateId: null,
                  counted: true,
                });
              } else {
                alert("Token tidak valid.");
              }
            }}
          >
            <div>Token (abcd1234)</div>
            <input
              className="p-3 border"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Masukkan token di sini"
              required
              autoFocus
            />
            <Button>Lakukan pemilihan (simulasi)</Button>
          </form>
        </Card>
      )}
    </ElectionLayout>
  );
};

export default Candidates;
