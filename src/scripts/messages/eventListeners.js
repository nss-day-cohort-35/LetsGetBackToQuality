const messageEventListener = {
    addChat: function(userIdNum) {

        const date = Date().split(" ");
        const month = [
            01,
            02,
            03,
            04,
            05,
            06,
            07,
            08,
            09,
            10,
            11,
            12
        ]

        const addedChat = {
            userId: parseInt(userIdNum),
            date: `${date[3]}-${month[Date.getMonth()]}-${date[2]}`,
            message: document.querySelector("#message-box").value
        }

        console.log(addedChat);

        /*
        fetch("http://localhost:8088/friends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addedFriend)
        })
        */

    }
}

export default messageEventListener