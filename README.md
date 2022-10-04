
1- Created mainly to implement new object tools in node js and express(server) and also in the web browser (client side.)<br>
2- Basic usage of socket.io in a chat service<br>
3- Implementation of classes in web browser using ES6 technologies which allows to do the same as using a bunch of modules in node but
   without the need of that.<br>
4- It uses MongoDB as a NOSQL DATABASE and the idea is to keep everything under javascript.<br>

   WHAT IS THE APPLICATION
   <hr>
   
1- After registration you may create POSTS that can be share with FOLLOWERS.<br>
2- There is a collective chat that can be extended for individual comunication if minor changes are applied.<br>
3- It has a basic API to connect with MongoDB in case you wish to implement in your own app.<br>

   API
   <hr>
   
1- Request access for username/password:<br>
    {{mainUrl}}/login<br>
    
    In body send json content (POST):
    {
      "username":"youruser",
      "password":"yourpass"
    }
    
    This will return a token:<br>
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA1NWQwZDlhMWU4MDkzYmMwNjNhZTMiLCJpYXQiOjE2NjQ4OTU3MDQsImV4cCI6MTY2NzQ4NzcwNH0.cUn1Tl3Z2oi1qyfC-_2wBP8hwhCMu458IstMnFcMv_U"
    }
    
 2- To create a new post:<br>
    
    In body send json content (POST):
   
    {
      "title": "API created post",
      "body": "this is an api created post",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA1NWQwZDlhMWU4MDkzYmMwNjNhZTMiLCJpYXQiOjE2NjQ1NTE2MjgsImV4cCI6MTY2NzE0MzYyOH0.zrSmt6ZELGAnHHPyb-6WQTsOvdeDYMp8hJNf7EyQqwE"
    }
    
    This will return: <br>
    "success"<br>
    
    If POST is created.
    
    There is also options for DELETE and postsBYAuthorId
   
 Sample App: <a href="https://complextodoapp.herokuapp.com/" target="_blank" >OurApp | Sign In </a>
    
    
    
