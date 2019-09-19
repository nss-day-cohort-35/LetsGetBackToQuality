import test from "./friends/eventListeners"
/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/

//**********************

const returnMessagesArray = (fetchedArray) => {
    let fetchString = "http://localhost:8088/messages?_expand=user&_sort=date&_order=asc&userId=1&"
    fetchedArray.forEach(element => {
        const concatingString = "userId=" + element.userNum + "&"
        fetchString = fetchString.concat(concatingString)
    });

    return fetch(fetchString)
        .then(data => data.json())
        .then(parsedData => {
            parsedData.forEach(element => {
                console.table(element)
                document.querySelector("#chat-room").innerHTML +=
                `
                <div id = "message-${element.userId}" class = "message">
                    <p id = "userId-${element.userId}">${element.user.userName}</p>
                    <p id = "message-${element.userId}">${element.message}</p>
                    <button id = "edit-${element.userId}">Edit</button>
                    <p id "date-${element.userId}">${element.date}</p>
                </div>
                `
            });
        })
}

var friendArray = []

returnFriendArray().then(data => {
    friendArray = data
    returnMessagesArray(friendArray);
})



const message = "Time to build an application that gives you all the information you need in a Nutshell"

document.querySelector("#container").innerHTML = `<h1>${message}</h1>`
