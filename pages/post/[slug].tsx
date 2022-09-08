import { GetStaticProps } from "next";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typing";
import newslettergif from "../../components/gifs/New message.gif";
import Image from "next/image";
import { BiUpArrow } from "react-icons/bi";
import { GoStar } from "react-icons/go";
import { BsTwitter } from "react-icons/bs";
import { GrFacebook } from "react-icons/gr";
import { BsLinkedin } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";
import { IoCopy } from "react-icons/io5";
import { BiErrorAlt } from "react-icons/bi";
import BlockContent from "@sanity/block-content-to-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import { FiSearch } from "react-icons/fi";
import { RiMailAddLine } from "react-icons/ri";
import { useAppContext } from "../../components/context";
import { VscClose } from "react-icons/vsc";

import Link from "next/link";
// import { db } from "../../components/firebase/firebase-config";
// import { addDoc, collection } from "firebase/firestore";
import BottomSection from "../../components/atoms/BottomSection";
import LikeCommentFixed from "../../components/atoms/LikeCommentFixed";
import SideComment from "../../components/atoms/SideComment";
import {
  HomeUnclicked,
  Notif,
  Like,
  Comment,
  Save,
  Readinglist,
  Stories,
} from "../../components/atoms/icons";
import MoreFromAuthor from "../../components/atoms/MoreFromAuthor";
import SignUp from "../../components/authcomponent/SignUp";
import Head from "next/head";

// interface
interface Props {
  post: Post;
}
interface Props {
  posts: [Post];
}
// interface

// scroll to top
function scrolltotop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
// scroll to top

function Post({ post, posts }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  // const [submited, setsubmited] = useState(false);
  const [sign, setsign] = useState(0);
  const [issending, setissending] = useState(false);
  const [usersetting, setusersetting] = useState(false);
  const [signup, setsignup] = useState(false);
  const {
    user,

    logout,
  } = useAppContext();
  const [sentpopup, setsentpopup] = useState(false);
  const [commentside, setcommentside] = useState(false);

  function ClickedComment() {
    if (user) {
    } else {
      setsignup(true);
      setcommentside(false);
    }
  }
  // hide on top at specific height
  useEffect(() => {
    window.onscroll = function () {
      if (this.scrollY >= 444) {
        setup(true);
      } else {
        setup(false);
      }
    };
  });

  // hide on top at specific height

  // coppy url x hide it
  const [copypopup, setcopypopup] = useState(false);

  function copyCodeToClipboard() {
    setcopypopup(true);
    navigator.clipboard.writeText(window.location.toString());
  }
  useEffect(() => {
    const timeId = setTimeout(() => {
      setcopypopup(false);
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  });

  // coppy url
  // console.log(post.author.bio);

  const [up, setup] = useState(false);
  // const [popup, setPopup] = React.useState(false);

  function InpClicked(e: any) {
    const { name, value } = e.target;
    setemail((prevdata) => {
      return { ...prevdata, [name]: value };
    });
  }
  const [emaila, setemail] = useState({ email: "" });
  const [emailErr, setEmailErr] = useState(false);
  const [subs, setsubs] = useState(false);
  function submit(e: any) {
    e.preventDefault();
    const format = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/g;
    if (emaila.email.match(format)) {
      // addDoc(collection(db, "NewsLetters"), emaila)
      //   .then(() => {
      // setPopup(true);
      // })
      // .catch((error) => {
      //   console.log(error.message);
      // });
      setsubs(true);
      setemail({ email: "" });
    } else {
      setEmailErr(true);
    }
  }

  /* response / side popup */
  const [response, setresponse] = useState(false);

  /* response / side popup */

  // function InpClicked1(e: any) {
  //   const { name, value } = e.target;

  //   setCommentfield((prevdata) => {
  //     return { ...prevdata, [name]: value };
  //   });
  // }

  const [commentfield, setCommentfield] = useState({
    comment: "",
  });
  const [likefield, setlikefield] = useState(0);

  let data = {
    _id: post && post._id,
    name: user && user.displayName,
    email: user && user.email,
    userImage: user && user.photoURL,
    comment: commentfield.comment,
  };
  useEffect(() => {
    setsentpopup(false);
  }, [data._id]);

  async function handleSubmitform(e: any) {
    e.preventDefault();
    setissending(true);
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        // setsubmited(true);
        setissending(false);
        commentfield.comment = "";
        setsentpopup(true);
      })
      .catch((err) => {
        console.log(err);
        // setsubmited(false);
        setsentpopup(false);
      });
  }

  useEffect(() => {
    if (data.comment === "") {
      setresponse(true);
    } else {
      setresponse(false);
    }
  }, [data.comment]);

  // sanity rich text
  const CodeRenderer = ({ node }) => {
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
  const BlockRenderer = (props: any) => {
    const { style } = props.node;

    if (style === "h1") {
      return (
        <h1 className="text-[30px] font-bold text-gray-900  my-8">
          - {props.children}
        </h1>
      );
    } else if (style === "h2") {
      return (
        <h2 className="text-2xl font-bold text-gray-900  my-5">
          - {props.children}
        </h2>
      );
    } else if (style === "blockquote") {
      return (
        <blockquote className="text-gray-600 my-10 italic border-l-4 border-gray-900 pl-8">
          - {props.children}
        </blockquote>
      );
    }

    // Fall back to default handling
    return BlockContent.defaultSerializers.types.block(props);
  };

  // hide comment x like at specific height
  const { ref: myRef, inView: myelemisvisible } = useInView();
  // hide comment x like at specific height

  const [isopen, setisopen] = React.useState(false);

  const [newsletterpopup, setnewsletterpopup] = useState(false);
  function ClickedMail() {
    // const usermail = { userEmail: user?.email };
    if (!user) {
      setsignup(true);
    } else if (user) {
      // addDoc(collection(db, "NewsLettersBtn"), usermail)
      // .then(() => {
      setnewsletterpopup(true);
      // })
      // .catch((error) => {
      //   console.log(error.message);
      // });
    }
  }
  const [followed, setfollowed] = useState(false);

  function Clickedfollow() {
    // const usermail = { userEmail: user?.email };

    if (user) {
      // addDoc(collection(db, "Followed"), usermail)
      //   .then(() => {
      setfollowed((prev) => !prev);
      // })
      // .catch((error) => {
      //   console.log(error.message);
      // });
    } else {
      setsignup(true);
    }
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <link rel="icon" href="/images/medium.png" />
      </Head>
      <main className="font-poppins grid grid-cols-7 ">
        {/* First section */}
        <div className="xl:flex justify-end  h-full hidden relative  ">
          <div className="fixed justify-between  h-full px-6 py-12  col-span-1 flex flex-col ">
            <div className="flex cursor-pointer ">
              <Link passHref href="/">
                <img
                  className="h-14"
                  src="https://cdn3.iconfinder.com/data/icons/social-media-black-white-2/1151/Medium_logo_-_black-512.png"
                  alt=""
                />
              </Link>
            </div>
            <div className="flex  flex-col justify-end items-end space-y-8 ">
              {" "}
              <Link href="/">
                <div>
                  <Tooltip
                    // options
                    title="Home"
                    position="right"
                    trigger="mouseenter"
                    arrow={true}
                    delay={300}
                    hideDelay={0}
                    distance={20}
                  >
                    <HomeUnclicked />
                  </Tooltip>
                </div>
              </Link>
              <Tooltip
                // options
                title="Notifications"
                position="right"
                trigger="mouseenter"
                arrow={true}
                delay={300}
                hideDelay={0}
                distance={20}
              >
                <Notif />{" "}
              </Tooltip>
              <Tooltip
                // options
                title="Lists"
                position="right"
                trigger="mouseenter"
                arrow={true}
                delay={300}
                hideDelay={0}
                distance={20}
              >
                <Readinglist />
              </Tooltip>
              <Tooltip
                // options
                title="Stories"
                position="right"
                trigger="mouseenter"
                arrow={true}
                delay={300}
                hideDelay={0}
                distance={20}
              >
                <Stories />
              </Tooltip>
            </div>
            {user && (
              <div className="relative z-40  justify-end flex">
                <div
                  onClick={() => setusersetting((prev) => !prev)}
                  className="w-8 h-8 cursor-pointer    rounded-full"
                >
                  {user.photoURL ? (
                    <img
                      src={user && user.photoURL}
                      className="rounded-full "
                      alt=""
                    />
                  ) : (
                    <div className="bg-blue-600  cursor-pointer flex justify-center items-center rounded-full h-10 w-10">
                      <span className="text-white uppercase">
                        {user.displayName?.slice(0, 2)}
                      </span>
                    </div>
                  )}
                </div>
                <div
                  onClick={() => setusersetting(false)}
                  className={usersetting ? "fixed  inset-0 z-[1000000]" : ""}
                ></div>
                <div
                  className={`${
                    usersetting
                      ? "bg-gray-200  -translate-x-[0%] z-[1000000]  opacity-100 duration-300 ease-in-out   bottom-20 left-0  w-[20rem] sm:w-[25rem] px-10 py-8 rounded-lg shadow-lg absolute "
                      : "bg-gray-200  -translate-x-[200%] z-[1000000] opacity-0 duration-300 ease-in-out   bottom-20 left-0  w-[20rem] sm:w-[25rem] px-10 py-8 rounded-lg shadow-lg absolute "
                  }`}
                >
                  <h2
                    onClick={() => {
                      setusersetting((prev) => !prev);
                      logout();
                    }}
                    className="text-gray-800 z-50 hover:text-black duration-75 text-md cursor-pointer"
                  >
                    Sign out
                  </h2>
                  <div className="my-4 border-b-[1px]  border-gray-400 w-full" />
                  <div className="flex justify-start space-x-4  items-center">
                    {user.photoURL ? (
                      <img
                        className="w-10 h-10 rounded-full "
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

                    <div className="">
                      <h2 className="text-gray-900 text-sm capitalize">
                        {user && user.displayName}
                      </h2>
                      <h3 className="text-gray-600 text-sm ">
                        @{user && user?.email?.split("@")[0]}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!user && <div></div>}
          </div>
        </div>
        {/* newsletterpopup */}
        {newsletterpopup && (
          <div
            onClick={() => setnewsletterpopup(false)}
            className={`${
              newsletterpopup
                ? "fixed inset-0 z-10 bg-gray-100   backdrop-blur-md duration-500  bg-opacity-60 ease-in-out transition-all  overflow-y-hidden flex justify-center items-center "
                : "fixed inset-0 backdrop-blur-0 pointer-events-none duration-500  bg-opacity-0  ease-in-out transition-all overflow-y-hidden   "
            }`}
          />
        )}
        <div className="absolute">
          <div
            className={`${
              newsletterpopup
                ? "fixed scale-100  p-8 flex flex-col justify-center items-center text-center top-1/2 z-50 left-1/2 -translate-x-1/2 -translate-y-1/2    md:z-10 ease-in-out duration-500 min-h-full md:min-h-[600px] w-full md:w-auto md:h-auto md:m-auto  rounded-lg bg-white shadow-xl"
                : "fixed p-8 flex flex-col justify-center items-center text-center top-1/2 z-50 left-1/2 -translate-x-1/2 -translate-y-1/2  scale-0   md:z-10 ease-in-out duration-500 min-h-full md:min-h-[600px] w-full md:w-auto md:h-auto md:m-auto  rounded-lg bg-white shadow-xl"
            }`}
          >
            <div
              className="p-4  cursor-pointer  z-50  absolute top-0 pt-10 pr-10 right-0"
              onClick={() => setnewsletterpopup(false)}
            >
              <VscClose className="h-8 w-8  text-gray-400 hover:text-gray-700 duration-100 text-2xl cursor-pointer" />
            </div>{" "}
            <div>
              {" "}
              <Image height={260} width={260} src={newslettergif} alt="" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Thank You For Your Subscription
              </h1>

              <h2>
                You will be getting daily news about {post.author.name} posts
              </h2>
              <div className="mt-8">
                <span className="text-white px-8 py-2 rounded-md  bg-blue-600">
                  {" "}
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* newsletterpopup */}
        <div className="border-gray-200  border-x-[1px] w-full h-full  col-span-7 xl:col-span-4 ">
          {copypopup && (
            <div className="fixed  m-10 mb-20 sm:mb-10  bottom-0 z-50 right-0 ">
              <div className="bg-gray-900  flex justify-between items-center text-white w-[18rem] md:w-[40rem] h-16 px-8 py-6 rounded-lg shadow-md">
                <h1>Link copied!</h1>
                <VscClose
                  onClick={() => setcopypopup(false)}
                  className="cursor-pointer h-6 w-6"
                />
              </div>
            </div>
          )}
          {up && (
            <div
              onClick={scrolltotop}
              className="fixed hidden sm:block animate-bounce duration-500 z-40 hover:bg-gray-800 bg-gray-600 shadow-xl cursor-pointer rounded-md p-[13px] m-10 bottom-0 right-0"
            >
              <BiUpArrow className="w-4 h-4 text-white" />
            </div>
          )}
          {/* second section */}
          <div className="block xl:hidden">
            <Header />
          </div>

          {/* bottom section */}
          <BottomSection />
          {/* bottom section */}
          <div className="wrapper z-0 mt-24 xl:mt-0 flex flex-col justify-center max-w-[800px] px-6">
            <div className="md:flex space-y-8  md:space-y-0 justify-between  items-center space-x-4 py-10 font-extralight text-sm">
              <div className="flex ">
                <div>
                  <img
                    className="h-12 w-12 object-cover rounded-full"
                    src={urlFor(post.author.image).url()!}
                    alt=""
                  />
                </div>
                <div className="pl-4">
                  <p className="font-medium text-base">
                    <span className="text-gray-900">{post.author.name}</span>
                  </p>
                  <div className="flex items-center ">
                    <p className="text-gray-600">
                      {new Date(post._createdAt).toDateString()}{" "}
                    </p>
                    <GoStar className="text-gray-500 ml-2 h-4" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center space-x-6">
                <div className="border-[0.5px] sm:hidden border-gray-100 w-full"></div>

                <Tooltip
                  // options
                  title="Share on Twitter"
                  position="top"
                  trigger="mouseenter"
                  arrow={true}
                  delay={300}
                  hideDelay={0}
                  distance={20}
                >
                  <BsTwitter className="h-[18px] w-[18px] text-gray-500 hover:text-gray-900 duration-300 cursor-pointer" />
                </Tooltip>
                <Tooltip
                  // options
                  title="Share on Facebook"
                  position="top"
                  trigger="mouseenter"
                  arrow={true}
                  delay={300}
                  distance={20}
                >
                  <GrFacebook className="h-[17px] w-[17px] text-gray-500 hover:text-gray-900 duration-300 cursor-pointer" />
                </Tooltip>
                <Tooltip
                  // options
                  title="Share on Linkedin"
                  position="top"
                  trigger="mouseenter"
                  arrow={true}
                  delay={300}
                  distance={20}
                >
                  <BsLinkedin className="h-[17px] w-[17px] text-gray-500 hover:text-gray-900 duration-300 cursor-pointer" />
                </Tooltip>
                <Tooltip
                  // options
                  title="Copy Link"
                  position="top"
                  trigger="mouseenter"
                  arrow={true}
                  delay={300}
                  distance={20}
                >
                  <IoCopy
                    onClick={copyCodeToClipboard}
                    className="h-[17px] w-[17px] text-gray-500 hover:text-gray-900 duration-300 cursor-pointer"
                  />
                </Tooltip>
              </div>
            </div>
            {/* like x Comment fixed */}
            <LikeCommentFixed
              likefield={likefield}
              myelemisvisible={myelemisvisible}
              post={post}
              setcommentside={setcommentside}
            />

            {/* like x Comment fixed */}

            <article className="">
              <h1 className="text-[32px] border-b-[1px] font-bold  mb-3 text-black ">
                {post.title}
              </h1>
              <h2 className="text-[20px]  font-light text-gray-500">
                {post.description}
              </h2>
              {isopen && (
                <div
                  onClick={() => setisopen(false)}
                  className="fixed inset-0 z-40 bg-gray-200/95"
                ></div>
              )}
              <div onClick={() => setisopen((prev) => !prev)}>
                <img
                  className={`${
                    isopen
                      ? "max-h-[600px]  fixed z-50  m-auto inset-x-0 inset-y-0 p-2 bg-white rounded-sm overflow-y-scroll cursor-zoom-out   duration-500 ease-in-out"
                      : "h-auto  cursor-zoom-in my-8 w-full object-cover   duration-500 ease-in-out"
                  }`}
                  src={urlFor(post.mainImage).url()!}
                  alt="image"
                />
              </div>
            </article>
            <div>
              <BlockContent
                blocks={post.body}
                className="capitalize mt-6 imagepaddingstyle li link text-[20px]"
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                content={post.body || []}
                serializers={{
                  types: {
                    block: BlockRenderer,
                    code: CodeRenderer,
                  },
                }}
              />
            </div>
            {/* side comment */}

            <SideComment
              ClickedComment={ClickedComment}
              commentfield={commentfield}
              commentside={commentside}
              handleSubmitform={handleSubmitform}
              likefield={likefield}
              post={post}
              response={response}
              sentpopup={sentpopup}
              setCommentfield={setCommentfield}
              setcommentside={setcommentside}
              user={user}
              issending={issending}
            />

            {/* side comment */}
            <div
              ref={myRef}
              id="hide"
              className="flex  mb-36 mt-16 justify-between items-center"
            >
              <div className="flex  space-x-8  items-center">
                {" "}
                <div className="flex space-x-2">
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
                    <div className="flex  space-x-2 cursor-pointer">
                      <Like />

                      <span className="text-sm text-gray-500">{likefield}</span>
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
                      className="flex space-x-2 cursor-pointer"
                    >
                      <Comment />
                      <span className="text-sm text-gray-500">
                        {post.comments.length}
                      </span>
                    </div>
                  </Tooltip>
                </div>
              </div>
              <div className="flex  cursor-not-allowed  space-x-2 ">
                <Tooltip
                  // options
                  title="Not working yet"
                  position="top"
                  trigger="mouseenter"
                  arrow={true}
                  delay={300}
                  hideDelay={0}
                  distance={20}
                >
                  <div className=" cursor-not-allowed flex space-x-2">
                    <Save />
                  </div>
                </Tooltip>
              </div>
            </div>

            {/* comments*/}
            {/* subscribe to newsletter */}
            <div className="w-full wrapper p-10 border-t-[4px] border-blue-600  bg-gray-100">
              {subs ? (
                <div>
                  <h1 className="text-2xl mb-2 capitalize font-bold">
                    thank you for your subscription
                  </h1>
                  <h2>
                    You will be getting daily news about {post.author.name}{" "}
                    posts
                  </h2>
                </div>
              ) : (
                <div className="z-0">
                  <h1 className="text-2xl font-bold">
                    Get an email whenever {post.author.name} publishes.
                  </h1>
                  <form
                    onSubmit={submit}
                    className="pt-6 space-y-4 w-full   sm:space-x-4  justify-between flex flex-col sm:flex-row items-center"
                  >
                    <div
                      className={`${
                        emailErr
                          ? " w-[100%]  sm:w-[67%]  animate-[wave_0.8s_ease-in-out_1]"
                          : " w-[100%]   sm:w-[67%]"
                      }`}
                    >
                      <input
                        value={emaila.email}
                        onChange={InpClicked}
                        name="email"
                        id="emailinp"
                        type="text"
                        className={`${
                          emailErr
                            ? "block z-0   w-full py-2.5 px-0 text-sm text-gray-600 bg-transparent border-0 border-b-[1px]  appearance-none  dark:border-red-600 dark:focus:border-primary-100 focus:outline-none focus:ring-0 focus:border-red-600  peer"
                            : "block z-0 w-full py-2.5 px-0 text-sm text-gray-600 bg-transparent border-0 border-b-[1px]  appearance-none  dark:border-gray-400 dark:focus:border-primary-100 focus:outline-none focus:ring-0 focus:border-blue-600  peer"
                        }`}
                        placeholder="Your Email"
                        required
                      />{" "}
                      {emailErr && (
                        <BiErrorAlt className="text-red-500 absolute right-0 top-4" />
                      )}
                    </div>

                    <button
                      className="w-full sm:w-auto"
                      onClick={() => setEmailErr(false)}
                    >
                      <div className="flex  justify-center items-center space-x-2 bg-blue-600 hover:bg-blue-700  duration-500 text-white py-[11px] px-0 sm:px-8 rounded-full">
                        <RiMailSendLine className="h-[23px] w-[23px]" />
                        <span>Subscribe</span>
                      </div>
                    </button>
                  </form>
                  {emailErr && (
                    <h2 className="text-red-500 pb-4 pt-4 sm:pt-0 text-sm">
                      Enter a valid email address.
                    </h2>
                  )}
                  <h2 className="pr-4 text-xs  pt-6">
                    By signing up, you will create a Medium account if you don’t
                    already have one. Review our{" "}
                    <span className="cursor-pointer underline">
                      Privacy Policy
                    </span>{" "}
                    for more information about our privacy practices.
                  </h2>
                </div>
              )}
            </div>

            <div className="py-12 ">
              <MoreFromAuthor
                ClickedMail={ClickedMail}
                Clickedfollow={Clickedfollow}
                followed={followed}
                post={post}
                posts={posts}
              />
            </div>
          </div>
        </div>
        {/* posts on map */}

        {/* third section */}
        <div className="h-[110vh]   hidescrollbar relative hidden xl:flex">
          <div
            className={`${
              user
                ? "fixed     bottom-0 top-0 overflow-y-scroll  w-[380px] col-span-2 px-8 py-0"
                : "fixed    bottom-0 top-0 overflow-y-scroll  w-[380px] col-span-2 px-8 py-16"
            }`}
          >
            {!user && (
              <div className="space-x-8">
                <button
                  onClick={() => setsignup(true)}
                  className="bg-gray-800 hover:bg-gray-900 duration-500 px-16 py-2 rounded-full text-white"
                >
                  Get started
                </button>
                <button
                  onClick={() => {
                    setsignup(true);
                    setsign(1);
                  }}
                  className="text-black hover:text-blue-600"
                >
                  Sign in
                </button>
              </div>
            )}
            <div className="w-full py-10 relative">
              <input
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                className="px-12 w-[100%] py-2 rounded-full border-gray-200 border-[1px] outline-none text-sm"
                type="text"
                placeholder="Search.."
                name=""
                id=""
              />
              <FiSearch className="absolute -translate-y-1/2 top-1/2  -translate-x-1/2 left-8 h-4" />
            </div>
            <div>
              {searchTerm !== "" && (
                <div
                  className={`${
                    user
                      ? "bg-gray-100 w-[330px] top-[95px]  absolute p-4 space-y-2 rounded-md shadow-lg backdrop-blur-xl"
                      : "bg-gray-100 w-[330px]  top-[200px]  absolute p-4 space-y-2 rounded-md shadow-lg backdrop-blur-xl"
                  }`}
                >
                  <h2 className="mt-4">From Medium</h2>
                  <hr />
                  {posts
                    .filter((val) => {
                      if (
                        val.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return val;
                      } else if (searchTerm == "") {
                        return val;
                      }
                    })
                    .map((post, id) => {
                      return (
                        <div key={id}>
                          <Link
                            passHref
                            key={post._id}
                            href={`/post/${post.slug.current}`}
                          >
                            <div key={post._id}>
                              <div className="my-8 cursor-pointer ">
                                <h2 className="text-sm word-breaks text-gray-900 hover:text-black duration-100">
                                  {post.title}
                                </h2>

                                <h2 className="text-xs text-gray-500">
                                  {" "}
                                  {new Date(
                                    post._createdAt
                                  ).toDateString()}{" "}
                                </h2>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <div>
              <div>
                <img
                  className="h-24 w-24 object-cover rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
                <h1 className="font-bold py-4 text-gray-900">
                  {post.author.name}
                </h1>
                <h2 className="text-gray-500 text-sm">
                  <BlockContent
                    className=""
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                    blocks={post.author.bio}
                  />
                </h2>
                <div className="py-4 flex items-center space-x-4">
                  <button
                    value={followed ? "Followed" : "Follow"}
                    onClick={Clickedfollow}
                    className={`${
                      followed
                        ? "border-[1px] rounded-full border-blue-600 hover:border-blue-800 duration-500  px-6 py-2 text-gray-900"
                        : "bg-blue-600 rounded-full hover:bg-blue-700 duration-500  px-4 py-2 text-white"
                    }`}
                  >
                    {followed ? "Following" : "Follow"}
                  </button>
                  <div
                    onClick={ClickedMail}
                    className="h-[37px] w-[37px] cursor-pointer flex justify-center items-center  rounded-full bg-blue-600 hover:bg-blue-700 duration-500"
                  >
                    <RiMailAddLine className="text-white text-xl" />{" "}
                  </div>
                </div>
                <div className="py-4">
                  <h2 className="text-gray-900 text-md font-semibold capitalize">
                    more from medium
                  </h2>
                  <div className="py-6">
                    {posts.slice(0, 5)?.map((post, id) => (
                      <Link
                        passHref
                        key={id}
                        href={`/post/${post.slug.current}`}
                      >
                        <div className="flex items-start justify-between py-4">
                          <div className="space-y-2 flex flex-col jusify-center cursor-pointer">
                            <div className="flex items-center space-x-2">
                              {" "}
                              <img
                                alt="r"
                                className="h-6 rounded-full"
                                src={urlFor(post.author.image).url()!}
                              />
                              <span className="text-sm font-normal capitalize">
                                {post.author.name}
                              </span>
                            </div>
                            <div>
                              <p className="text-[16px] text-md font-semibold w-[225px]">
                                {post.title}
                              </p>
                            </div>
                          </div>
                          <div className="h-16 w-16 flex justify-start">
                            <img
                              className="h-full w-full rounded-md cursor-pointer  object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                              src={urlFor(post.mainImage).url()!}
                              alt="image"
                            />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="text-xs mt-10">
                    <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                      Help
                    </span>

                    <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                      Status
                    </span>

                    <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                      Writers
                    </span>

                    <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                      Blog
                    </span>

                    <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                      Careers
                    </span>

                    <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                      Privacy
                    </span>
                    <br />
                    <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                      Terms
                    </span>

                    <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                      About
                    </span>
                    <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                      Knowable
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* SIGN UP */}
        <SignUp
          setsign={setsign}
          setsignup={setsignup}
          sign={sign}
          signup={signup}
        />
        {/* SIGN UP */}
      </main>
    </>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `
    *[_type == 'post']{
        _id,
        title,
        slug{
        current
      }     
      }
    `;
  const posts = await sanityClient.fetch(query);

  const paths = await posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
    *[_type=="post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author-> {
        name,
        bio,
        image,
      },
      "comments": *[
        _type == "comment" &&
        post._ref == ^._id  && approved==true
     ]{name,last,comment,_createdAt, userImage},
  
      description,
      mainImage,
      title,
       slug,
       body
      }`;
  const query1 = `
      *[_type=="post"]{
        _id,
        title,
        _createdAt,
        author -> {
        name,
        image
      },
      description,
      mainImage,
      body,
      slug
      }`;
  const posts = await sanityClient.fetch(query1);

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
      posts,
    },
    revalidate: 600,
  };
};
