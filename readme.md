# Term 3 JS Project : Birthday App

Hey team! So the final project here will be a birthday list.

We have a list of persons. The app will show us whose person is the closest to have their birthday.

You have a file in the project called person.json. It contains a list of persons, and we want to add all those persons to our birthday list app.

The first time you launch the app, it should fetch all the data from the people.json local file. You can use fetch for that, it also works with local files.

Once they are loaded in the app, you can save them on localstorage, and you don't need to work with the json file anymore.

The app will show the list of people, sorted by the ones who will have their birthday the soonest.

![assets/Screenshot_2020-09-12_at_16.57.18.png](assets/Screenshot_2020-09-12_at_16.57.18.png)

The screenshot is just an example of a possible layout. Feel free to create a custom layout with boostrap if you want to.

The users will be able to add a new element on the list (only on the app list localstorage, not on the json). Here are the fields :

-   first name
-   last name
-   birthday (datepicker)
-   an url for their avatar image
-   an id for handling the operations on the objects. (no need to add that on the form)

The users should be able to edit an element on the list. When you click the edit button, a modal should appear with a form inside, to edit any attribute.

The users should be able to delete an element. There will be a modal that will ask if you're sure to delete the element.

Every action should be persisted into the local storage.

Here is the package you should use for handling date computations. Add it as a dependency of your project

[https://date-fns.org/v1.29.0/docs/differenceInYears](https://date-fns.org/v1.29.0/docs/differenceInYears)

Again, try to make a plan, by dividing big tasks into smaller ones.
You have the whole week to work on it. You can collaborate with other students, but copy/pasting code is forbidden.
Once you're finished with the functionality, try to make your app more appealing with css and other tricks.
Be creative 🎨

Good Luck


## Import report :
### 1) In a few sentences, explain the structure of your project.
add an html on the file of the html.
Add  html in the html file:

 I have created one function which names is getData and I put all of my work on it. There  are 
9 function on it. 

Firstly , I fetch the “people.json” and create an  empty array . After that there is a function which contains sort() and map() the empty array. 

Then ,  the third function is about how to get the input from the add button  from the html.
After that I created a function which name is destroyPopup .It is about removing the open modal. 

Following the third function, there are two functions , they are about editing people's birthdays . I use find() to find the id of each person. I created a html on the function to show the edit input with submit button and cancel button.. 

Then two functions are about deleted tr , I use filters to get the people array. 

When everything is finished I put them in localStorage.

### 2) If you had more time, what area of your project would you improve?
I would like to continue my code because I want to work on the date of people’s birthday.

### 3) Did you learn anything new while working on this project?
 I have learn how to pass the argument and when should I pass it.
 I understood a little bit about promises but I am not really there yet.
 
### 4) What was the most challenging part for you?

 I was really struggling on the editing and deleting of the **<****tr****>**.

### 5) Would you like a new explanation about a specific topic?
 
I woould like if you can explain more about the Promise.

## 6) Any other comments?
Everyting is Ok.



