import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../app/slices/blogSlice";

const BlogForm = ({ _id }) => {
    const navigate  = useNavigate()
    const dispatch = useDispatch()
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
    user: _id,
  });
  const { title, content } = formValues;
  const handleChange = (e) => {
    setFormValues((current) => {
      return { ...current, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    dispatch(createBlog(formValues))
    
  };
  return (
    <form className="form-control flex gap-4" onSubmit={handleSubmit} id="blogForm">
      <textarea
      maxLength={100}
        value={title}
        name="title"
        className="textarea  rounded-lg  textarea-lg textarea-bordered  text-3xl sm:text-4xl font-serif font-bold"
        onChange={handleChange}
        placeholder="Title of Your dairy Blog"
        form="blogForm"
      ></textarea>
      <textarea
        
        form="blogForm"
        value={content}
        name="content"
        className="textarea rounded-lg min-h-[300px] max-h-[500px]   textarea-lg textarea-bordered text-xl font-serif"
        onChange={handleChange}
        placeholder="Write some thoughts  : content"
      ></textarea>
      <button className="btn btn-primary" type="submit">
        Upload
      </button>
    </form>
  );
};

export default BlogForm;
