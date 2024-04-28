import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice";

export default function PostAuthor({userId}) {
    // const author = useSelector(state => state.users.find(user => user.id === userId))
    const author = useSelector((state) => selectUserById(state, userId));

    return <span>{author ? author.name : "Unknow Author"}</span>
}