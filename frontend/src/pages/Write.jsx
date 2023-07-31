import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../app/slices/blogSlice';
import {  useNavigate } from 'react-router-dom';

const Write = () => {
    const dispatch = useDispatch()
    const {loading, error, message, success}= useSelector(state => state.blogs)
    const navigate = useNavigate()
    const {userInfo} = useSelector(state=> state.auth)
    const [blogValues, setBlogValues] = useState({
        title: '',
        content: '',
        user: userInfo._id
    })
    const {title, content} = blogValues;

    function handleChange(e){
         setBlogValues(current => {
            return {...current , [e.target.name]: e.target.value}
         })
    }     
    function handleSubmit(e){
        e.preventDefault()
        dispatch(createBlog(blogValues))
        navigate('/')
    }  
  return (
    <div className="flex flex-col  gap-5 w-full">
      <textarea
      value={title}
        rows={1}
        name="title"
        id="title"
        placeholder="Title"
        onChange={handleChange}
        className="p-7  textarea textarea-primary font-bold text-3xl sm:text-4xl lg:text-5xl"
        maxLength={100}
      ></textarea>
      <textarea
       value={content}
       onChange={handleChange}
        name="content"
        id="content"
        className="p-7 textarea border-none outline-none focus:outline-none text-2xl sm:text-3xl lg:text-4xl"
        placeholder="Write down your thoughts"
      ></textarea>
      <button className='btn btn-secondary' onClick={handleSubmit}>Ok, I'm done writing</button>
    </div>
  );
};

export default Write;
