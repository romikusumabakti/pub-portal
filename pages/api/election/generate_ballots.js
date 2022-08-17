import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const voters = await prisma.person.findMany({
      where: {
        student: {
          is: {
            generation: {
              number: 18,
            },
          },
        },
      },
    });

    const election = await prisma.election.findFirst({
      where: {
        year: 2022,
      },
    });

    const ballots = voters.map(() => ({
      electionId: election.id,
      token: Math.random().toString(16).slice(2, 10),
    }));

    await prisma.electionBallot.createMany({
      data: ballots,
      skipDuplicates: true,
    });

    res.status(200).json(ballots);
  }
}
