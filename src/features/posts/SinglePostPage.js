import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';

export const SinglePostPage = ({ match }) => {
    const { postId } = match.params;

    const post = useSelector(state => state.posts.find(post => post.id === Number(postId)));

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
                <p className="post-content">{post.content}</p>
                <Link to={`/editPost/${postId}`} className="button">
                    Edit Post
                </Link>
                <ReactionButtons post={post} />
            </article>
        </section>
    )
}