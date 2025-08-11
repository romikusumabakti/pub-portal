import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { title } = req.query;
    const candidates = await prisma.electionCandidate.findMany({
      where: {
        election: {
          title: title as string,
        },
      },
    });

    res.status(200).json(candidates);
  }
}
