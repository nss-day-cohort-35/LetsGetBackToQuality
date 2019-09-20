/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/

const message =
	"Time to build an application that gives you all the information you need in a Nutshell";

document.querySelector("#container").innerHTML = `<h1>${message}</h1>`;

console.log(message);

//task SECTION

//current user/friend array
const currentUserId = 1;
const currentUserFriends = [2, 3];
let searchString = "";

//API Object
API = {
	saveTask: taskObj => {
		return fetch("http://localhost:8088/tasks", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(taskObj)
		});
	},
	getTasks: () => {
		let searchString = "";
		currentUserFriends.forEach(id => {
			searchString += `&userId=${id}`;
			console.log("search", searchString);
		});
		return fetch(
			`http://localhost:8088/tasks/?userId=${currentUserId}${searchString}&_sort=dueDate&_order=asc&completed=no`
		).then(response => response.json());
	},
	getFinishedTasks: () => {
		let searchString = "";
		currentUserFriends.forEach(id => {
			searchString += `&userId=${id}`;
			console.log("search", searchString);
		});
		return fetch(
			`http://localhost:8088/tasks/?userId=${currentUserId}${searchString}&_sort=dueDate&_order=asc&completed=yes`
		).then(response => response.json());
	},
	deleteTask: taskId => {
		return fetch(`http://localhost:8088/tasks/${taskId}`, {
			method: "DELETE"
		});
	},
	getTask: taskId => {
		return fetch(`http://localhost:8088/tasks/${taskId}`).then(response =>
			response.json()
		);
	},
	editTask: taskId => {
		const updatedObject = {
			title: document.querySelector("#taskTitle").value,

			dueDate: document.querySelector("#taskDueDate").value
			// completed: document.querySelector("#taskCompleted").value
		};
		return fetch(`http://localhost:8088/tasks/${taskId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(updatedObject)
		})
			.then(res => res.json())
			.then(() => {
				document.querySelector("#taskId").value = "";
				document.querySelector("#taskTitle").value = "";

				document.querySelector("#taskDueDate").value = "";
				// document.querySelector("#taskCompleted").value = "";
			});
	},
	completeTask: taskId => {
		const updatedObject = {
			completed: document.querySelector(".taskCompleted").value
		};
		console.log(updatedObject);
		return fetch(`http://localhost:8088/tasks/${taskId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(updatedObject)
		}).then(res => res.json());
	}
};

//web component obj
WEB = {
	myTaskHTML: obj => {
		return `
            <div class="mytasks">
                <h5>${obj.title}<h5>
                <p>Due Date: ${obj.dueDate} </p>
                <p>completed?: 	<input type="checkbox" id="taskCompleted--${obj.id}" class="taskCompleted" value="yes"></p>
                
                <button type="button" id="edit--${obj.id}">EDIT</button>
                <button type="button" id="delete--${obj.id}">DELETE</button>
            </div>
            `;
	},
	friendTaskHTML: obj => {
		return `
            <div class="friendstasks">
                <h5>${obj.title}<h5>
                <p>Due Date: ${obj.dueDate} </p>
                <p>completed?: ${obj.completed}</p>
                
            </div>
            `;
	},
	myFinishedTaskHTML: obj => {
		return `
            <div class="mytasks">
                <h5>${obj.title}<h5>
                <p>Due Date: ${obj.dueDate} </p>
                <p>completed?: ${obj.completed}</p>
                
                <button type="button" id="delete--${obj.id}">DELETE</button>
            </div>
            `;
	},
	friendsFinishedTaskHTML: obj => {
		return `
            <div class="friendstasks">
                <h5>${obj.title}<h5>
                <p>Due Date: ${obj.dueDate} </p>
                <p>completed?: ${obj.completed}</p>
                
            </div>
            `;
	}
};

//dom object
DOM = {
	addTasksToDom(tasks) {
		const taskContainer = document.querySelector("#tasksOutput");
		taskContainer.innerHTML = "";
		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i].userId === currentUserId) {
				taskContainer.innerHTML += WEB.myTaskHTML(tasks[i]);
			} else {
				taskContainer.innerHTML += WEB.friendTaskHTML(tasks[i]);
			}
		}
	},
	addFinishedTasksToDom(tasks) {
		const taskContainer = document.querySelector("#tasksOutput");
		taskContainer.innerHTML = "";
		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i].userId === currentUserId) {
				taskContainer.innerHTML += WEB.myFinishedTaskHTML(tasks[i]);
			} else {
				taskContainer.innerHTML += WEB.friendsFinishedTaskHTML(tasks[i]);
			}
		}
	}
};

//populate the task dom on first load

API.getTasks().then(data => DOM.addTasksToDom(data));

//task Listener for Submitting/editing

document.querySelector("#submitTask").addEventListener("click", event => {
	let hiddenId = document.querySelector("#taskId").value;
	if (hiddenId === "") {
		let hiddenId = document.querySelector("#taskId").name;
		console.log("what", hiddenId);
		const newTask = {
			userId: currentUserId,
			title: document.querySelector("#taskTitle").value,
			dueDate: document.querySelector("#taskDueDate").value,

			completed: "no"
		};
		API.saveTask(newTask).then(() => {
			API.getTasks().then(data => DOM.addTasksToDom(data));
		});
		document.querySelector("#taskTitle").value = "";

		document.querySelector("#taskDueDate").value = "";
		// document.querySelector("#taskCompleted").value = "";
	} else {
		API.editTask(hiddenId).then(() => {
			API.getTasks().then(data => DOM.addTasksToDom(data));
		});
	}
});

//delete task

document.querySelector("#tasksOutput").addEventListener("click", event => {
	if (event.target.id.startsWith("delete--")) {
		const taskToDelete = event.target.id.split("--")[1];
		API.deleteTask(taskToDelete).then(() => {
			API.getTasks().then(data => DOM.addTasksToDom(data));
		});
	}
});

//when edit task button is pressed, populate task info into form

document.querySelector("#tasksOutput").addEventListener("click", event => {
	if (event.target.id.startsWith("edit--")) {
		const taskToEdit = event.target.id.split("--")[1];
		API.getTask(taskToEdit).then(data => {
			document.querySelector("#taskId").value = data.id;
			document.querySelector("#taskDueDate").value = data.dueDate;
			document.querySelector("#taskTitle").value = data.title;

			// document.querySelector("#taskCompleted").value = data.completed;
		});
	}
});

//mark task as completed, remove from standard task view

document.querySelector("#tasksOutput").addEventListener("click", event => {
	if (event.target.id.startsWith("taskCompleted--")) {
		const taskToEdit = event.target.id.split("--")[1];
		console.log("taks to edit", taskToEdit);
		API.completeTask(taskToEdit).then(data => {
			API.getTasks().then(data => DOM.addTasksToDom(data));
		});
	}
});

//view finished tasks
document.querySelector("#finishedTasks").addEventListener("click", event => {
	API.getFinishedTasks().then(data => DOM.addFinishedTasksToDom(data));
});

//view standard tasks

document.querySelector("#unfinishedTasks").addEventListener("click", event => {
	API.getTasks().then(data => DOM.addTasksToDom(data));
});
