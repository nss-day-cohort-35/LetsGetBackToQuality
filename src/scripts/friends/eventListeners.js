const chatAndFriends = {
    returnFriendArray: function(mainUserNum) {
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
    }
}

export default chatAndFriends