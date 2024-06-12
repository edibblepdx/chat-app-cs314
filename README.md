# Chat App
By Andres Gutierrez Bravo & Ethan Dibble

![image](https://private-user-images.githubusercontent.com/146913704/338780370-2f54b1a6-b0dc-496e-b2ce-97786df525fd.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTgxNTE1MDQsIm5iZiI6MTcxODE1MTIwNCwicGF0aCI6Ii8xNDY5MTM3MDQvMzM4NzgwMzcwLTJmNTRiMWE2LWIwZGMtNDk2ZS1iMmNlLTk3Nzg2ZGY1MjVmZC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNjEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDYxMlQwMDEzMjRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iODRmNTA2YzE0Y2I3OTM1OTlhMGJkM2I5MzE1NzllOWZlY2QwMWUzNzU0NjY1NjNmMWMyNmE0NzE4MjI5MzVkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.rQemr4aKAb3KHuMDpFvAfyKLzYIy6IbH8qf9YL7Xr5c)

### Setting up on localhost
Navigate to the root directory then run the following scripts:
```
./setup.sh
```
```
./start.sh
```
send Ctrl+C to stop all services <br />

### Description
This chat app is able to give users a responsive, effective, and overall great experience.
It supports real time communication between multple users to fulfill all user's needs.
There are a number of features that this chat application supports: <br /> 
<br />
    -Real time Communication <br /> 
    -Authentication <br />
    -Registration <br />
    -Data Encryption <br />
    -Creating Group Chats <br />
    -Adding Users to your group chat <br />
    -Deleting Group Chat <br />
    -Leaving Group Chat <br />
<br />
Creating the User Interface took inspiration from various popular applications but a simple
design overall goes a long way.

### Implementation
The frontend of our chat app revolved around React. With React we were able to create a more
fluid and interactive UI with its UseEffect, and UseState function to give fast updates based
on Real time change to the application. Since our goal was to make our chat app as fast as 
possible, using real time communication with Socket.io and React allowed us to create such features.
The app contains four different pages: home, chats, Register, and Login. The Home page introduces
our chat app as it is the default page. The Register Page allows the user to register into the
system by entering a name, email, and password. After successfully registering, the login page
will let the user enter their email and password to start using our chat app. When login is
successful, the user will be directed to the chat page where they are able to create chats and
start using the app to its full potential.

The Backend was implemented by splitting it into two microservices: a user service and a chat
service. Each service maintains it's own MongoDB database and uses direct communication to get 
the data that it needs. The User Service handles user authentication. Each user is stored into 
the MongoDB database with an associated name, hashed password, and email. Emails are unique,
but names may overlap, passwords are salted, so two users with the same password store a different
value. Each user has a unique Id which allows the app to distiguish between each user and allow a 
safe method of authentication. The Chat Service has two collections in its database. One is for 
chats and the other messages. Each Chat has its own id that is assigned when it gets created; 
It also stores the id of all messages were sent in that chat, the id of all users, the id of the 
user that created it for administration purposes, and of course the name of the chat. For each 
message that is created, it has a unique id, an id for the user that sent it, the user's name, 
the message itself, and a time stamp of when it was created. These models are essential to create 
a satisfactory chatting experience. Each of these services are independently deployable.

### Testing
To test our application we decided that testing with interactions and user stories was going to be 
sufficient to know that our app works as intended. Here is an example user story that we used to
test our application as a system:

Kyle, age 34, is a High school teacher at Aloha High School and is relatively new to the district. 
Kyle likes to do things his way while still trying to be efficient to match the norms. He structures 
his class with the intent of giving students a bit of wiggle room of how they want to communicate with 
each other and invited the class members to a chat room. 
Since a new school term is starting Kyle had made a new room for the incoming class and invited 
everyone already. Kyle has an existing account so he clicks on the login button on the navbar and 
enters his existing email and password. He is then redirected to the chat window. His old class 
chat room from the previous term is still open so he clicks on the chat name in the sidebar to 
render the window then selects the delete chat button available to the admin. Kyle also has to remove 
the students from the new chat room that recently dropped the class, so he clicks on the current term 
chat room and removes the students no longer enrolled by clicking a red x next to their name. Kyle is
done so he clicks the logout button on the navbar and is redirected to the login page.
