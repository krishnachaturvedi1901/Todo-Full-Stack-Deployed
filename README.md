# NEM-MERN-TODO-EVAL
- Create a Todo app using MERN stack.
- It should be a multi user app where multiple users can have their own multiple todos.
- Take care of Authentication - Only logged in users should be able to do any of the CRUD actions.
- Each Todo created by a user, should at least have - taskname, status(pending,done), tag(personal, official, family)
- For example,
```
taskname - Take haircut,
status - pending,
tag - personal

```
- Store the data in Mongo Database (use Atlas)
- Establish relationship so that a user is able to Read, Update and Delete only his/her tasks.
- In user collection, apart from the user details like email, password etc, store the user's IP Address too.
- Users should be able to update any of only their todos - modify taskname/change status/change tag etc.
- Users should be able to delete any of only their todos.
- User should be able to see all but only his/her todos and also as per filter, see below :
  * /todos - should give all todos
  * /todos?status=pending - should give only those todos which are pending, and same for status=done
  * /todos?status=done&tag=personal - should give all todos which are 'done' and have 'personal' tag.     Similarly, for all other possible combinations.
  * /todos/:todoID - should give only the todo with the matching ID and only if it belongs to that user.
- Mandatorily - Take care of all good practices like send status codes, MVC structure, encrypt passwords, use jwt for token etc
### Frontend
- Create a React app, where a user can signup/login using the API created above.
- Once logged in, redirect the user to "Todos" page.
- In the "Todos" page, a user should be able to see all his todos.
- A user should be able to create a new todo, update and delete a todo.
- Have a filter in UI, to filter todos by status, tag etc - and use the right API end points to get filtered data from backend.
- Deploy Backend on heroku/render/railway/cyclic etc, Frontend on netlify/vercel/github pages etc.