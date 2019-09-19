/*
//
*/

//import authPanel from "src/scripts/auth/am-auth-panel.js"
/*
      {
          "id": 1,
          "name": "James McClarty",
          "userName": "herooftime1000",
          "email": "mariobud@gmail.com"
      },

*/
//
const API = {
    getRecord(input) {
        let query = ""

        if (input.table) {
            query = `${input.table}`
        }
        if (input.userName) {
            query += `/?userName=${input.userName}`
        }
        if (input.email) {
            query += `/?email=${input.email}`
        }

        console.log("API.query: ", query)

        return fetch(`http://localhost:8088/${query}`)
            .then(response => response.json())
        /*.then(data => {
            console.log("API.response: ", data)
        })*/
    }
    /*
    saveJournalEntry: ( entry ) => {

        let query = ""
        if( entry.id ) { query = `/${entry.id}`}

        if( entry.id ) {
            return fetch( `http://localhost:3000/entries${query}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( entry )
            })
            .then( response => response.json() )
        } else {
            return fetch( `http://localhost:3000/entries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( entry )
            })
            .then( response => response.json() )
        }
    },

    deleteJournalEntry: ( entry ) => {

        let query = ""
        if( entry.id ) { query = `/${entry.id}`}

        return fetch( `http://localhost:3000/entries${query}`, { 
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
    */
}
//export default API

//
const authPanel = () => {

    return `
        <hr/>
        <section class="auth-section">

        <fieldset class="auth-section">
            <button class="auth-section__button" id="signin-button" value="">Sign In</button>
        </fieldset>

        <fieldset class="auth-section">
            <button class="auth-section__button" id="signup-button" value="">Sign up</button>
       </fieldset>

       </section>
       <hr/>
    `
}

//
const addSignIn = () => {

    return `
        <section id="signin-section">
        <h3>Sign in, please:</h3>

        <fieldset class="signin__fieldset">
            <label class="input">Username:</label>
            <input class="input" type="text" id="signin-username" placeholder="user name">
        </fieldset>

        <fieldset class="signin__fieldset">
            <label class="input">Password:</label>
            <input class="input" type="text" id="signin-password" placeholder="password">
        </fieldset>
        </section>
    `
}

//
const addSignUp = () => {

    return `
        <section id="signin-section">
        <h3>Sign in, please:</h3>

        <fieldset class="signin__fieldset">
            <label class="input">Username:</label>
            <input class="input" type="text" id="signin-username" placeholder="user name">
        </fieldset>

        <fieldset class="signin__fieldset">
            <label class="input">Password:</label>
            <input class="input" type="text" id="signin-password" placeholder="password">
        </fieldset>
        </section>
    `
}

//
const removeSignIn = () => {
    // event.target.parentNode.parentNode.removeChild( event.target.parentNode )
    //console.log("removeSignIn")
    const signInSection = document.querySelector("#signin-section")
    signInSection.parentNode.removeChild(signInSection)
    document.querySelector("#signin-button").innerHTML = "Sign Out"
}

//
let signData = {
    username: "",
    password: ""
}

//
const signInListener = (outputElement) => {

    outputElement.innerHTML += addSignIn()

    let usernameInput = document.querySelector("#signin-username")
    usernameInput.addEventListener("keypress", (event) => {

        if (event.charCode === 13) {

            let query = {
                table: "users",
                userName: ""
            }

            query.userName = event.target.value

            //console.log("query:", query)
            API.getRecord(query).then((userList) => {
                //console.log("userList", userList)
                if (userList.length) {
                    signData.username = userList[0].userName
                    if (signData.password.length) {
                        removeSignIn()
                    }
                    //console.log("This is valid username")
                } else {
                    //console.log("This is not valid username")
                }
            })
        }
    })

    document.querySelector("#signin-password").addEventListener("keypress", (event) => {
        if (event.charCode === 13) {
            //let password = event.target.value
            //console.log("password:", password)
            //
            let query = {
                table: "users",
                email: ""
            }

            query.email = event.target.value

            //console.log("query:", query)
            API.getRecord(query).then((userList) => {
                //console.log("userList", userList)
                if (userList.length) {
                    signData.password = userList[0].email
                    if (signData.username.length) {
                        removeSignIn()
                    }
                    //console.log("This is valid password")
                } else {
                    //console.log("This is not valid password")
                }
            })
        }
    })
}


//
const signIn = (outputElement) => {

    const signInButton = document.querySelector("#signin-button")
    signInButton.addEventListener("click", (event) => {

        const status = document.querySelector("#signin-button").innerHTML
        console.log("status:", status)

        if (status === "Sign In") {

            signInListener(outputElement)

        } else if (status === "Sign Out") {
            signData.username = ""
            signData.password = ""
            document.querySelector("#signin-button").innerHTML = "Sign In"
        }

    })
}

//
const signUp = (outputElement) => {

    const signUpButton = document.querySelector("#signup-button")
    signUpButton.addEventListener("click", (event) => {

        outputElement.innerHTML += addSignUp()

        let usernameInput = document.querySelector("#signin-username")
        usernameInput.addEventListener("keypress", (event) => {
        })
    })
}


//
const authorization = () => {

    console.log("authorization")

    const outputElement = document.querySelector("#container")

    outputElement.innerHTML += authPanel()

    signIn(outputElement)

    //let signInUsername = document.querySelector("#signin-password")
}


export default authorization
