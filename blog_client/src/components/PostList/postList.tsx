import React, { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../../types/post";
import { PostItem } from "../PostItem";
import style from './postList.module.scss';
import classNames from "classnames";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      const allPosts = await axios.get(`http://localhost:5000/posts/data`);
      const result = await axios.get(`http://localhost:5000/posts/data?page=${currentPage}&limit=${itemsPerPage}`);
      setAllPosts(allPosts.data.current);
      setPosts(result.data.current);
    };
    fetchData();
  }, [currentPage, itemsPerPage]);

  const handleClick = (event: any) => {
    setCurrentPage(+event.target.id);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPosts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  };

  return (
    <>
      {posts.map((post: Post) => (
        <PostItem
          key={post.id}
          title={post.title}
          content={post.content}
          date={post.date}
          user={post.user}
        />
      ))}
      <ul className={style.pagination_list}>
        {pageNumbers.map((number: any) => (
          <li
            className={classNames(style.pagination_item, number === currentPage ? style.active : '')}
            key={number}
            id={number}
            onClick={(e) => handleClick(e)}
          >
            {number}
          </li>
        ))}
      </ul>
    </>
  );
};
