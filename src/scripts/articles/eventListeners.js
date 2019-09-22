//article SECTION

const stringId = sessionStorage.getItem("userId");
const currentUserId = parseInt(stringId);
const currentUserFriends = [];

//fetch friends
const getFriends = currentUserId => {
	currentUserFriends.length = 0;
	return fetch(
		`http://localhost:8088/friends/?friendInitiate=${currentUserId}&_expand=user`
	).then(response => response.json());
};

//populate friends Array
const createFriendArray = () => {
	let currentUserId = sessionStorage.getItem("userId");
	return getFriends(currentUserId).then(data => {
		data.forEach(obj => {
			currentUserFriends.push(obj.userId);
		});
		console.log(currentUserFriends);
	});
};

//API Object
const API = {
	saveArticle: articleObj => {
		return fetch("http://localhost:8088/articles", {
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
		});
		return fetch(
			`http://localhost:8088/articles/?userId=${currentUserId}${searchString}&_sort=date&_order=asc`
		).then(response => response.json());
	},
	deleteArticle: articleId => {
		return fetch(`http://localhost:8088/articles/${articleId}`, {
			method: "DELETE"
		});
	},
	getArticle: articleId => {
		return fetch(`http://localhost:8088/articles/${articleId}`).then(response =>
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
		return fetch(`http://localhost:8088/articles/${articleId}`, {
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
const WEB = {
	myArticleHTML: obj => {
		return `
            <div class="myArticles">
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
            <div class="friendsArticles">
                <h5>${obj.title}<h5>
                <p>Date: ${obj.date} </p>
                <p>url: ${obj.url}</p>
                <p>summary: ${obj.summary}</p>
            </div>
            `;
	}
};

//dom object
const DOM = {
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

const articleEvents = {
	//populate the article dom on first load
	getAllArticles: () => {
		createFriendArray().then(() => {
			API.getArticles().then(data => DOM.addArticlesToDom(data));
		});
	},
	//article Listener for Submitting/editing
	submitEditArticles: () => {
		document
			.querySelector("#submitArticle")
			.addEventListener("click", event => {
				let hiddenId = document.querySelector("#articleId").value;
				if (hiddenId === "") {
					const newArticle = {
						userId: currentUserId,
						title: document.querySelector("#articleTitle").value,
						date: document.querySelector("#articleDate").value,
						location: document.querySelector("#articleURL").value,
						summary: document.querySelector("#articleSummary").value
					};
					API.saveArticle(newArticle).then(() => {
						articleEvents
							.getAllArticles()
							.then(data => DOM.addArticlesToDom(data));
					});
					document.querySelector("#articleTitle").value = "";
					document.querySelector("#articleDate").value = "";
					document.querySelector("#articleURL").value = "";
					document.querySelector("#articleSummary").value = "";
				} else {
					API.editArticle(hiddenId).then(() => {
						articleEvents
							.getAllArticles()
							.then(data => DOM.addArticlesToDom(data));
					});
				}
			});
	},
	//delete article
	deleteArticle: () => {
		document
			.querySelector("#articlesOutput")
			.addEventListener("click", event => {
				if (event.target.id.startsWith("delete--")) {
					const articleToDelete = event.target.id.split("--")[1];
					API.deleteArticle(articleToDelete).then(() => {
						articleEvents
							.getAllArticles()
							.then(data => DOM.addArticlesToDom(data));
					});
				}
			});
	},
	//when edit article button is pressed, populate article info into form
	editArticle: () => {
		document
			.querySelector("#articlesOutput")
			.addEventListener("click", event => {
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
	}
};

export default articleEvents;
