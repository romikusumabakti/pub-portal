import { ElectionVoter, Generation, Person, Student } from "@prisma/client";
import { GetStaticProps } from "next";
import Card from "../../components/card";
import ElectionLayout, { pages } from "../../components/election/layout";
import prisma from "../../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const voters = await prisma.electionVoter.findMany({
    where: {
      election: {
        is: {
          year: 2022,
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
  return { props: { voters }, revalidate: 60 };
};

const Voters = ({
  voters,
}: {
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
    <ElectionLayout page={pages.voters}>
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
