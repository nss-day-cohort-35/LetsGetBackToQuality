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
