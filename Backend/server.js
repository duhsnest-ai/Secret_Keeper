const express = require("express")

const app = express()

app.use(express.json())

app.get("/", function(request, response){
    response.sendFile("C:/Users/mihir/OneDrive/Desktop/Classes/Duke Backend Classes/Secret Keeper/Frontend/index.html")
})

app.get("/secretDetails", function(request, response){
    response.sendFile("C:/Users/mihir/OneDrive/Desktop/Classes/Duke Backend Classes/Secret Keeper/Frontend/secretDetails.html")
})

app.listen(80, function(){
    console.log("The server has started")
})