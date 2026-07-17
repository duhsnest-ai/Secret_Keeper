const express = require("express")
const secretsDbPath = "../Database/secrets.json"
const usersDbPath = "../Database/users.json"
const fs = require("fs")
const bcrypt = require("bcryptjs")

const app = express()

app.use(express.json())

app.get("/", function(request, response){
    response.sendFile("C:/Users/mihir/OneDrive/Desktop/Classes/Duke Backend Classes/Secret Keeper/Frontend/index.html")
})

app.get(
    // 1st parameter
    "/secretDetails", 
    
    // 2nd parameter
    //middleware function
    function(request, response, next){
        var username = request.headers.authorization.split(" ")[0]
        var password = request.headers.authorization.split(" ")[1]
        console.log(username)
        console.log(password)
        //we need to check if this username and password is already there in the Database.
        var usersFile = fs.readFileSync(usersDbPath,"utf-8")
        var usersObject = JSON.parse(usersFile)
        if(username in usersObject){
            var value = usersObject[username]
            if(bcrypt.compareSync(password, value) == true){
                next()
            }
            else{
                response.error("The password did not match")
            }
        }
        else{
            response.error("User does not exist")
        }
    }, 

    // 3rd parameter
    // Actual function
    function(request, response){
        response.sendFile("C:/Users/mihir/OneDrive/Desktop/Classes/Duke Backend Classes/Secret Keeper/Frontend/secretDetails.html")
    })

app.post("/signUp", function(request, response){
    var username = request.body.user
    var password = request.body.pass
    if(username == null || password == null || username == "" || password == ""){
        response.send("Username or password cannot be empty")
    }
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
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        usersObject[username] = hash
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
        if(bcrypt.compareSync(password, value) == true){
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
    if(username == null || age == null || secret == null || username == "" || age == "" || secret == ""){
        response.send("The username, the age or the secret cannot be empty")
    }
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

// Middlewares - Middlewares are functions that stop u in the middle so that u are able to go to the next step only after you are authenticated.

//We need to make sure that null values are not entered in the database