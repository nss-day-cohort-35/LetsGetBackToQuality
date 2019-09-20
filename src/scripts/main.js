/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/

const message =
	"Time to build an application that gives you all the information you need in a Nutshell";

document.querySelector("#container").innerHTML = `<h1>${message}</h1>`;

console.log(message);

//article SECTION

//current user/friend array
const currentUserId = 1;
const currentUserFriends = [2, 3];
let searchString = "";

//API Object
API = {
	saveArticle: articleObj => {
		return fetch("http://localhost:3000/articles", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(articleObj)
		});
	},
	getArticles: () => {
		let searchString = "";
		currentUserFriends.forEach(id => {
			searchString += `&userId=${id}`;
			console.log("search", searchString);
		});
		return fetch(
			`http://localhost:3000/articles/?userId=${currentUserId}${searchString}&_sort=date&_order=asc`
		).then(response => response.json());
	},
	deleteArticle: articleId => {
		return fetch(`http://localhost:3000/articles/${articleId}`, {
			method: "DELETE"
		});
	},
	getArticle: articleId => {
		return fetch(`http://localhost:3000/articles/${articleId}`).then(response =>
			response.json()
		);
	},
	editArticle: articleId => {
		const updatedObject = {
			title: document.querySelector("#articleTitle").value,
			date: document.querySelector("#articleDate").value,
			url: document.querySelector("#articleURL").value,
			summary: document.querySelector("#articleSummary").value
		};
		return fetch(`http://localhost:3000/articles/${articleId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(updatedObject)
		})
			.then(res => res.json())
			.then(() => {
				document.querySelector("#articleId").value = "";
				document.querySelector("#articleTitle").value = "";
				document.querySelector("#articleDate").value = "";
				document.querySelector("#articleURL").value = "";
				document.querySelector("#articleSummary").value = "";
			});
	}
};

//web component obj
WEB = {
	myArticleHTML: obj => {
		return `
            <div class="myarticles">
                <h5>${obj.title}<h5>
                <p>Date: ${obj.date} </p>
                <p>url: ${obj.url}</p>
                <p>summary: ${obj.summary}</p>
                <button type="button" id="edit--${obj.id}">EDIT</button>
                <button type="button" id="delete--${obj.id}">DELETE</button>
            </div>
            `;
	},
	friendArticleHTML: obj => {
		return `
            <div class="friendsarticles">
                <h5>${obj.title}<h5>
                <p>Date: ${obj.date} </p>
                <p>url: ${obj.url}</p>
                <p>summary: ${obj.summary}</p>
            </div>
            `;
	}
};

//dom object
DOM = {
	addArticlesToDom(articles) {
		const articleContainer = document.querySelector("#articlesOutput");
		articleContainer.innerHTML = "";
		for (let i = 0; i < articles.length; i++) {
			if (articles[i].userId === currentUserId) {
				articleContainer.innerHTML += WEB.myArticleHTML(articles[i]);
			} else {
				articleContainer.innerHTML += WEB.friendArticleHTML(articles[i]);
			}
		}
	}
};

//populate the article dom on first load

API.getArticles().then(data => DOM.addArticlesToDom(data));

//article Listener for Submitting/editing

document.querySelector("#submitArticle").addEventListener("click", event => {
	let hiddenId = document.querySelector("#articleId").value;
	if (hiddenId === "") {
		let hiddenId = document.querySelector("#articleId").name;
		console.log("what", hiddenId);
		const newArticle = {
			userId: currentUserId,
			title: document.querySelector("#articleTitle").value,
			date: document.querySelector("#articleDate").value,
			location: document.querySelector("#articleURL").value,
			summary: document.querySelector("#articleSummary").value
		};
		API.saveArticle(newArticle).then(() => {
			API.getArticles().then(data => DOM.addArticlesToDom(data));
		});
		document.querySelector("#articleTitle").value = "";
		document.querySelector("#articleDate").value = "";
		document.querySelector("#articleURL").value = "";
		document.querySelector("#articleSummary").value = "";
	} else {
		API.editArticle(hiddenId).then(() => {
			API.getArticles().then(data => DOM.addArticlesToDom(data));
		});
	}
});

//delete article

document.querySelector("#articlesOutput").addEventListener("click", event => {
	if (event.target.id.startsWith("delete--")) {
		const articleToDelete = event.target.id.split("--")[1];
		API.deleteArticle(articleToDelete).then(() => {
			API.getArticles().then(data => DOM.addArticlesToDom(data));
		});
	}
});

//when edit article button is pressed, populate article info into form

document.querySelector("#articlesOutput").addEventListener("click", event => {
	if (event.target.id.startsWith("edit--")) {
		const articleToEdit = event.target.id.split("--")[1];
		API.getArticle(articleToEdit).then(data => {
			document.querySelector("#articleId").value = data.id;
			document.querySelector("#articleDate").value = data.date;
			document.querySelector("#articleTitle").value = data.title;
			document.querySelector("#articleURL").value = data.url;
			document.querySelector("#articleSummary").value = data.summary;
		});
	}
});
