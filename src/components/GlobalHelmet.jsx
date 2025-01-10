import { Helmet } from 'react-helmet-async';

const GlobalHelmet = () => (
  <Helmet>
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <meta name='author' content='E-Pics' />
    <meta
      name='description'
      content="This app is a platform for photography enthusiasts to enjoy great pictures, upload their own images, view others' photos, like, and comment on them."
    />
    <meta
      name='keywords'
      content='pictures, photos, albums, upload pictures, create albums, like photos, comment photos, image sharing'
    />
  </Helmet>
);

export default GlobalHelmet;
