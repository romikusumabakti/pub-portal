import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const ballot = await prisma.electionBallot.update({
      where: {
        token: req.body.token,
      },
      data: {
        candidateId: req.body.candidateId,
      },
    });
    res.status(200).json(ballot);
  }
}
