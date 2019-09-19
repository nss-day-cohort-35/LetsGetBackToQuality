/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/

const message =
	"Time to build an application that gives you all the information you need in a Nutshell";

document.querySelector("#container").innerHTML = `<h1>${message}</h1>`;

console.log(message);

//EVENT SECTION

//current user
const currentUserId = 1;
const currentUserFriends = [2, 3, 8, 9];
let searchString = "";

//API Object
API = {
	saveEvent: eventObj => {
		return fetch("http://localhost:3000/events", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(eventObj)
		});
	},
	getEvents: () => {
		let searchString = "";
		currentUserFriends.forEach(id => {
			searchString += `&userId=${id}`;
			console.log("search", searchString);
		});
		return fetch(
			`http://localhost:3000/events/?userId=${currentUserId}${searchString}&_order=desc`
		).then(response => response.json());
	}
};

//web component obj
WEB = {
	myEventHTML: obj => {
		return `
            <div class="myEvents">
                <h5>${obj.title}<h5>
                <p>Date: ${obj.date} </p>
                <p>location: ${obj.location}</p>
                <button type="button" id="edit--${obj.id}">EDIT</button>
                <button type="button" id="delete--${obj.id}">DELETE</button>
            </div>
            `;
	},
	friendEventHTML: obj => {
		return `
            <div class="friendsEvents">
                <h5>${obj.title}<h5>
                <p>Date: ${obj.date} </p>
                <p>location: ${obj.location}</p>
            </div>
            `;
	}
};

//dom object
DOM = {
	addEventsToDom(events) {
		const eventContainer = document.querySelector("#eventsOutput");
		eventContainer.innerHTML = "";
		for (let i = 0; i < events.length; i++) {
			if (events[i].userId === currentUserId) {
				eventContainer.innerHTML += WEB.myEventHTML(events[i]);
			} else {
				eventContainer.innerHTML += WEB.friendEventHTML(events[i]);
			}
		}
	}
};

//Event Listener for Submitting
document.querySelector("#submitEvent").addEventListener("click", event => {
	const newEvent = {
		userId: currentUserId,
		title: document.querySelector("#eventTitle").value,
		date: document.querySelector("#eventDate").value,
		location: document.querySelector("#eventLocation").value
	};
	API.saveEvent(newEvent).then(() => {
		API.getEvents().then(data => DOM.addEventsToDom(data));
	});
});

//populate the event dom
API.getEvents().then(data => DOM.addEventsToDom(data));
