import type { GetServerSideProps } from 'next';
import React from 'react';
import { PostForm } from '../components/PostForm';
import prisma, { Post } from '../lib/prisma';

type Props = {
  posts: Pick<Post, 'id' | 'title' | 'content'>[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
      id: true
    }
  });

  return {
    props: {
      posts,
    }
  }
}

export default function Index(props: Props) {
  return (
    <>
      <PostForm />
      <div> post count: { props.posts.length }</div>
      <ul>
      {props.posts.map((post: Post) => {
        return (
          <li key={post.id}>
            <h3>{post.id}:{post.title}</h3>
            <p>{post.content}</p>
          </li>
        )
      })}
      </ul>
    </>
  );
}
