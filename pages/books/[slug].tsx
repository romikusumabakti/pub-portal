import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import Head from "next/head";
import markdownToHtml from "../../lib/markdown";
import Layout from "../../components/books/layout";
import markdownStyles from "../../styles/markdown.module.css";

type Author = {
  name: string;
  picture: string;
};

export type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
};

export default function Post({
  post,
  posts,
}: {
  post: PostType;
  posts: PostType[];
  preview?: boolean;
}) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout title="common:home" menu={posts}>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>{post.slug} | PUB Docs</title>
            </Head>
            <h1>{post.title}</h1>
            <h2>{post.author?.name}</h2>
            <div>{post.date}</div>
            <div
              className={markdownStyles["markdown"]}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </>
      )}
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
      posts: getAllPosts(["title", "slug"]).map((post) => {
        return {
          title: post.slug,
          path: `/${post.slug}`,
        };
      }),
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
