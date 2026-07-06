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

    // One of the steps that we need to do here is check if that same username is there in our database and if it is not there then we sign them up and if it is there then we give them a response which says the username already exists 

    var usersFile = fs.readFileSync(usersDbPath,"utf-8")
    var usersObject = JSON.parse(usersFile)
    if(username in usersObject){
        response.send("Username is already taken")
    }
    else{
        usersObject[username] = password
        fs.writeFileSync(usersDbPath, JSON.stringify(usersObject), "utf-8")
        response.send("The account has been successfully created")
    }
    
})

app.post("/signIn", function(request, response){
    var username = request.body.user
    var password = request.body.pass
    //we need to check if this username and password is already there in the Database.
    var usersFile = fs.readFileSync(usersDbPath,"utf-8")
    var usersObject = JSON.parse(usersFile)
    if(username in usersObject){
        var value = usersObject[username]
        if(value == password){
            response.send("Successful login")
        }
        else{
            response.send("The password did not match")
        }
    }
    else{
        response.send("User does not exist")
    }
})

app.post("/submit", function(request, response){
    var username = request.body.username
    var age = request.body.age
    var secret = request.body.secret
    //The first step is finding the username in our database
    //The second step is storing the age and the secret wrt the username
    var secretsFile = fs.readFileSync(secretsDbPath,"utf-8")
    var secretsObject = JSON.parse(secretsFile)
    if(username in secretsObject){
        secretsObject[username][0] = secret 
        secretsObject[username][1] = age
    }
    else{
        secretsObject[username] = [secret, age]
    }
    fs.writeFileSync(secretsDbPath, JSON.stringify(secretsObject))
    response.send("Successfully saved")
})

app.get("/secret", function(request, response){
    // We will send response and the response will be the secret and the age.
    //First actually it will receive the username from the frontend and only then it can search for the secret and the age.
    var username = request.query.username
    var secretsFile = fs.readFileSync(secretsDbPath,"utf-8")
    var secretsObject = JSON.parse(secretsFile)
    var info = secretsObject[username]
    var secret = info[0]
    var age = info[1]
    response.json({
        "secret" : secret,
        "age" : age
    })
})

app.listen(80, function(){
    console.log("The server has started")
})