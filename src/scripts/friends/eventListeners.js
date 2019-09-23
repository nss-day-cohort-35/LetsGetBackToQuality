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
    friendSearch: function (event) {
        document.querySelector("#search-friend-box").value
        fetch(`http://localhost:8088/users?userName_like=${userIDDelete[1]}`)
            .then(data => data.json)
            .then(parsedData => {
                if (Object.keys(parsedData).length === 0) {
                    document.querySelector("#friends-list").innerHTML +=
                    `
                    <p>No friends found.</p>
                    `
                }
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

    addToFriendsList: function (event) {
        const userIDAdded = event.target.id.split("-");
        const addedFriend = {
            userId: parseInt(userIDAdded[1]),
            friendInitiate: 1
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
    }
}
export default friendEvents