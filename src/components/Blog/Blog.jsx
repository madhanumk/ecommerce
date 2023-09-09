import { Blogs } from './Blogs/Blogs';
// import blogData from 'data/blog/blog';
import { usePagination } from 'components/utils/Pagination/Pagination';
import { PagingList } from 'components/shared/PagingList/PagingList';
import axios from "axios"
import { useEffect, useState } from 'react';

export const Blog = () => {
  // const blogs = [...blogData];
  const [blogs, setBlogs] = useState([])
  const paginate = usePagination(blogs, 4);

  const userKey = "ck_d72694c3d2fececf68fc8445c5f1e08f1e0e6595"
  const userPassword = " cs_bb077412971bcedc81c0e63c3cee50f3bea9a6b8"

  useEffect(() => {
    axios.get("https://suvado.in/rdbs/wp-json/wp/v2/posts/?per_page=100", {
      auth: {
        username: userKey,
        password: userPassword
      }
    }).then((res) => {
      setBlogs(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <>
      {/* <!-- BEGIN BLOG --> */}
      <div className='blog'>
        <div className='wrapper'>
          <Blogs blogs={paginate?.currentData()} />
        </div>

        {/* <!-- PAGINATE LIST --> */}
        <PagingList paginate={paginate} />
      </div>
      {/* <!-- BEGIN EOF --> */}
    </>
  );
};
