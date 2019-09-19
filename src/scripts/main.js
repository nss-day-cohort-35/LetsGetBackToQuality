import chatAndFriends from "./friends/eventListeners"
/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/

//**********************

var friendArray = []

chatAndFriends.returnFriendArray(1).then(data => {
    friendArray = data
    chatAndFriends.returnMessagesArray(friendArray,1);
})



const message = "Time to build an application that gives you all the information you need in a Nutshell"

document.querySelector("#container").innerHTML = `<h1>${message}</h1>`
