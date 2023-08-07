# Ye Quan's URL-Shortener

## Table of contents

- [Description](#description)
- [Screenshots](#screenshots)
- [Technology](#technology)
- [Setup](#setup)

## Description
<p>✅ Enabled user authentication with password using salting and hashing</p>
<p>✅ Manage user sessions using JWT (expires in 5 minutes)</p>
<p>✅ User able to Add/View/Delete URLs</p>
<p>✅ Different users shortened URLs are different even if request is the same</p>

## Screenshots (Web and Mobile Views)

### Login Page
![URL Shortener - Login Page](https://i.imgur.com/1i9nSdC.jpg)
<p>
    <img src="https://i.imgur.com/8YOtwm5.jpg" width="24.5%" height="400px">
</p>

### Register Page
![URL Shortener - Register Page](https://i.imgur.com/1AUiIVz.jpg)
<p>
    <img src="https://i.imgur.com/ItgFC5k.jpg" width="24.5%" height="400px">
</p>

### Shorten URL Page
![URL Shortener - Shorten URL Page](https://i.imgur.com/w4tAQKC.jpg)
<p>
    <img src="https://i.imgur.com/R0jl69t.jpg" width="24.5%" height="400px">
</p>

### Saved URL Page
![URL Shortener - Saved URL Page](https://i.imgur.com/xa7NUsr.jpg)
<p>
    <img src="https://i.imgur.com/Q2xAuwH.jpg" width="24.5%" height="400px">
</p>

## Technology

- Reactjs
- Nodejs
- Expressjs
- MongoDB
- TailwindCSS
- Jest

## Setup

Ensure docker is installed in your local machine

1. Git clone repository to local machine
2. Go into the server directory and create a .env file with the following configurations

```
ATLAS_URI="mongodb+srv://yequantan25:duO7o68Ma127W0gT@cluster0.hf3fnmu.mongodb.net/?retryWrites=true&w=majority"
PORT=8080
JWT_TOKEN_SECRET="eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5MTIwOTk0NCwiaWF0IjoxNjkxMjA5OTQ0fQ.DXWo3VnxVVewuW38vCNwzyYXdjYeAlnbS7JKDJL2ajw"
BASE_URL="http://localhost:8080"
```

3. Start the app with the app with the following code
```
docker-compose up
```

Once the services are up, you can view the app at http://localhost:3000/
