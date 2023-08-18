import { ElectionVoter, Generation, Person, Student } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Card from "../../../components/card";
import ElectionLayout, { pages } from "../../../components/elections/layout";
import prisma from "../../../lib/prisma";
import { IParams } from ".";

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
  const voters = await prisma.electionVoter.findMany({
    where: {
      election: {
        is: {
          year: parseInt(year),
        },
      },
    },
    include: {
      person: {
        include: {
          student: {
            include: {
              generation: true,
            },
          },
        },
      },
    },
  });
  return { props: { year: parseInt(year), voters }, revalidate: 60 };
};

const Voters = ({
  year,
  voters,
}: {
  year: number;
  voters: (ElectionVoter & {
    person: Person & {
      student:
        | (Student & {
            generation: Generation;
          })
        | null;
    };
  })[];
}) => {
  return (
    <ElectionLayout year={year} page={pages.voters}>
      <Card>
        <h1 className="text-3xl display">Daftar pemilih tetap</h1>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Angkatan</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter) => (
              <tr key={voter.id}>
                <td>{voter.person.name}</td>
                <td>
                  {voter.person.student &&
                    `${voter.person.student.generation.number} (${voter.person.student.generation.name})`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </ElectionLayout>
  );
};

export default Voters;
