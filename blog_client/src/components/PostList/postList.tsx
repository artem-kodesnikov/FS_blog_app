import React, { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../../types/post";
import { PostItem } from "../PostItem";
import style from './postList.module.scss';
import classNames from "classnames";
import { Loader } from "../Loader";
import { BASE_URL } from "../../api/requests";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const allPosts = await axios.get(`${BASE_URL}/posts/data`);
        const result = await axios.get(`${BASE_URL}/posts/data?page=${currentPage}&limit=${itemsPerPage}`);
        setAllPosts(allPosts.data.current);
        setPosts(result.data.current);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage,]);

  const handleClick = (e: any) => {
    e.preventDefault();
    setCurrentPage(+e.target.id);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPosts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  };

  return (
    <>
      {isLoading && <Loader />}
      {posts.map((post: Post) => (
        <PostItem
          key={post.id}
          title={post.title}
          content={post.content}
          date={post.date}
          user={post.user}
          url={post.url}
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
