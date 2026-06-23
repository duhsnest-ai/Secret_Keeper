const express = require("express")

const app = express()

app.use(express.json())

app.get("/", function(request, response){
    response.sendFile("C:/Users/mihir/OneDrive/Desktop/Classes/Duke Backend Classes/Secret Keeper/Frontend/index.html")
})

app.get("/secretDetails", function(request, response){
    response.sendFile("C:/Users/mihir/OneDrive/Desktop/Classes/Duke Backend Classes/Secret Keeper/Frontend/secretDetails.html")
})

app.post("/signUp", function(request, response){
    var username = request.body.user
    var password = request.body.pass
    //store in a DB
})

app.post("/signIn", function(request, response){
    var username = request.body.user
    var password = request.body.pass
    //we need to check if this username and password is already there in the Database.
})

app.post("/submit", function(request, response){
    var username = request.body.username
    var age = request.body.age
    var secret = request.body.secret
    //The first step is finding the username in our database
    //The second step is storing the age and the secret wrt the username
})

app.listen(80, function(){
    console.log("The server has started")
})