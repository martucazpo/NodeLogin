##Node Login

Node login is from a login tutorial. It was made with an empty array instead of a database. The original program, called[Passport Node Login System](https://www.youtube.com/watch?v=-RCnNyD0L-s&t=15s), is from [Web Dev Simplified](https://www.youtube.com/watch?v=-RCnNyD0L-s) and uses bcryptjs, express, passport and ejs.

Since intially deploying this login, I have gone back and restyled it based on another Web Dev Simplified tutorial called ["Transparent Login Form"](https://www.youtube.com/watch?v=nLxA9froMOs). I used the tutorial to style the initial login, adjusting where necessary, using the modified the code for the registration and index views. The background images are from [Unsplash](https://unsplash.com/). The cherry blossom picture is by [Narubono](https://unsplash.com/@narubono), the purple flowers are by [Eddie Howell](https://unsplash.com/s/photos/howell), and the jellyfish are by [Zetong Li](https://unsplash.com/s/photos/zetong-li). In addition I changed the file structure so that the routes are out of the server and the script is in a separate file. 
 
 The program opens on the login:
 ![Login](public/images/forreadme/aonopening.png)

Since I am not registered (and there is no database), I have clicked on the registration link, gone to the registration page, and registered as "C":
![Register](public/images/forreadme/bregister.png)

Once registered the I am redirected back to the login page where I attempt to enter a wrong email:
![WrongEmail](public/images/forreadme/cwrongemail.png)

This time I enter the correct email, but a wrong password:
![WrongPassword](public/images/forreadme/dwrongpassword.png)

Here I have entered everything correctly (and am rewarded with the message "Hi C"):
![Success](public/images/forreadme/esuccess.png)

The is the user object in the terminal; the password is hashed:
![Hashedpassword](public/images/forreadme/fuserinterminal.png)

Upon logging out I am redirected to the login page:
![Logout](public/images/forreadme/gloggedout.png)

 This is a very simple login system and I enjoyed it as a learning tool. Thanks Web Dev Simplified!

 This app is deployed on heroku at: [DeployedApp](https://vast-stream-09563.herokuapp.com/login)