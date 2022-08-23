import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const ballot = await prisma.electionBallot.findFirst({
      where: {
        counted: false,
      },
    });

    if (ballot) {
      await prisma.electionBallot.update({
        where: {
          id: ballot.id,
        },
        data: {
          counted: true,
        },
      });

      if (ballot.candidateId) {
        const candidate = await prisma.electionCandidate.update({
          where: {
            id: ballot.candidateId,
          },
          data: {
            votes: { increment: ballot.strength },
          },
        });
        res.status(200).json(candidate);
      }
    }
  }
}
