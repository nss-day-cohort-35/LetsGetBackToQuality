import API from "../api.js"
import articleEvents from "../articles/eventListeners.js"
import eventEvents from "../events/eventListeners.js"
import taskEvents from "../tasks/eventListeners.js"


//
let authPanel = status => {
	return `
        <hr/>
        <section class="auth-section">

        <fieldset class="auth-section">
            <button class="auth-section__button" id="auth-signin-button" value="">${status}</button>
        </fieldset>

        <fieldset class="auth-section">
            <button class="auth-section__button" id="auth-signup-button" value="">Sign up</button>
       </fieldset>

       </section>
       <hr/>
    `;
};

//
let addSignIn = () => {
	return `
        <h3>Sign in, please:</h3>

        <fieldset class="signin__fieldset">
            <label class="input">Username:</label>
            <input class="input" type="text" id="signin-username" placeholder="user name">
        </fieldset>

        <fieldset class="signin__fieldset">
            <label class="input">Password:</label>
            <input class="input" type="text" id="signin-password" placeholder="password">
        </fieldset>

        <fieldset class="signin__fieldset">
            <button class="input" type="button" id="signin-button">Login!</button>
        </fieldset>
    `;
};

let addSignUp = () => {
	return `
        <h3>Sign up, please:</h3>

        <fieldset class="signup__fieldset">
            <label class="input">Real name:</label>
            <input class="input" type="text" id="signup-realname" placeholder="first and last names">
        </fieldset>

        <fieldset class="signup__fieldset">
            <label class="input">New username:</label>
            <input class="input" type="text" id="signup-username" placeholder="new user name">
        </fieldset>

        <fieldset class="signup__fieldset">
            <label class="input">New password:</label>
            <input class="input" type="text" id="signup-password" placeholder="new password">
        </fieldset>

        <fieldset class="signup__fieldset">
            <label class="input">New password confirmation:</label>
            <input class="input" type="text" id="signup-password-confirm" placeholder="new password">
        </fieldset>

        <fieldset class="signup__fieldset">
            <label class="input">e-Mail:</label>
            <input class="input" type="text" id="signup-email" placeholder="email address">
        </fieldset>

        <fieldset class="signup__fieldset">
           <button class="input" type="button" id="signup-button">Save it!</button>
        </fieldset>
    `;
};

//
const sessionStorageData = (data) => {
	// Save data to sessionStorage
	sessionStorage.setItem("username", data.username);
	sessionStorage.setItem("password", data.password);
	sessionStorage.setItem("userId", data.userId);
    /*
        // Get saved data from sessionStorage
        let data = sessionStorage.getItem('key');

        // Remove saved data from sessionStorage
        sessionStorage.removeItem('key');

        // Remove all saved data from sessionStorage
        sessionStorage.clear();
    */
}


//
const newSignData = (username, password, userId) => {
	const signData = {
		username: username,
		password: password,
		userId: userId
	}

	console.log("signData.userId: ", signData.userId)

	return signData
}


//
const removeSignSection = (label) => {
	let signSection = document.querySelectorAll(`.${label}`)

	if (signSection) {
		signSection.forEach(section => {
			section.parentNode.removeChild(section)
		})
	}
}


//
const signInListener = (outputElement) => {

	removeSignSection("signin-section")
	removeSignSection("signup-section")

	let signInElement = document.createElement("section")
	signInElement.className = "signin-section"
	signInElement.innerHTML = addSignIn()
	outputElement.appendChild(signInElement)

	document.querySelector("#signin-button").addEventListener("click", (event) => {

		let query = {
			table: "users",
			userName: "",
			password: ""
		}

		query.userName = document.querySelector("#signin-username").value
		query.password = document.querySelector("#signin-password").value

		API.getRecord(query).then((userList) => {
			if (userList.length) {
				signData = newSignData(userList[0].userName, userList[0].password, userList[0].id)
				sessionStorageData(signData)
				document.querySelector("#auth-signin-button").innerHTML = "Sign Out"
				removeSignSection("signin-section")
			} else {
				alert("Input data is not valid. Try again!")
			}
		})
	})
}


//
const containsCharacterFrom = (set, phrase) => {

	if (phrase.split("").reduce((found, character) => found += set.includes(character), 0)) {
		return 1
	}
	return 0
}


//
const verifyPassPhrase = (passphrase) => {

	const passLength = 8

	const characterSets = [
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		"abcdefghijklmnopqrstuvwxyz",
		"0123456789",
		"@%+'!#$^?:.(){}[]~-_" // taken from https://docs.oracle.com/cd/E11223_01/doc.910/e11197/app_special_char.htm
	]

	if (passphrase.length < passLength) {
		alert("Passphrase must be at least 8 characters long.")
		return 0
	} else if (characterSets.reduce((match, set) => match += containsCharacterFrom(set, passphrase), 0) < characterSets.length) {
		alert("Passphrase must contain capital letters, small letters, numbers and special symbols.")
		return 0
	}

	return 1
}


//
const verifyInput = (input) => {

	if (input.password !== input.password_confirm) {
		alert("Password and its confirmation are different.")
		return 0
	} else if (!verifyPassPhrase(input.password)) {
		alert("Passphrase not verified.")
		return 0
	}/* else if (!verifyEmail(input.email)) {
        alert("eMail not valid.")
        return 0
    }*/

	return 1
}


//
const signUpListener = (outputElement) => {

	removeSignSection("signin-section")
	removeSignSection("signup-section")

	let signUpElement = document.createElement("section")
	signUpElement.className = "signup-section"
	signUpElement.innerHTML = addSignUp()
	outputElement.appendChild(signUpElement)

	// factory function to create record from input data
	const newRecord = (query) => {
		const record = {
			name: query.realName,
			userName: query.userName,
			password: query.password,
			email: query.email
		}
		return record
	}

	document.querySelector("#signup-button").addEventListener("click", (event) => {

		let query = {
			table: "users",
			realName: "",
			userName: "",
			email: "",
			password: "",
			password_confirm: ""
		}

		query.userName = document.querySelector("#signup-username").value
		query.password = document.querySelector("#signup-password").value
		query.password_confirm = document.querySelector("#signup-password-confirm").value
		query.realName = document.querySelector("#signup-realname").value
		query.email = document.querySelector("#signup-email").value

		API.checkRecord(query).then((userList) => {

			if (userList.length) {

				alert("account " + query.userName + " already exist. Try again!")

			} else { // putting new record to database

				if (verifyInput(query)) {
					const record = newRecord(query)
					API.putRecord("users", record).then(data => {
						alert("New account \"" + record.userName + "\" created. Good job!")
						removeSignSection("signup-section")
					})
				} else {
					alert("Input data for registration is not valid. Try again!")
				}
			}
		})
	})
}


//
const signIn = (outputElement) => {

	let buttonElement = document.querySelector("#auth-signin-button")
	buttonElement.addEventListener("click", (event) => {

		let status = event.target.innerHTML

		/*if (status === "Sign In") {
			signInListener(outputElement)
		}
		if (status === "Sign Out") {
			signData = newSignData("", "", "")
			event.target.innerHTML = "Sign In"
		}*/
		if (status === "Sign In") {
			signInListener(outputElement)
			console.log("Sign In userId: ", sessionStorage.getItem("userId"))
			//
			eventEvents.getAllEvents()
			articleEvents.getAllArticles()
			taskEvents.getAllTasks()
		}
		if (status === "Sign Out") {
			signData = newSignData("", "", "")
			sessionStorageData(signData)
			console.log("Sign Out userId: ", sessionStorage.getItem("userId"))
			event.target.innerHTML = "Sign In"
			//
			eventEvents.getAllEvents()
			articleEvents.getAllArticles()
			taskEvents.getAllTasks()
		}

	})
}


//
const signUp = (outputElement) => {

	document.querySelector("#auth-signup-button").addEventListener("click", (event) => {

		if (signData.userId) {
			alert("You have to Sign Out first.")
		} else {
			signData = newSignData("", "", "")
			signUpListener(outputElement)
		}
	})
}

//
let signData = newSignData(sessionStorage.getItem("username"), sessionStorage.getItem("password"), sessionStorage.getItem("userId"))
//
const authorization = () => {

	console.log("authorization")

	let outputElement = document.querySelector("#container")

	if (!signData.userId) {
		console.log("sessionStorage userId: ", signData.userId)
		outputElement.innerHTML += authPanel("Sign In")
	} else {
		outputElement.innerHTML += authPanel("Sign Out")
	}

	signIn(outputElement)
	signUp(outputElement)
}


export default authorization
