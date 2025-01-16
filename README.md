# E-pics
-----------
## Introduction
 E-pics is a platform designed for photo enthusiasts who want to share their images with others. Users can not only upload their own photos but also download any images available on the site.

The goal is to foster a vibrant sharing community where you can either contribute by uploading your photos or simply browse and appreciate the creations of others.

Additionally, you can connect with the community by leaving comments, giving likes, or organizing your favorite posts into private albums for easy access.
------
![image](/readme.img/den-featured.avif)
------
------------
## Table of Contents
-------
## User Profiles 
- The casual user finds joy in browsing through captivating photos as a way to unwind and draw inspiration. They appreciate discovering fresh photography styles and occasionally download images for personal use. The convenience of saving their favorite photos into albums for easy access later is something they highly value.The amateur photographer enjoys sharing their work with others to gather feedback.
They find satisfaction in observing how their creations are received and take pride in contributing to a creative community. The platform makes it simple for them to upload their work and gain exposure.
Being able to organize their own content and explore others' creations in albums is a significant perk.
The enthusiast loves collecting and organizing photos. They take pleasure in curating their collections,
showcasing them to family and friends. A seamless process for adding albums and posts is essential,
as they frequently log in to explore, download, and refine their private collections.
------
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
------
## Features
### Home Page
- E-Pics Branding: Displays the application title prominently at the top for clear identification.
- Navigation Bar:
Includes options to navigate to the Home, Login, and Register pages for quick access.
- Search Functionality:
A search bar allows users to search posts by keywords like Users, Titles, or Tags for quick filtering and navigation.
- Post Display Individual Post Card:
Shows a large image preview of the post.
Includes the title, Description or tag for the post.
- Post Actions: Like Button: Allows users to like a post, with a heart icon and the count of likes displayed.
- Comment Button: Enables users to comment on the post, with the count of comments displayed.
- Download Button: Provides an option to download the post content, with the download count displayed and valid date is associated with the post.
- Pagination: Pagination controls allow users to navigate through posts, displaying items per page (default is 5).
- Navigation includes:
  - Items per page dropdown.
  - Buttons for "First", "Previous", "Next", and "Last" pages.


### Add Post Page
- Home Button: Quickly returns to the main dashboard.
- Navigation Menu.
  - Dropdown menu next to the user’s name.
    - Add Post, Liked Posts, Albums, Settings.
- Form for Adding New Posts.
  - Title Input Field:
    - Placeholder: "Enter post title."
    - Placeholder: "Enter post description."
    - Placeholder: "Enter tags"
    - Users can upload a file or image related to their post.
Includes a "Choose File" button for selecting the file.
Displays "No file chosen" by default when no file has been uploaded.
    - A Submit button with a visually distinct style (purple).
### Albums Page
Page Description:
- Provides a clear explanation of the functionality: "Here you can create albums, add images to them, and view your albums sorted with your favorite photos."

Create New Album:
- Users can input a title for their new album.
- Create Button:
A visually distinct purple button to create a new album.
- Displays existing albums as separate cards.

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



------
## Design 

### Wireframes
------
## Manual test
 ### Navbar
|  Tasks |  Yes | No  |
|---|---|---|
|  Click on E-pics home page load. | x  |   |
|  Click on home icon, home page load. | x   |   |
|  Click on login, forrm login page load. | x   |  |
|  Click on register, form register page load.| x  | |
| On smaller screen navbar turn to hamburger ican.| x |   |
| click on hamburger icon it will expand. | x |  |
| Hamburger icon expands shows(Home, loin, register) before login. | x|  | 
|Hamburger icon after login shows(home, user name,logout, then inside arrow*add post, like posts, album, settings). | x |  |
-------------
-------------
### Search field
| Tasks  | Yes  |  No |
|---|---|---|
| Search bar is displayed on Home page,Liked posts page, and user posts page.  |  x |   |
|I can search for image by Users name, title and tags. | x  |   |
----------
----------
### Home Page
| Tasks  | Yes  |  No |
|---|---|---|
| Page loads.  | x  |   |
|  post feed has (hart ican,comment icon, and download ican). |x |   |
| If you are not login, you will be able to see the posts only. | x | |
| If you are login, you can like, comment, add post and so on. | x | |
| Click on hart icon(like the post)count is incremented +1 .  | x  |   |
|  Click again on hart icon same post unlike count is decremented -1 . |  x |   |
| Click on comment icon, it will take you to the post detail view.  | x  |   |
| Click on download icon, the post will download and count is incremented +1 . | x  |   |
| If you click on your owne avatar image you get dropbar(go to details).| x | |
|pagination, I can choose to have 5, 10, or 20, posts in my home page.| x | |
--------
--------
### Register page

| Tasks  | Yes  |  No |
|---|---|---|
| Page load.| x | |
|Click on register, form load to create new user.| x ||
|The form should not be any blank fields.| x ||
| Both passwords must match. | x | |
|Upload Avatar choose file for img.| x ||
| click on Register, successful register you are taken to the sign in page.| x ||
-------
-------
### Login page
| Tasks  | Yes  |  No |
|---|---|---|
|lick on Login, dispaly form for login page. | x ||
| Form shouldnt be blank.| x ||
| You have sign, and taken to your posts page. | x||
| After login, the user name displays in the navbar.| x||
-------
-------
### Add Post page
| Tasks  | Yes  |  No |
|---|---|---|
| You should be logged in to access (add post). | x||
|Click on add post, page will load with form.| x ||
| Message from the form will displays if user do a mistake | x||
|Upload File-Image.| x ||
|Submit, your post will be add to your page.| x ||
|When the form is submitted there is a success toast notification| x ||
------
------
### Albums 
| Tasks  | Yes  |  No |
|---|---|---|
|You must be logged in to access the Albums page. | x ||
|Navigate to the navbar, click the arrow dropdown, and select the Albums page to load it.| x ||
|A form field will be displayed to name your album, along with a button to create it. | x ||
|After creating an album, you can edit or delete it as needed. | x ||
|For every action performed, the appropriate message will be displayed in the bottom-right corner.| x | |