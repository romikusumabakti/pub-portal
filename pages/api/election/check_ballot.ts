import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" && req.body.token) {
    const ballot = await prisma.electionBallot.findFirst({
      where: {
        token: req.body.token,
      },
    });
    res.status(200).json(ballot);
  }
}
