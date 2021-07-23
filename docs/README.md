# Connect Recipes

We all know how important food is to all of us. It creates memories with friends and family that will last lifetimes.

For this reason, we felt it important to dedicate this project to the thing we all love... food! We want people to be able to share their recipes with others to connect people across the world, instead of divide, which we've seen a lot of lately.

You'll be able to share your recipes, and save others so you can try them yourself later. What's best, it doesn't cost you a dime to use!

[Feel free to view the live project here](https://connect-recipes.herokuapp.com)!

## UX

This site is designed to give everyone an enjoyable experience when exploring and sharing recipes with others online.

For inspiration, I looked at a number of [Bootstrap Templates](https://bootstrapmade.com/) to get a beautiful front end design. In the end, I settled on using the [Arsha Template](https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/).

#### User Stories:

* First Time Visitor Goals:
    * Easily understand the purpose of the site and why it's important.
    * Quickly learn how to navigate the site and make sure it is intuitively accessible.
    * Visual appeal to have a pleasant first experience.

* Returning Visitor Goals:
    * Be able to login/register so my specific information can be seen
    * Search, save, and create recipes to share with others
    * Create tags so I can categorize my recipes and find others quickly

* Frequent User Goals:
    * Access data via API if I want to use my recipes for my own projects and use Connect Recipes as my database
    * Edit current recipes/profile information
    * Delete recipes I have no need of anymore

#### Design Features Include:

* **Fixed Hero Images** - Striking hero images give the site a uniform and beautiful display.

* **Mobile Menu** - Consolidating the menu down for mobile devices lets it be flexible for device size.

* **Gradual Fade Ins** - The content on the page has gradual fade in transitions so it's appealing to the user.

### Wireframes

* **Desktop** - [View](connect_recipes_desktop.pdf)

* **Tablet** - [View](connect_recipes_tablet.pdf)

* **Mobile** - [View](connect_recipes_mobile.pdf)

## Features

* **AJAX Requests** - AJAX requests allow users to update information on their profile or in a recipe and not have to reload the page to see the result.

* **REST API** - Allows the user to interact with their recipes and other data without the traditional front end website. Link to the docs [here](API_Docs.md).

* **User Registration** - Allows user to store their personal information, and have recipes that they created themselves, along with recipes they saved.

* **Tag Association** - Allows categorization of recipes to be found easier when searching.

* **IMGBB Integration** - Users automatically upload pictures to the Connect Recipes ImgBB account via the requests library in Python and ImgBB API.

## Technologies Used

**Languages Used**

* HTML5
* CSS3
* JavaScript
* Python
* Jinja

**Frameworks, Libraries & Programs Used**

1. [Bootstrap 5.0.1](https://getbootstrap.com/)
    * Bootstrap was used to assist with the responsiveness and styling of the website.

2. [Font Awesome](https://fontawesome.com/)
    * Font Awesome was used on most pages throughout the website to add icons for aesthetic purposes.

3. [Git](https://git-scm.com/)
    * Git was used for version control by utilizing VS Code to commit to Git and Push to GitHub.

4. [GitHub](https://github.com/)
    * GitHub is used to store the project's code after being pushed from Git.

5. [Balsamiq](https://balsamiq.com/)
    * Balsamiq was used to create the wireframes during the design process.

6. [JQuery](https://jquery.com/)
    * JQuery was used to write shorter, simpler Javascript.

7. [Hover.css](https://ianlunn.github.io/Hover/)
    * Hover.css is used to change the text and background color of buttons and links upon hovering over them.

8. [AJAX](https://api.jquery.com/Jquery.ajax/)
    * AJAX was used to make asynchronous requests when editing fields so the database could be updated without the page reloading.

9. [Flask](https://flask.palletsprojects.com/en/2.0.x/)
    * Flask is the web microframework this project is built on.

10. [PyMongo](https://pypi.org/project/pymongo/)
    * The PyMongo library is how this project interacts with the MongoDB where information is housed.

11. [Talisman](https://pypi.org/project/flask-talisman/)
    * The Talisman library is responsible for redirecting traffic from http to https.

12. [MongoDB](https://www.mongodb.com/)
    * MongoDB is used as a cloud database solution to store every piece of data my site uses.

## Testing

I used the W3C Markup Validator, W3C CSS Validator Services, and JSHint to validate every page of the project, and all JS code to ensure there were no major syntax errors in the project.

[W3C Markup Validator](https://validator.w3.org/)
[W3C CSS Validator](http://jigsaw.w3.org/css-validator/)
[JSHint](https://jshint.com/)

### Testing User Stories from UX Section

* First Time Visitor Goals:
    * Easily understand the purpose of the site and why it's important.
        * The homepage has an About section that outlines what the purpose of Connect Recipes is.
    * Quickly learn how to navigate the site and make sure it is intuitively accessible.
        * Intuitive menu along with helpful redirects help users to navigate the site with ease.
    * Visual appeal to have a pleasant first experience.
        * Striking hero images and beautiful fade ins make the project beautiful to look at.

* Returning Visitor Goals:
    * Be able to login/register so my specific information can be seen.
        * Users will be able to register with a unique email and username, so they can view information relevant to them on their profile page.
    * Search, save, and create recipes to share with others.
        * Users are able to search recipes by tags, create their own recipes to be seen by others, and save recipes to be found quickly in their profile later.
    * Create tags so I can categorize my recipes and find others quickly.
        * In the process of creating recipes, users can create their own unique tags if they so choose.

* Frequent User Goals:
    * Access data via API if I want to use my recipes for my own projects and use Connect Recipes as my database.
        * Users can make requests to the Connect Recipes API using their key to access either all of their recipes, or a specific recipe by ObjectId.
        * API responses come back as a string due to Werkzeug limitations.
    * Edit current recipes/profile information.
        * Users can edit every bit of their own recipes, minus the owner.
        * Users can edit every bit of their profile, minus the date registered.
    * Delete recipes I have no need of anymore.
        * Once in their own recipe, there is a delete button at the bottom if they so choose to delete a recipe.

### Further Testing

* The site was tested on a variety of devices from desktop to mobile to tablet. Other devices were simulated through Chrome dev tools.

* Lighthouse was used to test the pages of this site.
    * The weak point is mobile performance, which tops out at a 36. However desktop performance sits around 70. Everything else tests above 90.
    * This is due to the different local CSS and JS libraries involved in the project, such as Semantic UI.

* Browsers used to test include Chrome, Edge, Safari, Opera, and Firefox.

* The Home Page was tested on a variety of different device sizes and it looks great on desktop, tablet, and mobile.

* The login process has been tested and verified. Users are not able to login if they enter an invalid username or password.

* The register process has been tested and verified. User will be stopped from registering if an existing username or email is being used. They will also be stopped if it isn't a valid email, or if the password doesn't meet the data validation rules to do with special characters.

* The search function has been tested and verified. Users can search by tags to return a list of recipes that match said criteria. If they search by no tags, or no match exists, the page will say that no match was found, and prompt them to search again. If they have less than 3 recipes in their result, the user will be prompted to search again at the bottom of the page.

* The add recipe function has been tested and verified. Users can add recipe pictures by getting the URL of a picture that has the file extension .jpg and .png and automatically uploads to the Connect Recipes ImgBB account. The image URL will be stored in MongoDB and used as the src attribute on displaying the recipe. Each field of the add a recipe page has a minimum number of characters and are required for a user to create a recipe. The user can add associated tags, and create their own if they don't see a category they like.

* The Profile page has been tested and verified. Users can add a profile picture the same way that they add recipe pictures, URLs with valid .jpg or .png file extensions. They can edit their names, emails, and usernames. Emails and usernames can not be duplicates to what already exists in MongoDB. User's API key can be used to access their entire recipe database or a specific recipe, based on the endpoint they access shown [here](API_Docs.md). API keys can be regenerated at the user's discretion. The user can view the recipes they created, and the recipes they saved. They can also change their password, provided the passwords they give match.

* The My Recipes page has been tested and verified. The correct list of recipes are returned to the users that they created. Users can also go into the recipes and view more details if they so choose.

* The Saved Recipes page has been tested and verified. The correct list of recipes are returned to the users that they saved.  Users can also go into the recipes and view more details if they so choose.
    * There is a minor bug on iPads where if a user has no saved recipes, a small white space is shown below the footer, but it does not affect the functionality.

* The Change Password page has been tested and verified. Users can't change the password if the passwords they input doesn't pass data validation related to special characters, or if the passwords they put in don't match.

* The Recipe page has been tested and verified. If a user is not the owner of a recipe, they can save or unsave the recipe and have the recipe display in their saved recipes. If the user does own the recipe, then they will be able to edit virtually ever field except for the owner field. Users can delete recipes from this page, and it will also remove the recipe from the list of saved recipes of other users.

* All pages were tested on a variety of different device sizes and it looks great on desktop, tablet, and mobile.

* All links on all pages are tested and operational.

### Known Bugs

* Currently, if a user has no saved recipes, there is a slight whitespace beneath the footer for iPads on the saved-recipes.html page, even though none was there in the Chrome dev tools preview.
    * I suspect it has to do with how Safari handles the project as opposed to other browsers.
    
## Deployment

### Heroku

This project was deployed to Heroku using the steps below:

1. Log into GitHub and locate the [GitHub Repository](https://github.com/StoneMasons4106/connect-recipes).
2. Log into Heroku and create a new Python app.
3. Under deploy, find Deployment method, and select Github.
4. Select the appropriate repository as shown in step one, and select deploy from master.
5. Enable automatic deploys so when a change is pushed to Github, Heroku automatically adopts the new changes.

### Forking the Repository

You can fork the repository and create a copy for yourself in your own account.

1. Log into GitHub and locate the [GitHub Repository](https://github.com/StoneMasons4106/connect-recipes).
2. Locate the Fork button, next to the repository settings button.
3. Go to your repositories, and you should see a copy made for you to edit as you please.

### Local Clone

If you'd like to have a copy on your local machine, follow the steps below:

1. Log into GitHub and locate the [GitHub Repository](https://github.com/StoneMasons4106/connect-recipes).
2. Under the name of the repository, click 'Clone or Download'.
3. Click 'Clone with HTTPS', and copy the link.
4. Open Git Bash on your local computer.
5. Change the directory to where you want the clone located.
6. Type ```git clone``` and paste the URL from step 3.
7. Hit enter. A local clone was now created in the directory you specified.

## Credits

#### Media

* Much of the media was provided by [Pixabay](https://pixabay.com/).

#### Content

* All content was written by the developer.

#### Code

* Implementation of AJAX in the project came mainly from this [Flask Documentation Link](https://flask.palletsprojects.com/en/2.0.x/patterns/jquery/) and [Stack Overflow Link](https://stackoverflow.com/questions/16164604/rest-ajax-request-to-mongodb).

* Checking to see if a string contained special characters via Regex and JS came from this [Stack Overflow](https://stackoverflow.com/questions/32311081/check-for-special-characters-in-string) post.

* Pieces of code were taken from [this article](https://dev.to/mugas/flip-cards-with-javascript-2ad0) to create the recipe cards.

* CSS taken from [CSS Tricks](https://css-tricks.com/how-to-create-a-notebook-design-with-css/) were used to make the recipe page background with lined paper.

* Use of Talisman to redirect to https for Heroku came from this [Stack Overflow](https://stackoverflow.com/questions/15116312/redirect-http-to-https-on-flaskheroku) post.

#### Acknowledgments

* My mentor for continuous and helpful support/design suggestions.