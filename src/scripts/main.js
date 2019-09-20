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

//current user/friend array
const currentUserId = 1;
const currentUserFriends = [2, 3];
let searchString = "";

//API Object
API = {
	saveEvent: eventObj => {
		return fetch("http://localhost:8088/events", {
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
			`http://localhost:8088/events/?userId=${currentUserId}${searchString}&_sort=date&_order=asc`
		).then(response => response.json());
	},
	deleteEvent: eventId => {
		return fetch(`http://localhost:8088/events/${eventId}`, {
			method: "DELETE"
		});
	},
	getEvent: eventId => {
		return fetch(`http://localhost:8088/events/${eventId}`).then(response =>
			response.json()
		);
	},
	editEvent: eventId => {
		const updatedObject = {
			title: document.querySelector("#eventTitle").value,
			date: document.querySelector("#eventDate").value,
			location: document.querySelector("#eventLocation").value
		};
		return fetch(`http://localhost:8088/events/${eventId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(updatedObject)
		})
			.then(res => res.json())
			.then(() => {
				document.querySelector("#eventId").value = "";
				document.querySelector("#eventTitle").value = "";
				document.querySelector("#eventDate").value = "";
				document.querySelector("#eventLocation").value = "";
			});
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

//populate the event dom on first load

API.getEvents().then(data => DOM.addEventsToDom(data));

//Event Listener for Submitting/editing

document.querySelector("#submitEvent").addEventListener("click", event => {
	let hiddenId = document.querySelector("#eventId").value;
	console.log("what", hiddenId);
	if (hiddenId === "") {
		let hiddenId = document.querySelector("#eventId").name;
		console.log("what", hiddenId);
		const newEvent = {
			userId: currentUserId,
			title: document.querySelector("#eventTitle").value,
			date: document.querySelector("#eventDate").value,
			location: document.querySelector("#eventLocation").value
		};
		API.saveEvent(newEvent).then(() => {
			API.getEvents().then(data => DOM.addEventsToDom(data));
		});
		document.querySelector("#eventTitle").value = "";
		document.querySelector("#eventDate").value = "";
		document.querySelector("#eventLocation").value = "";
	} else {
		API.editEvent(hiddenId).then(() => {
			API.getEvents().then(data => DOM.addEventsToDom(data));
		});
	}
});

//delete event

document.querySelector("#eventsOutput").addEventListener("click", event => {
	if (event.target.id.startsWith("delete--")) {
		const eventToDelete = event.target.id.split("--")[1];
		API.deleteEvent(eventToDelete).then(() => {
			API.getEvents().then(data => DOM.addEventsToDom(data));
		});
	}
});

//when edit event button is pressed, populate event info into form

document.querySelector("#eventsOutput").addEventListener("click", event => {
	if (event.target.id.startsWith("edit--")) {
		const eventToEdit = event.target.id.split("--")[1];
		API.getEvent(eventToEdit).then(data => {
			document.querySelector("#eventId").value = data.id;
			document.querySelector("#eventDate").value = data.date;
			document.querySelector("#eventTitle").value = data.title;
			document.querySelector("#eventLocation").value = data.location;
		});
	}
});
