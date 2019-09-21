/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/

import authorization from "./auth/eventListeners.js";
import eventEvents from "./events/eventListeners.js";

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

//EVENT SECTION
