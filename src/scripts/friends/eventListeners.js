const chatAndFriends = {
    returnFriendArray: function (mainUserNum) {
        return fetch("http://localhost:8088/friends/?friendInitiate=1&_expand=user")
            .then(data => data.json())
            .then(parsedData => {
                let objectArray = [];
                parsedData.forEach(dataElement => {
                    const friendObject = {
                        userNum: dataElement.user.id,
                        userName: dataElement.user.userName
                    }
                    objectArray.push(friendObject);
                });
                return objectArray
            })
    },

    returnMessagesArray: function (fetchedArray, mainUserNum) {
        let fetchString = `http://localhost:8088/messages?_expand=user&_sort=date&_order=asc&userId=${mainUserNum}&`
        fetchedArray.forEach(element => {
            const concatingString = "userId=" + element.userNum + "&"
            fetchString = fetchString.concat(concatingString)
        });

        return fetch(fetchString)
            .then(data => data.json())
            .then(parsedData => {
                document.querySelector("#chat-room").innerHTML += ""
                console.table(parsedData);
                parsedData.forEach(element => {
                    if (mainUserNum === element.userId) {
                        document.querySelector("#chat-room").innerHTML +=
                            `
                        <div id = "message-${element.userId}" class = "message">
                        <p id = "userId-${element.userId}">${element.user.userName}</p>
                        <p id = "message-${element.userId}">${element.message}</p>
                        <button id = "edit-${element.userId}">Edit</button>
                        <p id "date-${element.userId}">${element.date}</p>
                    `
                    }
                    else {
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

export default chatAndFriends