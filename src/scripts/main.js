import chatAndFriends from "./friends/eventListeners"
/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/

//JM-Chatlog
//**********************
const chatAndFriends = {
    returnFriendArray: function (mainUserNum) { //Load function with the current user id
        return fetch("http://localhost:8088/friends/?friendInitiate=1&_expand=user") //Fetch the friends of the user
            .then(data => data.json())
            .then(parsedData => {
                let objectArray = []; //Array of users
                parsedData.forEach(dataElement => {
                    const friendObject = { //Collects the id and username of each user.
                        userNum: dataElement.user.id,
                        userName: dataElement.user.userName
                    }
                    objectArray.push(friendObject);
                });
                return objectArray //Returns array
            })
    },

    returnMessagesArray: function (fetchedArray, mainUserNum) { //Returns the friend array and ID of current user
        //Populates the fetch string with multiple querys.
        let fetchString = `http://localhost:8088/messages?_expand=user&_sort=date&_order=asc&userId=${mainUserNum}&`
        fetchedArray.forEach(element => { //For each friend...
            const concatingString = "userId=" + element.userNum + "&" //Concat the new search query
            fetchString = fetchString.concat(concatingString)
        });

        return fetch(fetchString)
            .then(data => data.json())
            .then(parsedData => {
                document.querySelector("#chat-room").innerHTML += "" //Clears the inner html
                parsedData.forEach(element => {
                    if (mainUserNum === element.userId) { //If the userID matches the user's post...
                        document.querySelector("#chat-room").innerHTML += // Add the edit button with the DOM
                            `
                        <div id = "message-${element.userId}" class = "message">
                        <p id = "userId-${element.userId}">${element.user.userName}</p>
                        <p id = "message-${element.userId}">${element.message}</p>
                        <button id = "edit-${element.userId}">Edit</button>
                        <p id "date-${element.userId}">${element.date}</p>
                    `
                    }
                    else {
                        document.querySelector("#chat-room").innerHTML +=
                        `
                        <div id = "message-${element.userId}" class = "message">
                        <p id = "userId-${element.userId}">${element.user.userName}</p>
                        <p id = "message-${element.userId}">${element.message}</p>
                        <p id "date-${element.userId}">${element.date}</p>
                        `
                    }
                })
            })
    }
}

//Populates the chatlog
//****************************

var friendArray = []

chatAndFriends.returnFriendArray(1).then(data => {
    friendArray = data
    chatAndFriends.returnMessagesArray(friendArray,1);
})





const message = "Time to build an application that gives you all the information you need in a Nutshell"

document.querySelector("#container").innerHTML = `<h1>${message}</h1>`
