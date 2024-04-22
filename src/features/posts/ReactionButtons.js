import { useDispatch } from "react-redux"
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

export default function ReactionButtons({ post }) {
    const dispatch = useDispatch();
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => <button key={name} className="muted-button reaction-button" onClick={() => dispatch(reactionAdded({postId: post.id, reaction: name}))}>{emoji} {post.reactions[name]}</button>)

    return <div>{reactionButtons}</div>
}