import friendEvents from "./friends/eventListeners"
/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/

//Friends List Object
//****************************

const friendListObject = {
    fillFriendList: function (friendArray, mainUserNum) {
        const friendListElement = document.querySelector("#friends-list")
        friendArray.forEach(element => {
            console.log(element)
            friendListElement.innerHTML +=
                `
            <div id = "friendCell-${element.id}" class = "friendCell"> 
                <p>${element.userName}</p>
                <button id = "delete-${element.id}">Remove Friend</button>
            </div>
            `
        });
    },

    addToFriendsList: function (event) {
        const userIDAdded = event.target.id.split("-");
        const addedFriend = {
            userId: userIDAdded[1],
            friendInitiate: 1
        }

        fetch("http://localhost:8088/friends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addedFriend)
        })
    }
}

//JM-Chatlog
//**********************
const chatObject = {
    returnFriendArray: function (mainUserNum) { //Load function with the current user id
        return fetch("http://localhost:8088/friends/?friendInitiate=1&_expand=user") //Fetch the friends of the user
            .then(data => data.json())
            .then(parsedData => {
                let objectArray = []; //Array of users
                parsedData.forEach(dataElement => {
                    const friendObject = { //Collects the id and username of each user.
                        id: dataElement.id,
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
                        <div id = "message-${element.user.id}" class = "message">
                        <span id = "userId-${element.userId}">${element.user.userName}::</span>
                        <span id = "date-${element.userId}">${element.date}:</span>
                        <p id = "message-${element.userId}">${element.message}</p>
                        <button id = "edit-${element.userId}">Edit</button>
                    `
                    }
                    else {
                        document.querySelector("#chat-room").innerHTML +=
                            `
                            <div id = "message-${element.user.id}" class = "message">
                            <span id = "userId-${element.userId}">${element.user.userName}::</span>
                            <span id = "date-${element.userId}">${element.date}:</span>
                            <p id = "message-${element.userId}">${element.message}</p>
                        `
                    }
                })
                return parsedData
            })
            .then(parsedData => {
                parsedData.forEach(element => {
                   document.querySelector(`#userId-${element.userId}`).addEventListener("click",friendListObject.addToFriendsList)
                });
            })
    }
}


//Populates the chatlog and friend list
//****************************

var friendArray = []

chatObject.returnFriendArray(1)
    .then(data => {
        friendArray = data;
        chatObject.returnMessagesArray(friendArray, 1);
        friendListObject.fillFriendList(friendArray, 1);
        return friendArray;
    })
    .then(data => {
        data.forEach(element => {
            document.querySelector(`#friendCell-${element.id}`).addEventListener("click", friendEvents.friendDelete)
        });
    });

