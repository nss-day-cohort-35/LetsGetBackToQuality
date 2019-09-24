const friendEvents = {
    friendDelete: function (event) {
        const userIDDelete = event.target.id.split("-");
        document.querySelector(`#friendCell-${userIDDelete[1]}`).remove();
        fetch(`http://localhost:8088/friends/${userIDDelete[1]}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
    friendSearch: function (event, session) {
        document.querySelector("#search-results").innerHTML = ""
        fetch(`http://localhost:8088/users?userName_like=${document.querySelector("#search-friend-box").value}`)
            .then(data => data.json())
            .then(parsedData => {
                if (Object.keys(parsedData).length === 0) {
                    document.querySelector("#search-results").innerHTML +=
                        `
                    <p>No friends found.</p>
                    `
                }
                else {
                    parsedData.forEach(element => {
                        document.querySelector("#search-results").innerHTML +=
                            `<div id = "friendSearchCell-${element.id}" class = "friendCell"> 
                        <p>${element.userName}</p>
                        <button id = "addFriend-${element.id}" class = "addButton">Add</button>
                        </div>`
                    })
                }
            })
            .then(data => {
                const addButtonArray = document.querySelectorAll(".addButton")
                addButtonArray.forEach(element => {
                    console.log(element);
                    element.addEventListener("click", function(event) {
                        friendEvents.addToFriendsList(event.target.id, session);
                    })
                });
            })
    },
    fillFriendList: function (friendArray, mainUserNum) {
        const friendListElement = document.querySelector("#friends-list")
        friendArray.forEach(element => {
            friendListElement.innerHTML +=
                `
            <div id = "friendCell-${element.id}" class = "friendCell"> 
                <p>${element.userName}</p>
                <button id = "delete-${element.id}" class = "deleteButton">Remove Friend</button>
            </div>
            `
        });
    },

    addToFriendsList: function (userID, session) {
        console.log(session)
        const mainUserNum = parseInt(session);
        const userIDAdded = userID.split("-");
        const addedFriend = {
            userId: parseInt(userIDAdded[0]),
            friendInitiate: mainUserNum
        }

        fetch("http://localhost:8088/friends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addedFriend)
        })
            .then(data => {
                return fetch(`http://localhost:8088/friends?userId=${addedFriend.userId}&friendInitiate=${addedFriend.friendInitiate}&_expand=user`)
                    .then(newFriend => newFriend.json())
                    .then(parsedFriend => {
                        const friendListElement = document.querySelector("#friends-list")
                        friendListElement.innerHTML +=
                            `
            <div id = "friendCell-${parsedFriend[0].id}" class = "friendCell"> 
                <p>${parsedFriend[0].user.userName}</p>
                <button id = "delete-${parsedFriend[0].id}" class = "deleteButton">Remove Friend</button>
            </div>
            `
                        return parsedFriend
                    })
            })
            .then(data => {
                const buttonList = document.querySelectorAll(".deleteButton")
                buttonList.forEach(element => {
                    element.addEventListener("click", friendEvents.friendDelete)
                });
            })
    },

    returnFriendArray: function (session) { //Load function with the current user id
        const mainUserNum = parseInt(session)
        console.log(mainUserNum)
        return fetch(`http://localhost:8088/friends/?friendInitiate=${mainUserNum}&_expand=user`) //Fetch the friends of the user
            .then(data => data.json())
            .then(parsedData => {
                console.table(parsedData)
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
    }
}
export default friendEvents