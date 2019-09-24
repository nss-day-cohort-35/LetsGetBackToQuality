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
    },

    setEdit: function(event){
        const splitID = event.target.id.split("-");
        document.querySelector("#message-number").value = splitID[1];
        const name = document.querySelector(`#message-${splitID[1]} .message-name`).innerText.split(":")
        const date = document.querySelector(`#message-${splitID[1]} .message-date`).innerText.split(":")
        console.log(date)
        document.querySelector("#edit-message").innerText = `${name[0]}::${date[0]}:`
        document.querySelector("#submitChat").innerHTML = "Edit"
        document.querySelector("#message-box").value = document.querySelector(`#message-${splitID[1]} .message-value`).innerText
    },

    putEdit: function(userIdNum){
        const dateSplit = document.querySelector(`#message-${document.querySelector("#message-number").value} .message-date`).innerText.split(":")
        const editedChat = {
            userId: userIdNum,
            date: dateSplit[0],
            message: document.querySelector("#message-box").value
        }

        return fetch(`http://localhost:8088/messages/${document.querySelector("#message-number").value}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedChat)
        })
    }
}

export default messageEventListener