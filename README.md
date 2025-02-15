# E-pics

- ![am i responsive](/readme.img/ami.png)

---

## Introduction

E-pics is a platform designed for photo enthusiasts who want to share their images with others. Users can not only upload their own photos but also download any images available on the site.

The goal is to foster a vibrant sharing community where you can either contribute by uploading your photos or simply browse and appreciate the creations of others.

Additionally, you can connect with the community by leaving comments, giving likes, or organizing your favorite posts into private albums for easy access.

---

## Table of Contents

---

- [User Profiles](#user-profiles)
- [User Goals](#user-goals)
- [Features](#features)
  - [Home Page](#home-page)
  - [Add Post Page](#add-post-page)
  - [Albums Page](#albums-page)
  - [Liked Posts]()
  - [Settings Page](#settings-page)
- [Design](#design)
  - [Wireframes](#Wireframes)
- [Manual test](#manual-test)
  - [Navbar](#Navbar)
  - [Search field](#search-field)
  - [Home Page.](#home-page)
  - [Register page](#register-page)
  - [Login page](#login-page)
  - [Add Post page.](#)
  - [Albums](#albums)
  - []()
  - []()
  - []()
  - []()
  - []()

## User Profiles

- The casual user finds joy in browsing through captivating photos as a way to unwind and draw inspiration. They appreciate discovering fresh photography styles and occasionally download images for personal use. The convenience of saving their favorite photos into albums for easy access later is something they highly value.The amateur photographer enjoys sharing their work with others to gather feedback.
  They find satisfaction in observing how their creations are received and take pride in contributing to a creative community. The platform makes it simple for them to upload their work and gain exposure.
  Being able to organize their own content and explore others' creations in albums is a significant perk.
  The enthusiast loves collecting and organizing photos. They take pleasure in curating their collections,
  showcasing them to family and friends. A seamless process for adding albums and posts is essential,
  as they frequently log in to explore, download, and refine their private collections.

---

### User Goals

- The Casual User
  These users want to discover new photography styles and trends.
  They enjoy scrolling as a relaxing activity.
  The Amateur Photographer
  This group uses the platform to share their photos and connect with the community.They appreciate feedback through likes, comments, and download counts.The platform helps them gain exposure for their work. The Enthusiast
  Enthusiasts love finding and collecting beautiful images.
  They take pride in curating albums of amazing pieces.
  Website Owner Goals The owner’s goal is to increase website traffic.More users mean they can add features to improve the experience for current users and attract new ones.
  This could lead to more ad revenue and potential subscription options.
  New features must be carefully chosen to keep existing users happy.
  The site needs to work well on both mobile and larger screens for easy use.

---

## Features

### Home Page

- E-Pics Branding: Displays the application title prominently at the top for clear identification.
- Navigation Bar:
  Includes options to navigate to the Home, Login, and Register pages for quick access.
- ![Navbar](/readme.img/navigation%20bar.png)

---

### Registration Page

- The Registration Page allows new users to create an account by providing their credentials and uploading a profile avatar.
  - Username: Users can enter their desired username. Username cannot exceed 15 characters.The username field must be unique.
  - Password: Users can input their password for account security.
  - Confirm Password: Users must re-enter their password to ensure it matches.
  - Upload Avatar: Users can upload an image file to set as their profile avatar.
  - Register button to submit their information and create an account.
- ![Registration](/readme.img/registerpage.png)

---

### Login page

- The Login Page allows registered users to access their accounts by entering their credentials.
  -Username: Users must enter their registered username.
- Password: Users must enter their account password.
- Users can click the "Login" button to authenticate and access their account.
- ![login](/readme.img/login.page.png)

---

- Search Functionality:
  A search bar allows users to search posts by keywords like Users, Titles, or Tags for quick filtering and navigation.
- ![Search bar](/readme.img/searchbar.png)

---

- Post Display Individual Post Card:
  Shows a large image preview of the post.
  Includes the title, Description or tag for the post.
- ![post](/readme.img/postdisplay.png)

---

- Post Actions: Like Button: Allows users to like a post, with a heart icon will turn _red_ and the count of likes displayed. If you unlike the post the heard icon will turn black.
- ![redheart](/readme.img/redheart.png)
- Comment Button: Enables users to comment on the post, with the count of comments displayed.
- Download Button: Provides an option to download the post content, with the download count displayed and valid date is associated with the post.
- ![postaction](/readme.img/postactions.png)

---

- Pagination: Pagination controls allow users to navigate through posts, displaying items per page (default is 5).
- Navigation includes:
  - Items per page dropdown.
  - Buttons for "First", "Previous", "Next", and "Last" pages.
- ![pagination](/readme.img/pagination.png)

---

### Comments Section

- As a logged-in user, I can click on the comment icon to share my thoughts on any post.
- Users can read comments from other users if any exist. Users can like comments if they wish but _NOT_ your own comment.
- You can also delete or edit your own comment while when you are logged in
- ![edit delete comment](/readme.img/edit.delete.comment.png)

---

- Select post to album
- Users can add posts to albums.
- ![select album](/readme.img/selecalbum.png)

---

### Add Post Page

- Home Button: Quickly returns to the main dashboard.
- Navigation Menu.
  - Dropdown menu next to the user’s name.
    - Add Post, Liked Posts, Albums, Settings.
    - ![nav dropdown](/readme.img/addpostpage.png)

---

- Form for Adding New Posts.
  - Title Input Field: - Placeholder: "Enter post title." - Placeholder: "Enter post description." - Placeholder: "Enter tags" - Users can upload a file or image related to their post.
    Includes a "Choose File" button for selecting the file. Size to download the image max 2MB.
    Displays "No file chosen" by default when no file has been uploaded. - A Submit button with a visually distinct style (purple).
- ![form add post](/readme.img/formaddnewpost.png)

---

### Liked Posts

- When a user likes a post while logged in, it will automatically be added to the "Liked Posts" page, and the heart icon should be red.
- ![likepost](/readme.img/likepost.png)

---

### Post owner

- When a user is logged in and viewing a post they created, a dropdown menu will appear next to their avatar image. Clicking on the dropdown will show the option "Go to details".
- ![go to details](/readme.img/godettails.png)
- If you click on "Go to details", you will be taken to a page where you can edit or delete the image.
- ![delete post](/readme.img/d.e.post.png)

---

### Albums Page

Page Description:

- Provides a clear explanation of the functionality: "Here you can create albums, add images to them, and view your albums sorted with your favorite photos."

Create Album:

- Users can input a title for their new album.
- Create Button:
  A visually distinct purple button to create a new album.
- Displays existing albums as separate cards. After creating an album, users will have the option to either delete the album or edit its name.
- ![album](/readme.img/addalbum1.png)

---

### Settings Page

- Username Field:
  - Displays the current username of the user.
  - Allows editing to update the username.
- Biography Field:
  - Text area for users to input or edit their biography.
- Avatar Upload:
  - Provides an option to upload a profile picture (avatar).
  - Includes a "Choose File" button for selecting an image file.
  - Displays "No file chosen" by default when no file is uploaded.
- Theme Settings:
  - Explains how the theme changes automatically based on the user’s local time:
    - Dark mode: 6 AM to 6 PM.
    - Light mode: Other times.
- Theme Checkbox:
  - Displays the current theme (e.g., "Current Theme: Light") with an optional checkbox to manage theme preferences.
- Save Changes:
  - Save Button: A prominent purple button labeled "Save Changes" to confirm and apply updates made to the profile or settings.
- ![settings](/readme.img/settingsform.png)

---

### Toaster Messages in the Project

- In this project, toaster messages are used to provide real-time feedback for user actions. These notifications appear in the bottom right corner of the screen to inform users about the success or failure of their actions.
- here are some example
- ![toster](/readme.img/toaster.png) .![toaster1](/readme.img/toaster1.png)
- ![toaster2](/readme.img/toaster2.png) .![toaster3](/readme.img/toaster3.png)

---

## Design

### Wireframes

- Mobile and iPad versions will share the same structure.
- Home page wireframe.
- ![Mobile](/readme.img/wireframes.mobile.png) ![navbar](/readme.img/navbar.drop.png)

---

- Login and register page wireframe
- ![login](/readme.img/login.page.wireframes.png)
- ![register](/readme.img/registerpage.wirefram.png)

---

- User when logged in.
- ![logged in wirefram](/readme.img/wire.loggedin.png)

---

- Album
- ![albumpagewire](/readme.img/wire.album.png)

---

- liked posts page
- ![wirelikedposts](/readme.img/wire.liked.p.png)

---

- Add new posts
- ![wirenewpost](/readme.img/wire.add.new.post.png)

---

- Setting page
- ![wiresettings](/readme.img/wire.settings.png)

---

- Laptop and desktop versions will share the same structure.
- Home 
- ![wirelaphome](/readme.img/wire.laptop.home.png)
---
- Register
- ![wire.lap.register](/readme.img/wire.lap.register.png)
---
- Login
- ![wire.lap.login](/readme.img/wire.lap.login.png)
---
- User page
- ![user page](/readme.img/wire.lap.userpage.png)
---
- User home page
- While logged in, if a user has added posts, a dropdown menu will appear in the top-right corner next to the avatar on each post. This menu allows the user to access the "Go to details" option for their own posts.
- ![User home page](/readme.img/wire.user.lap.option.png)
- If the user clicks on Go to details, they will be taken to a page where they can delete the image or edit its details.
- ![delete img](/readme.img/wire.delete.imglap.png)
---
- Comment
  - Like post.
  - Download post.
  - Add post to album.
  - write a comment. Edit or delete your comment.
  - Like othere user's comment.
  - If you have liked any post or comment you can also unlike it by clicking on it again.
- ![comment](/readme.img/wirer.u.dc.png)
---
- Album page
- ![album wire](/readme.img/wire.album.lap.png)
---
- Settings page
- ![Wirefram for settings page](/readme.img/Wire.setting.lap.png)

---
## Manual test

### Navbar

| Tasks                                                                                                               | Yes | No  |
| ------------------------------------------------------------------------------------------------------------------- | --- | --- |
| Click on E-pics home page load.                                                                                     | x   |     |
| Click on home icon, home page load.                                                                                 | x   |     |
| Click on login, forrm login page load.                                                                              | x   |     |
| Click on register, form register page load.                                                                         | x   |     |
| On smaller screen navbar turn to hamburger ican.                                                                    | x   |     |
| click on hamburger icon it will expand.                                                                             | x   |     |
| Hamburger icon expands shows(Home, loin, register) before login.                                                    | x   |     |
| Hamburger icon after login shows(home, user name,logout, then inside arrow\*add post, like posts, album, settings). | x   |     |

---

---

### Search field

| Tasks                                                                       | Yes | No  |
| --------------------------------------------------------------------------- | --- | --- |
| Search bar is displayed on Home page,Liked posts page, and user posts page. | x   |     |
| I can search for image by Users name, title and tags.                       | x   |     |

---

---

### Home Page.

| Tasks                                                                        | Yes | No  |
| ---------------------------------------------------------------------------- | --- | --- |
| Page loads.                                                                  | x   |     |
| post feed has (hart ican,comment icon, and download ican).                   | x   |     |
| If you are not login, you will be able to see the posts only.                | x   |     |
| If you are login, you can like, comment, add post and so on.                 | x   |     |
| Click on hart icon(like the post)count is incremented +1 .                   | x   |     |
| Click again on hart icon same post unlike count is decremented -1 .          | x   |     |
| Click on comment icon, it will take you to the post detail view.             | x   |     |
| Click on download icon, the post will download and count is incremented +1 . | x   |     |
| If you click on your owne avatar image you get dropbar(go to details).       | x   |     |
| pagination, I can choose to have 5, 10, or 20, posts in my home page.        | x   |     |

---

---

### Register page

| Tasks                                                                     | Yes | No  |
| ------------------------------------------------------------------------- | --- | --- |
| Page load.                                                                | x   |     |
| Click on register, form load to create new user.                          | x   |     |
| The form should not be any blank fields.                                  | x   |     |
| Both passwords must match.                                                | x   |     |
| Upload Avatar choose file for img.                                        | x   |     |
| click on Register, successful register you are taken to the sign in page. | x   |     |

---

---

### Login page

| Tasks                                              | Yes | No  |
| -------------------------------------------------- | --- | --- |
| Click on Login, dispaly form for login page.       | x   |     |
| Form shouldnt be blank.                            | x   |     |
| You have sign, and taken to your posts page.       | x   |     |
| After login, the user name displays in the navbar. | x   |     |

---

---

### Add Post page.

| Tasks                                                            | Yes | No  |
| ---------------------------------------------------------------- | --- | --- |
| You should be logged in to access (add post).                    | x   |     |
| Click on add post, page will load with form.                     | x   |     |
| Message from the form will displays if user do a mistake         | x   |     |
| Upload File-Image.                                               | x   |     |
| Submit, your post will be add to your page.                      | x   |     |
| When the form is submitted there is a success toast notification | x   |     |

---

---

### Albums

| Tasks                                                                                             | Yes | No  |
| ------------------------------------------------------------------------------------------------- | --- | --- |
| You must be logged in to access the Albums page.                                                  | x   |     |
| Navigate to the navbar, click the arrow dropdown, and select the Albums page to load it.          | x   |     |
| A form field will be displayed to name your album, along with a button to create it.              | x   |     |
| After creating an album, you can edit or delete it as needed.                                     | x   |     |
| For every action performed, the appropriate message will be displayed in the bottom-right corner. | x   |     |
