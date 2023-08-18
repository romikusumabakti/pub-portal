import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const election = await prisma.election.findFirst({
      where: {
        year: 2023,
      },
    });

    const voters = await prisma.person.findMany({
      where: {
        electionVoters: {
          some: {
            electionId: election?.id,
          },
        },
      },
    });

    const ballots = voters.map(() => ({
      electionId: election!.id,
      token: Math.random().toString(16).slice(2, 10),
    }));

    await prisma.electionBallot.createMany({
      data: ballots,
      skipDuplicates: true,
    });

    res.status(200).json(ballots);
  }
}
