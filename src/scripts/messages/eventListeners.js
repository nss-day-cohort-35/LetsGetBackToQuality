const messageEventListener = {
    addChat: function (userIdNum) {

        const date = new Date();
        const dateSplit = Date().split(" ");
        const month = [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12"
        ]

        const addedChat = {
            userId: parseInt(userIdNum),
            date: `${dateSplit[3]}-${month[date.getMonth()]}-${dateSplit[2]}`,
            message: document.querySelector("#message-box").value
        }
        return fetch("http://localhost:8088/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addedChat)
        })
        .then(data => data.json())
    }
}

export default messageEventListener