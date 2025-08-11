import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title } = req.query;
    const ballot = await prisma.electionBallot.findFirst({
      where: {
        election: { title: title as string },
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

      if (ballot.number) {
        const candidate = await prisma.electionCandidate.update({
          where: {
            electionId_number: {
              electionId: ballot.electionId,
              number: ballot.number,
            },
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
