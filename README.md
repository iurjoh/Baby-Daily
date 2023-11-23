# Baby Daily - Smiles, steps and stories. Daily!

Baby Daily is a website designed to be responsive that allows users to create their posts just like on a social network, but privately, with access restricted to registered family and friends. This way, parents can feel safer posting photos, wish lists, marking tasks, leaving comments, liking posts, among other functions, and sharing all of this within their private circle.

![Baby Daily](./frontend/src/assets/site.JPG)

Visit the site [here](https://iurjoh-baby-daily-backend-api-1674476236b8.herokuapp.com/)

## CONTENTS

* [User Experience (UX)](#User-Experience-(UX))
  * [Initial Discussion](#Initial-Discussion)
  * [User Stories](#User-Stories)

* [Design](#Design)
  * [Colour Scheme](#Colour-Scheme)
  * [Typography](#Typography)
  * [Features](#Features)
  * [Accessibility](#Accessibility)

* [Technologies Used](#Technologies-Used)
  * [Languages Used](#Languages-Used)
  * [Frameworks, Libraries & Programs Used](#Frameworks,-Libraries-&-Programs-Used)

* [Deployment & Local Development](#Deployment-&-Local-Development)
  * [Deployment](#Deployment)
  * [Local Development](#Local-Development)
    * [How to Fork](#How-to-Fork)
    * [How to Clone](#How-to-Clone)

* [Testing](#Testing)
  * [W3C Validator](#W3C-Validator)
  * [Solved Bugs](#Solved-Bugs)
  * [Known Bugs](#Known-Bugs)
  * [Testing User Stories](#Testing-User-Stories)
  * [Lighthouse](#Lighthouse)
    * [Index Page](#Index-Page)
    * [Books Page](#Books-Page)
    * [Contact Us Page](#Contact-Us-Page)
    * [Thank You Page](#Thank-You-Page)
  * [Full Testing](#Full-Testing)
  
* [Credits](#Credits)
  * [Code Used](#Code-Used)
  * [Content](#Content)
  * [Media](#Media)
  * [Acknowledgments](#Acknowledgments)

- - -

## User Experience (UX)

### Initial Discussion

Baby Daily is a secure online platform designed exclusively for parents to share precious moments, updates, and create a private community with family and friends. Users can post photos, create wish lists, mark tasks, leave comments, like posts, and more, all within their trusted and private circle.

#### Key Information for the Site:

* Safe interactions between parents and their friends and family.
* Space for comments on each photo.
* Like each of the cutest photos and keep your likes list updated.
* A task list for users to track their baby's milestones and activities.
* Parents' wish list with useful products for the baby.
* User area with your photo, brief profile description, your posts, followers and followings

### User Stories

All User Stories were efficiently organized within the Kanban board available within GitHub itself where the project can be publicly accessed. Strategically all stories were prioritized using MoSCoW technique (acronym MoSCoW stands for “must-have,” “should-have,” “could-have,” and “won't-have"). The Kanban board was divided into three sections to oversee different phases of the project:

* To do: This item hasn't been started yet.
* In Progress: This item is actively being worked on in the Backend and/or Frontend.
* Done: All tasks have been completed.

Here is a list of all my User Sotories create for this project:

* View post list: As a **Site User** I can **view a list of posts** so that **I can select one to view and interact**
* Open a post: As a **Site User** I can **click on a post** so that **I can open it and interact**
* View likes: As a **Site User / Admin** I can **view the number of likes on each post** so that **I can see which is the most popular or viral**
* View comments: As a **Site User / Admin** I can **view comments on an individual post** so that **I can read the conversation**
* Account registration: As a **Site User** I **can register an account** so that **I can get access to all functions like post, comments and others**
* Comment on a post: As a **Site User** I can **leave comments on a post** so that **I can be involved in the conversation**
* Like/Unlike: As a **Site User** I can **like or unlike an another user's post** so that **I can interact with the content**
* Manage posts: As a **Site Admin** I can **create, read, update and delete posts** so that **I can manage all posted content**
* Site pagination: As a **Site User** I can **view a paginated list of posts** so that **easily select a post to view**
* Create post: As a **Site User** I can **create a new post when I am logged** so that **I can create new content**
* Edit post: As a **Site User** I can **edit a post when I am logged and be the owner** so that **I can edit a posted content**
* Delete post: As a **Site User** I can **delete a post when I am logged and be the owner** so that **I can delete a posted content**
* View task list: As a **Site User** I can **view a list of tasks** so that **I can select one to view and interact**
* Create task: As a **Site Admin** I can **create a new task when I am logged** so that **I can create new tasks to task list**
* Edit task: As a **Site Admin** I can **edit a task when I am logged** so that **I can edit a task from task list**
* Delete task: As a **Site Admin** I can **delete a task when I am logged** so that **I can delete a task from task list**
* View wish list: As a **Site User** I can **view a list of wishes** so that **I can select one to view and interact**
* Create wish: As a **Site User** I can **create a new wish when I am logged** so that **I can create new wishes to wish list**
* Edit wish: As a **Site User** I can **edit a wish when I am logged and be the owner** so that **I can edit a wish from wishes list**
* Delete wish: As a **Site User** I can **delete a wish when I am logged and be the owner** so that **I can delete a wish from wishes list**
* User profile: As a **Site User** I can **edit my own profile** so that **I can update my photo, description and other details**

![User stories](./frontend/src/assets/user%20stories.JPG)

- - -

## Design

### Colour Scheme

I tried to use colors based on shades of blue that evoke a newborn. Calm and light colors, which reflect tranquility and security, conducive to this website.
 
![Coolors](./frontend/src/assets/coolors.jpg)

### Typography

The font DM Sans, from Google Fonts and linked to San Serif family, was chosen because it is accessible friendly and has a clear and modern style, easy to read and good layout.

I also like to include an image of the fonts chosen as a reference.

![Font](./frontend/src/assets/font.JPG)

## Features

* Sign Up form: User-friendly form for new users to register and create an account on the platform.
* Sign In form: Secure login interface allowing registered users to access their accounts.
* Comments page: Centralized space displaying comments on various posts, facilitating user engagement.
* Comments create/edit form: Interactive form enabling users to create or modify comments on posts.
* Post page: Dedicated page showcasing individual posts, containing user-generated content.
* Posts page: Dedicated page showcasing all posts, in an infinite scrolling screen.
* Post create/edit form: User-friendly form allowing the creation or modification of posts with associated content.
* Profiles page: Overview of user profiles, providing a snapshot of individual users and their details.
* Popular profiles: Curated list highlighting the most active or influential profiles on the platform.
* Profile edit form: Customizable form enabling users to edit and update their profile information.
* User name form: Form specifically designed for users to set or modify their displayed username.
* Profile page: Comprehensive view of an individual user's profile, aggregating their posts and activities.
* Tasks list page: Centralized view presenting a comprehensive list of tasks, providing an overview of ongoing and completed activities.
* Task create/edit form: User-friendly form facilitating the creation or modification of tasks, ensuring efficient task management.
* Wish list page: Dedicated page displaying a curated collection of user-generated wish lists, offering insights into parents wish list preferences for the baby.
* Wish list create/edit form: Interactive form empowering users to create or edit personalized wish lists, enhancing the user experience in expressing desires and preferences.
* Assets: Tool used in "Add post" for multimedia elements, images, and text used to enhance the visual and interactive aspects of a new post.
* MoreDropDown: Dropdown menu providing additional options or features beyond those readily available, offering a compact and organized navigation experience.
* NavBar: Navigational bar at the top of the page, serving as a visual guide for users to access different sections or features of the platform seamlessly.
* Page not found: Customized page displayed when a user attempts to access a non-existent or unavailable page, providing a clear and user-friendly message indicating the unavailability of the requested content.

### General features on each page

If there is a feature that appears on all pages of your site, include it here. Examples of what to include would the the navigation, a footer and a favicon.

I then like to add a screenshot of each page of the site here, i use [amiresponsive](https://ui.dev/amiresponsive) which allows me to grab an image of the site as it would be displayed on mobile, tablet and desktop, this helps to show the responsiveness of the site.

### Future Implementations

What features would you like to implement in the future on your site? Would you like to add more pages, or create login functionality? Add these plans here.

### Accessibility

Be an amazing developer and get used to thinking about accessibility in all of your projects!

This is the place to make a note of anything you have done with accessibility in mind. Some examples include:

Have you used icons and added aria-labels to enable screen readers to understand these?
Have you ensured your site meets the minimum contrast requirements?
Have you chosen fonts that are dyslexia/accessible friendly?

Code Institute have an amazing channel for all things accessibility (a11y-accessibility) I would highly recommend joining this channel as it contains a wealth of information about accessibility and what we can do as developers to be more inclusive.

- - -

## Technologies Used

👩🏻‍💻 View an example of a completed Technologies Used section [here](https://github.com/kera-cudmore/Bully-Book-Club#Technologies-Used)

### Languages Used

Make a note here of all the languages used in creating your project. For the first project this will most likely just be HTML & CSS.

### Frameworks, Libraries & Programs Used

Add any frameworks, libraries or programs used while creating your project.

Make sure to include things like git, GitHub, the program used to make your wireframes, any programs used to compress your images, did you use a CSS framework like Bootstrap? If so add it here (add the version used).

A great tip for this section is to include them as you use them, that way you won't forget what you ended up using when you get to the end of your project.

- - -

## Deployment & Local Development

👩🏻‍💻 View an example of a completed Deployment & Local Development section [here](https://github.com/kera-cudmore/TheQuizArms#Deployment)

### Deployment

Include instructions here on how to deploy your project. For your first project you will most likely be using GitHub Pages.

### Local Development

The local development section gives instructions on how someone else could make a copy of your project to play with on their local machine. This section will get more complex in the later projects, and can be a great reference to yourself if you forget how to do this.

#### How to Fork

Place instructions on how to fork your project here.

#### How to Clone

Place instructions on how to clone your project here.

- - -

## Testing

Start as you mean to go on - and get used to writing a TESTING.md file from the very first project!

Testing requirements aren't massive for your first project, however if you start using a TESTING.md file from your first project you will thank yourself later when completing your later projects, which will contain much more information.
  
Use this part of the README to link to your TESTING.md file - you can view the example TESTING.md file [here](milestone1-testing.md)

- - -

## Credits

👩🏻‍💻 View an example of a completed Credits section [here](https://github.com/kera-cudmore/BookWorm#Credits)

The Credits section is where you can credit all the people and sources you used throughout your project.

### Code Used

If you have used some code in your project that you didn't write, this is the place to make note of it. Credit the author of the code and if possible a link to where you found the code. You could also add in a brief description of what the code does, or what you are using it for here.

### Content

Who wrote the content for the website? Was it yourself - or have you made the site for someone and they specified what the site was to say? This is the best place to put this information.

###  Media

If you have used any media on your site (images, audio, video etc) you can credit them here. I like to link back to the source where I found the media, and include where on the site the image is used.
  
###  Acknowledgments

If someone helped you out during your project, you can acknowledge them here! For example someone may have taken the time to help you on slack with a problem. Pop a little thank you here with a note of what they helped you with (I like to try and link back to their GitHub or Linked In account too). This is also a great place to thank your mentor and tutor support if you used them.

Image of the finished site: [amiresponsive](https://ui.dev/amiresponsive)