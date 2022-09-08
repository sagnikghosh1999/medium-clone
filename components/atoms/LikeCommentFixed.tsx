import React from "react";
import { Tooltip } from "react-tippy";
import { Post } from "../../typing";
import { Like, Comment } from "./icons.js";

interface Props {
  myelemisvisible: boolean;
  likefield: number;
  setcommentside?: any;
  post: Post;
}

const LikeCommentFixed = ({
  myelemisvisible,
  likefield,
  setcommentside,
  post,
}: Props) => {
  return (
    <>
      <div
        className={`${
          myelemisvisible
            ? "fixed hidden bottom-20 md:bottom-10 -translate-x-1/2 left-1/2 xl:left-[43%]"
            : "fixed bottom-20 md:bottom-10 -translate-x-1/2 left-1/2 xl:left-[43%]"
        }`}
      >
        <div className="  bg-white px-6 py-2 rounded-full shadow-xl">
          <div className="flex  space-x-8  items-center">
            {" "}
            <div className="flex space-x-2 ">
              <Tooltip
                // options

                title="Likes"
                position="top"
                trigger="mouseenter"
                arrow={true}
                delay={300}
                hideDelay={0}
                distance={20}
              >
                <div className="flex  items-center space-x-2 cursor-pointer">
                  <Like />

                  <span className="text-sm  text-gray-500">{likefield}</span>
                </div>
              </Tooltip>
            </div>
            <div className="flex space-x-2">
              <Tooltip
                // options
                title="Respond"
                position="top"
                trigger="mouseenter"
                arrow={true}
                delay={300}
                hideDelay={0}
                distance={20}
              >
                <div
                  onClick={() => setcommentside(true)}
                  className="flex space-x-2 items-center cursor-pointer"
                >
                  <Comment />
                  <span className="text-sm text-gray-500">
                    {post.comments.length}
                  </span>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LikeCommentFixed;
