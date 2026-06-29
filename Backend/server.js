const express = require("express")
const secretsDbPath = "../Database/secrets.json"
const usersDbPath = "../Database/users.json"
const fs = require("fs")

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
    // 1. first we need to read the data to actually get the data
    // 2. And in the next step we can then edit the data and put it back in our file 
    var usersFile = fs.readFileSync(usersDbPath,"utf-8")
    var usersObject = JSON.parse(usersFile)
    usersObject[username] = password
    fs.writeFileSync(usersDbPath, JSON.stringify(usersObject), "utf-8")
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