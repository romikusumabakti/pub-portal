import { ElectionVoter, Batch, Person, Student } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Card from "../../../components/card";
import ElectionLayout, { pages } from "../../../components/elections/layout";
import prisma from "../../../lib/prisma";
import { IParams } from ".";

export const getStaticPaths: GetStaticPaths = async () => {
  const elections = await prisma.election.findMany();
  const paths = elections.map((election) => ({
    params: {
      title: election.title,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { title } = context.params as IParams;
  const voters = await prisma.electionVoter.findMany({
    where: {
      election: {
        is: {
          title,
        },
      },
    },
    include: {
      person: {
        include: {
          student: {
            include: {
              batch: true,
            },
          },
        },
      },
    },
    orderBy: { personId: "asc" },
  });
  return { props: { title, voters }, revalidate: 60 };
};

const Voters = ({
  title,
  voters,
}: {
  title: string;
  voters: (ElectionVoter & {
    person: Person & {
      student:
        | (Student & {
            batch: Batch;
          })
        | null;
    };
  })[];
}) => {
  return (
    <ElectionLayout title={title} page={pages.voters}>
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
              <tr key={voter.personId}>
                <td>{voter.person.name}</td>
                <td>
                  {voter.person.student &&
                    `${voter.person.student.batch.number} (${voter.person.student.batch.name})`}
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
