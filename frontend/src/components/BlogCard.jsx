import { useDispatch, useSelector } from "react-redux";
import { Link,  } from "react-router-dom";
import { useDeleteBlogMutation } from "../app/slices/blogSlice";

const BlogCard = ({ user, title, body, createdAt, content, _id }) => {
  const date = new Date(createdAt).toLocaleDateString();
  const { userInfo } = useSelector((state) => state.auth);
  const [deleteBlog] = useDeleteBlogMutation();
  return (
    <div className="border p-4 max-w-[800px] my-10 text-justify w-full mx-auto shadow-md rounded-md hover:shadow-lg hover:shadow-neutral  transition-all duration-300 ease-in-out">
      <Link to={`/blogs/${_id}`}>
        <h1 className="text-3xl whitespace-pre-wrap font-bold  hover:underline hover:text-accent">
          {title}
        </h1>
      </Link>
      <h3>{user.name}</h3>
      <small>{date}</small>
      <p>
        {content.slice(0, 50)}
        <Link className="text hover:text-info underline" to={`/blogs/${_id}`}>
          {" "}
          ...Read more
        </Link>
      </p>
      {user._id == userInfo._id && (
        <button
          className="btn btn-error"
          onClick={() => {
           deleteBlog(_id);
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default BlogCard;
