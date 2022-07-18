import { getDocBySlug, getAllDocs } from "../../lib/api";
import Head from "next/head";
import markdownToHtml from "../../lib/markdown";
import Layout from "../../components/docs/layout";

type DocType = {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
};

type Props = {
  doc: DocType;
};

export const menu = [
  { title: "Materi 1", path: "/materi-1" },
  { title: "Materi 2", path: "/materi-2" },
  { title: "Materi 3", path: "/materi-3" },
];

export default function Doc({ doc }: Props) {
  return (
    <Layout menu={menu}>
      <article className="mb-32">
        <Head>
          <title>{doc.title} | Next.js Blog Example with</title>
        </Head>
        <h1>{doc.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: doc.content }}></div>
      </article>
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getServerSideProps({ params }: Params) {
  const doc = getDocBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
  ]);
  const content = await markdownToHtml(doc.content || "");

  return {
    props: {
      doc: {
        ...doc,
        content,
      },
    },
  };
}

// export async function getStaticPaths() {
//   const docs = getAllDocs(["slug"]);

//   return {
//     paths: docs.map((doc) => {
//       return {
//         params: {
//           slug: doc.slug,
//         },
//       };
//     }),
//     fallback: false,
//   };
// }
