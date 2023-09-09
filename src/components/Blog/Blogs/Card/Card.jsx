import Link from 'next/link';

export const Card = ({ blog }) => {
  const { title, id, image, excerpt, date,content,jetpack_featured_media_url } = blog;
  return (
    <div className='blog-item'>
      <Link href={`/blog/${id}`}>
        <a className='blog-item__img'>
          <img src={jetpack_featured_media_url} className='js-img' alt='' />
          <span className='blog-item__date'>
            <span>{date.month}</span> {date.date}
          </span>
        </a>
      </Link>
      <Link href={`/blog/${id}`}>
        <a className='blog-item__title' dangerouslySetInnerHTML={{__html : title.rendered}}></a>
      </Link>
      <p dangerouslySetInnerHTML={{__html : content.rendered}}></p>
      <Link href={`/blog/${id}`}>
        <a className='blog-item__link'>
          Read more <i className='icon-arrow-md'></i>
        </a>
      </Link>
    </div>
  );
};
