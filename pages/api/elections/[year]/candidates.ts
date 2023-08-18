import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { year } = req.query;
    const candidates = await prisma.electionCandidate.findMany({
      where: {
        election: {
          is: {
            year: parseInt(year as string),
          },
        },
      },
    });

    res.status(200).json(candidates);
  }
}
