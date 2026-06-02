We are following a pattern of one file one task only. That means one file is responsible for only 1 task not other stuff will be written inside it like --

* In Index.ts we are only defining app and using it to define middleware and routes only. 
* In server.ts we are only defining the method to start a server. For that we first import app from index.ts and then we will use it to start the server using app.listen().
* Still in server.ts there will be one problem if we directly try to start the server which is as u can see that in server.ts we are also connecting to DB if we dont write await connectDB then what will happen is it will detect connectDb function as async and send it to background and start running the app.listen. But its not ideal because we want server to start only when DB connection is done. so that is why we use await before that function. And we cannot declare await without an asyn function. So thats why declared that async function.


* env.ts -- So normally to import env values we have to do process.env.Variable_name but that is long thing so instead we just import all of it in env.ts file and set that if value is empty then what should be the value and later on we can just use it using env.Variable_name


* Db.ts -- for db connection

* ApiError.ts -- for custom error handling. We created this file only to create a custom error because defualt error contains only message not a status code and we want to pass the statuscode when some error comes. So in this file we inherit everything from Error and add one extra field called status code.

* Error Middleware -- In this we just create a middleware of error so the flow goes like req comes -> it goes to the route->route detects error and passed throws that error. Now instead of doing Throw new Error() we do Throw new ApiError(). Notice we used custom error handler for it. Now next when it detects the error it will be caught by the errorMiddleware which will process it and return the error to user.

* AsyncHandler -- So here what happens is our normal route is basically an async function so when we try to throw an error inside async fnc then it will not be caught properly as it is async so what we do is we use try/catch block. But if we have multiple routes then we have to write try/catch thing on every route so better way is to create a wrapper function which will contain our async function and do the Promise.resovleThing and return us the error

* auth.controller.ts -- Defined registerUser and loginUser logic here. In register user we just take all the details from user and hash the password and then store it in DB. In Login User we will take email and password and first compare the password with the hashed one in db and then if it is correct then we generate a jwt token for it and return it to the user.