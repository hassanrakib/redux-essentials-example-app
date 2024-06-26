import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { fetchPosts, selectAllPosts, selectPostById, selectPostIds } from './postsSlice';
import { Spinner } from '../../components/Spinner';

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>
      <ReactionButtons post={post} />
    </article>
  )
};

export const PostsList = () => {
  // const posts = useSelector(selectAllPosts);
  const orderedPostIds = useSelector(selectPostIds);
  const postsStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, fetchPosts]);

  let content;

  if (postsStatus === 'loading') {
    content = <Spinner text='Loading...' />
  } else if (postsStatus === 'succeded') {
    // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    // content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} />);
    content = orderedPostIds.map(postId => <PostExcerpt key={postId} postId={postId} />);
  } else if (postsStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}