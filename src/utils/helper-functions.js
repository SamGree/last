import { parseISO, format } from 'date-fns';

export const filteredPostsData = (posts, searchTerm) => {
  if (!Array.isArray(posts)) {
    return [];
  }

  const lowerSearchTerm = (searchTerm || '').toLowerCase();

  return posts
    .filter((post) => {
      const title = (post.title || '').toLowerCase();
      const author = (post.author || '').toLowerCase();
      const tags = Array.isArray(post.tags)
        ? post.tags.map((t) => t.toLowerCase())
        : [];

      const matchesTitle = title.includes(lowerSearchTerm);
      const matchesAuthor = author.includes(lowerSearchTerm);
      const matchesTags = tags.some((tag) => tag.includes(lowerSearchTerm));

      return matchesTitle || matchesAuthor || matchesTags;
    })
    .filter(
      (post, index, self) => index === self.findIndex((p) => p.id === post.id)
    );
};

export const formatDate = (dateString) => {
  try {
    if (!dateString || typeof dateString !== 'string') {
      console.error('Invalid date string:', dateString);
      return 'Invalid date';
    }

    const dateObject = parseISO(dateString);

    return format(dateObject, 'yyyy-MM-dd');
  } catch (error) {
    console.error('Error parsing date string:', error);
    return 'Invalid date';
  }
};
