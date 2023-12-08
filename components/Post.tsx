import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      {/* maybe put the song/album/arist in place of the title */}
      {/* <h2>{post.title}</h2> */}
      <p>@{authorName}</p>
      <ReactMarkdown children={post.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding-top: 0.5em;
          padding-left: 1em;
          padding-right: 1em;
          padding-bottom: 0.5em;
          margin: 0.3em;
        }
      `}</style>
    </div>
  );
};

export default Post;
