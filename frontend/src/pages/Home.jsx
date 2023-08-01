import { useState } from "react";

import { UserBlogs } from "./Profile";
import { useGetAllBlogsQuery } from "../app/slices/blogSlice";

import Loading from "../components/Loading";
const Home = () => {
  const [user, setUser] = useState("");
  const {data, error, isLoading} = useGetAllBlogsQuery();
  console.log(data);
  return (
    <div className="">
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Search People"
        className="input input-bordered"
      />
      {isLoading && <Loading></Loading>}

      <div className="flex flex-col w-full  mx-auto"></div>
      {data&& (
        <UserBlogs
          blogs={data.filter((blog) => blog.user.name.includes(user))}
        ></UserBlogs>
      )}
    </div>
  );
};

export default Home;
