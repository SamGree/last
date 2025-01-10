import { useState, useCallback } from 'react';
import { Container, Form } from 'react-bootstrap';
import CustomPagination from '../../components/CustomPagination';
import PostList from './PostList';
import { filteredPostsData } from '../../utils/helper-functions';
import usePostStore from '../../store/post-store';



import '../../styles/posts.css';

const Posts = ({ title }) => {
  const { posts } = usePostStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredPosts = filteredPostsData(posts, searchTerm);
  const totalItems = filteredPosts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className='mt-5'>
      {title && <h1 className='text-center'>{title}</h1>}
      <Form className='mt-4 posts-form'>
        <Form.Group controlId='searchInput' className='flex-1'>
          <Form.Control
            type='text'
            placeholder='Search by Users, Title and Tags'
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>
      <PostList posts={displayedPosts} />
      <CustomPagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </Container>
  );
};

export default Posts;
