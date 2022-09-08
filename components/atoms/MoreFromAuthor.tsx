import React from "react";
import { RiMailAddLine } from "react-icons/ri";
import { Post } from "../../typing";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import SyntaxHighlighter from "react-syntax-highlighter";

import { urlFor } from "../../sanity";

interface Props {
  post: Post;
  posts: Post[];
  followed: boolean;
  Clickedfollow: any;
  ClickedMail: any;
}

const MoreFromAuthor = ({
  post,
  posts,
  Clickedfollow,
  followed,
  ClickedMail,
}: Props) => {
  const CodeRenderer = ({ node }: any) => {
    if (!node.code) {
      return null;
    }
    return (
      <SyntaxHighlighter
        className="my-12 lowercase"
        language={node.language || "text"}
      >
        {node.code}
      </SyntaxHighlighter>
    );
  };
  return (
    <div className="">
      <div className="py-12">
        <div className="flex items-center justify-between">
          <h1 className="capitalize text-xl font-medium">
            more from {post.author.name}
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={Clickedfollow}
              className={`${
                followed
                  ? "border-[1px] rounded-full border-blue-500 hover:border-blue-800 duration-500  px-6 py-2 text-gray-900"
                  : "bg-blue-500 rounded-full hover:bg-blue-800 duration-500  px-4 py-2 text-white"
              }`}
            >
              {followed ? "Following" : "Follow"}
            </button>
            <div
              onClick={ClickedMail}
              className="h-[37px] w-[37px] cursor-pointer flex justify-center items-center  rounded-full bg-blue-500 hover:bg-blue-800 duration-500"
            >
              <RiMailAddLine className="text-white text-xl" />
            </div>
          </div>
        </div>
        <div className="py-4 pr-0 mb-8 text-sm sm:pr-44">
          {" "}
          <BlockContent
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            blocks={post.author.bio}
          />
        </div>
      </div>

      <div className="w-full">
        <div className="border-b-[1px] border-gray-200 my-10 " />
        {posts
          .filter((val) => {
            if (
              val.author.name
                .toLowerCase()
                .includes(post.author.name.toLowerCase())
            ) {
              return val;
            } else {
              return val;
            }
          })
          .slice(0, 10)
          ?.map((post) => (
            <div key={post._id}>
              <Link passHref key={post._id} href={`/post/${post.slug.current}`}>
                <div className="flex  space-y-4 justify-between items-center">
                  <div className="space-y-2 flex flex-col  cursor-pointer">
                    <div>
                      <p className="text-sm text-gray-500">
                        {new Date(post._createdAt).toDateString()}
                      </p>
                      <p className="sm:text-[21px] text-[18px]  font-semibold ">
                        {post.title}
                      </p>
                    </div>
                    <div className="sm:line-clamp-3 line-clamp-2 text-[13px] sm:text-[15px] text-gray-900">
                      {" "}
                      <BlockContent
                        blocks={post.body.slice(0, 2)}
                        className="capitalize text-[16px]"
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                        content={post.body.slice(0, 2) || []}
                        serializers={{
                          types: {
                            code: CodeRenderer,
                          },
                        }}
                      />
                    </div>
                  </div>
                  <img
                    className="object-cover cursor-pointer w-24 h-24 sm:w-36 ml-10 sm:h-36"
                    src={urlFor(post.mainImage).url()!}
                    alt="image"
                  />
                </div>
              </Link>
              <div className="border-b-[1px] border-gray-200 my-10 " />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MoreFromAuthor;
