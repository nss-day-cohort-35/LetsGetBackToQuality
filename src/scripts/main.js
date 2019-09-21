/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/

import authorization from "./auth/eventListeners.js";
import eventEvents from "./events/eventListeners.js";
import articleEvents from "./articles/eventListeners.js";
import taskEvents from "./tasks/eventListeners";

authorization();

console.log(
	"main.js sessionStorage.userId: ",
	sessionStorage.getItem("userId")
);

//event event listeners
eventEvents.getAllEvents();
eventEvents.submitEditEvent();
eventEvents.deleteEvent();
eventEvents.editEvent();

//article event listeners
articleEvents.getAllArticles();
articleEvents.submitEditArticles();
articleEvents.deleteArticle();
articleEvents.editArticle();

//task event listeners

taskEvents.getAllTasks();
taskEvents.submitEditTasks();
taskEvents.deleteTask();
taskEvents.editTask();
taskEvents.taskComplete();
taskEvents.finishedTasks();
taskEvents.standardTasks();

//dropdown sections

window.addEventListener("click", event => {
	if (event.target.matches(".dropBtn")) {
		//turn off when clicked if open
		if (event.target.querySelector("#myDropdown").classList.contains("show")) {
			event.target.querySelector("#myDropdown").classList.toggle("show");
		} else {
			//cycle through all dropdown elements and close anything not clicked on
			var dropdowns = document.getElementsByClassName("dropdown-content");
			var i;
			for (i = 0; i < dropdowns.length; i++) {
				var openDropdown = dropdowns[i];
				if (openDropdown.classList.contains("show")) {
					openDropdown.classList.remove("show");
				}
			}
			//open clicked element
			event.target.querySelector("#myDropdown").classList.toggle("show");
		}
	}
});

// //creating friend array

const getFriends = currentUserId => {
	return fetch(
		`http://localhost:8088/friends/?friendInitiate=${currentUserId}&_expand=user`
	).then(response => response.json());
};

const friendArray = [];

const createFriendArray = () => {
	currentUserId = sessionStorage.getItem("userId");
	getFriends(currentUserId).then(data => {
		data.forEach(obj => {
			friendArray.push(obj.userId);
		});
		console.log(friendArray);
	});
};
