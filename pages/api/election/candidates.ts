import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const candidates = await prisma.electionCandidate.findMany({
      where: {
        election: {
          is: {
            year: 2022,
          },
        },
      },
    });

    res.status(200).json(candidates);
  }
}
