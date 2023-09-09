import { Card } from './Card/Card';

export const Blogs = ({ blogs }) => {

  // console.log("PassBlogs",blogs)
  return (
    <>
      {/* <!-- BEGIN  BLOG --> */}

      <div className='blog-items'>
        {blogs.map((blog) => (
          <Card key={blog.id} blog={blog} />
        ))}
      </div>

      {/* <!--  BLOG EOF   --> */}
    </>
  );
};
