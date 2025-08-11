import { GetStaticProps } from "next";
import prisma from "../../lib/prisma";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const CircularProgress = dynamic(
  () => import("@w3h/react-material").then((mod) => mod.CircularProgress),
  { ssr: false }
);

export const getStaticProps: GetStaticProps = async () => {
  const election = await prisma.election.findFirst({
    select: { title: true },
    where: {
      candidates: { some: {} },
    },
    orderBy: { date: "desc" },
  });
  if (election) {
    return {
      props: {
        title: election.title,
      },
      revalidate: 60,
    };
  } else {
    return { notFound: true };
  }
};

export default function Index({ title }: { title: string }) {
  const router = useRouter();

  useEffect(() => {
    router.push(`/elections/${title}`);
  }, [router, title]);

  return <CircularProgress />;
}
