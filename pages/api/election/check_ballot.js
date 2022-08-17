import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const ballot = await prisma.electionBallot.findFirst({
      where: {
        token: req.body.token,
      },
    });
    res.status(200).json(ballot);
  }
}
