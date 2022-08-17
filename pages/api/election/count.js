import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const ballot = await prisma.electionBallot.update({
      where: {
        counted: false,
      },
      data: {
        counted: true,
      },
    });

    const candidate = await prisma.electionCandidate.update({
      where: {
        id: ballot.candidateId,
      },
      data: {
        votes: { increment: 1 },
      },
    });

    res.status(200).json(candidate);
  }
}
