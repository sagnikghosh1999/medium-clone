import React, { useState } from "react";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { VscClose } from "react-icons/vsc";
import { Tooltip } from "react-tippy";
import { Post } from "../../typing";
import { Like, CommentSent } from "./icons";

interface Props {
  commentside: boolean;
  setcommentside: any;
  post: Post;
  user: any;
  likefield: number;
  commentfield: any;
  setCommentfield: any;
  sentpopup: any;
  handleSubmitform: any;
  ClickedComment: any;
  issending: boolean;
  response: boolean;
}

const SideComment = ({
  commentside,
  setcommentside,
  post,
  user,
  likefield,
  commentfield,
  setCommentfield,
  sentpopup,
  handleSubmitform,
  response,
  ClickedComment,
  issending,
}: Props) => {
  //   const [submited, setsubmited] = useState(false);
  //   const [issending, setissending] = useState(false);

  function InpClicked1(e: any) {
    const { name, value } = e.target;

    setCommentfield((prevdata) => {
      return { ...prevdata, [name]: value };
    });
  }

  return (
    <div className="">
      {commentside && (
        <div
          onClick={() => setcommentside(false)}
          className="fixed cursor-pointer z-40 inset-0 bg-gray-600/20"
        ></div>
      )}
      <div
        className={`${
          commentside
            ? "bg-white overflow-x-hidden z-[100]  overflow-y-scroll translate-x-[0%] duration-500 drop-shadow-[0_35px_135px_rgba(0,0,0,0.5)] px-6 pt-6 h-full fixed w-[90%] md:w-[60%] lg:w-[45%] xl:w-[25%]  right-0 bottom-0"
            : "bg-white  translate-x-[300%] duration-500 drop-shadow-[0_35px_135px_rgba(0,0,0,0.5)] px-6 pt-6 h-full fixed w-[25%]  right-0 bottom-0"
        }`}
      >
        <div className="flex  items-center justify-between">
          <h1 className="text-gray-900 font-bold text-xl">
            Responses ({post.comments.length})
          </h1>
          <div className="flex  space-x-4 items-center">
            <Tooltip
              // options
              title="View Community Guidelines"
              position="bottom"
              trigger="mouseenter"
              arrow={true}
              delay={300}
              hideDelay={0}
              distance={20}
            >
              <div className="flex space-x-2 cursor-pointer">
                <MdOutlinePrivacyTip className="text-xl text-gray-700 hover:text-gray-900 duration-500 cursor-pointer " />
              </div>
            </Tooltip>

            <VscClose
              onClick={() => setcommentside(false)}
              className="text-2xl text-gray-700 hover:text-gray-900 duration-500 cursor-pointer"
            />
          </div>{" "}
        </div>

        {sentpopup ? (
          <div className=" flex flex-col py-8 px-2  text-center justify-center items-center drop-shadow-xl  my-10   duration-500 ease-in-out rounded-md bg-white">
            <CommentSent />

            <h1 className="text-xl text-blue-600 ">
              Your comment has been sent!
            </h1>
            <h2 className="text-sm">
              once its gets approved it will display below!
            </h2>
          </div>
        ) : (
          <form
            onSubmit={handleSubmitform}
            className={`${
              sentpopup
                ? "my-10 drop-shadow-xl p-4 translate-x-[140%] duration-500 ease-in-out  rounded-md bg-white"
                : "my-10 drop-shadow-xl p-4 translate-x-[0%] duration-500 ease-in-out  rounded-md bg-white"
            }`}
          >
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-4">
                  {user.photoURL ? (
                    <img
                      className="h-8 w-8  object-cover rounded-full"
                      src={user && user.photoURL}
                      alt=""
                    />
                  ) : (
                    <div className="bg-blue-600  cursor-pointer flex justify-center items-center rounded-full h-10 w-10">
                      <span className="text-white uppercase">
                        {user.displayName?.slice(0, 2)}
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-gray-900 capitalize">
                    {user && user.displayName}
                  </p>
                </div>
              )}
            </div>

            <textarea
              onChange={InpClicked1}
              onClick={ClickedComment}
              maxLength={user ? 5000 : 0}
              value={commentfield.comment}
              name="comment"
              id="comment"
              className="my-6 text-sm w-full outline-none"
              autoFocus
              placeholder="what are your thoughts..."
              required
            ></textarea>

            <div className="space-x-4 text-sm items-center  flex justify-end ">
              <span
                onClick={() => setcommentside(false)}
                className="text-gray-600 cursor-pointer hover:text-gray-900 duration-200"
              >
                Cancel
              </span>

              <input
                type="submit"
                disabled={issending}
                value={issending ? "Response..." : "Response"}
                className={`${
                  response
                    ? "bg-blue-200 pointer-events-none  text-white px-4 rounded-full py-2"
                    : "bg-blue-600 cursor-pointer text-white px-4 rounded-full py-2"
                }`}
              />
            </div>
          </form>
        )}

        <div className="">
          {post.comments.length === 0 ? (
            <div className="my-[50%]">
              <h2 className="text-xl text-gray-800">
                There are currently no responses for this story.
              </h2>
              <h3 className="my-4 text-gray-700">Be the first to respond.</h3>
            </div>
          ) : (
            <div>
              {post.comments.map((comment, id) => (
                <div key={id}>
                  <div className=" flex items-center space-x-4 ">
                    <div className="rounded-full w-8 h-8 bg-blue-600">
                      {comment.userImage ? (
                        <img
                          src={comment.userImage!}
                          className="rounded-full h-8 w-8 object-cover cursor-pointer"
                          alt="imag"
                        />
                      ) : (
                        <span className="text-xs flex justify-center text-white items-center translate-y-[50%] top-1/2 left-1/2">
                          <span className="capitalize cursor-pointer">
                            {comment.name
                              ? comment.name.split(" ")[0][0].toUpperCase() +
                                comment.name.split(" ")[0][1].toUpperCase()
                              : ""}
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm cursor-pointer">
                        {comment.name} {comment.last}
                      </span>
                      <span className="text-sm text-gray-600">
                        {new Date(comment._createdAt).toDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm mt-6 mb-4 break-words">
                    {"  "}
                    {comment.comment}
                  </p>
                  <div className=" cursor-not-allowed items-center flex space-x-2">
                    <Like />
                    <span className="text-sm text-gray-500">{likefield}</span>
                  </div>
                  <div className="border-b-[1px] border-gray-200 my-4"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideComment;
