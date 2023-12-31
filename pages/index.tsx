import React from "react"
import { GetStaticProps } from "next"
import Layout from "@components/Layout"
import Post, { PostProps } from "@components/Post"
import prisma from "@lib/prisma"

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    // Filter only 'Post'records where published = true
    where:  { published: true },
    
    // Include the 'author' and 'name' of the post.
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return { 
    props: { feed }, 
    revalidate: 10 
  }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: grey;
          transition: box-shadow 0.1s ease-in;
          border-radius: 2em;
        }

        h1 {
          position: center;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #fff;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
