import React from "react";
import Head from "next/head";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { useRouter } from "next/router";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typing";
import { Tooltip } from "react-tippy";
import BottomSection from "../components/atoms/BottomSection";
interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  const { ref: myRef, inView: myelemisvisible } = useInView();
  const router = useRouter();
  return (
    <div className=" overflow-x-hidden">
      <Head>
        <title>Medium Blog</title>
        <meta
          name="description"
          content="A copy of Medium -- a blog website "
        />
        <link rel="icon" href="/images/medium.png" />
      </Head>
      <Header />
      <Hero />

      <div className="mb-28">
        <div
          ref={myRef}
          className="wrapper translate-x-[0] opacity-1 duration-500 mt-10 grid font-poppins grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6"
        >
          {posts.map((post) => (
            <Link passHref key={post._id} href={`/post/${post.slug.current}`}>
              <div
                className={`${
                  myelemisvisible
                    ? "group translate-x-[0] opacity-1 duration-500  border rounded-lg shadow-md cursor-pointer overflow-hidden"
                    : "group translate-x-[100px] opacity-0 duration-500 border rounded-lg shadow-md cursor-pointer overflow-hidden"
                }`}
              >
                <img
                  className=" w-full h-60 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                  src={urlFor(post && post.mainImage).url()!}
                  alt="image"
                />
                <div className="flex justify-between p-5  bg-white">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>
                    <p className="text-sm">
                      {post.description} by{" "}
                      <span className="font-medium uppercase">
                        {post.author.name}
                      </span>
                    </p>
                  </div>
                  <img
                    className="h-12 ml-6 rounded-full"
                    src={urlFor(post && post.author.image).url()!}
                    alt=""
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* bottom section */}
      <BottomSection />
      {/* bottom section */}
    </div>
  );
}
export async function getStaticProps() {
  const query = `
  *[_type=="post"]{
    _id,
    title,
    
    author -> {
    name,
    image
  },
  
  description,
  mainImage,
  slug
  }`;
  const posts = await sanityClient.fetch(query);
  if (!posts) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      posts,
    },
  };
}
