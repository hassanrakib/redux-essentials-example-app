import { useSelector } from "react-redux";

export default function PostAuthor({userId}) {
    const author = useSelector(state => state.users.find(user => user.id === userId))

    return <span>{author ? author.name : "Unknow Author"}</span>
}