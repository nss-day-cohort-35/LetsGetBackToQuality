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
        if (input.password) {
            query += `&password=${input.password}`
        } else {
            query = ""
        }

        console.log("API.query: ", query)

        return fetch(`http://localhost:8088/${query}`)
            .then(response => response.json())
        /*.then(data => {
            console.log("API.response: ", data)
        })*/
    },

    checkRecord(input) {
        let query = ""

        if (input.table) {
            query = `${input.table}`
        }
        if (input.userName) {
            query += `/?userName=${input.userName}`
        }/*
        if (input.email) {
            query += `&email=${input.email}`
        } else {
            query = ""
        }*/

        console.log("API.query: ", query)

        return fetch(`http://localhost:8088/${query}`)
            .then(response => response.json())
        /*.then(data => {
            console.log("API.response: ", data)
        })*/
    },
    /*
    $ curl -X POST -H "Content-Type: application/json" -d '{"name": "Lisa","salary": "2000"}' "http://localhost:3000/employees"
    {
      "name": "Lisa",
      "salary": 2000,
      "id": 3
    }*/
    //
    /*
    saveJournalEntry: (entry) => {

        let query = ""
        if (entry.id) { query = `/${entry.id}` }

        if (entry.id) {
            return fetch(`http://localhost:3000/entries${query}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(entry)
            })
                .then(response => response.json())
        } else {
            return fetch(`http://localhost:3000/entries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(entry)
            })
                .then(response => response.json())
        }
    },
*/
    //
    putRecord(table, input) {
        let query = ""

        if (table) {
            query = `${table}`
        }
        /*        if (input.userName) {
                    query += `/?userName=${input.userName}`
                }
                if (input.email) {
                    query += `&email=${input.email}`
                } else {
                    query = ""
                }
        */
        console.log("API.puRecord.query: ", query)

        return fetch(`http://localhost:8088/${query}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        })
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
let authPanel = (status) => {

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
    `
}

//
let addSignIn = () => {

    //    <section id="signin-section">

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
    `
    //        </section>

}

//
let addSignUp = () => {
    //       <section id="signup-section">
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
    `
    //      </section>
}

//
const removeSignIn = () => {
    // event.target.parentNode.parentNode.removeChild( event.target.parentNode )
    console.log("removeSignIn")
    let signInSection = document.querySelector(".signin-section")
    if (signInSection !== null) {
        signInSection.parentNode.removeChild(signInSection)
    }
}

//
const removeSignSection = (label) => {
    //console.log("remove section", label)
    let signSection = document.querySelectorAll(`.${label}`)

    //console.log("removeSign with:", signSection.length)
    //if (signUpSection !== null) {
    if (signSection) {
        signSection.forEach(section => {
            //console.log("removing section")
            section.parentNode.removeChild(section)
        })
    }
    //document.querySelector("#signin-button").innerHTML = "Sign Out"
}
//
const newSignData = (username, password, userId) => {
    const signData = {
        username: username,
        password: password,
        userId: userId
    }
    return signData
}

let signData = newSignData("", "", "")

//
const signInListener = (outputElement) => {

    removeSignSection("signin-section")
    removeSignSection("signup-section")

    let signInElement = document.createElement('section')
    signInElement.className = "signin-section"
    signInElement.innerHTML = addSignIn()
    outputElement.appendChild(signInElement)

    document.querySelector("#signin-button").addEventListener("click", (event) => {

        let query = {
            table: "users",
            userName: "",
            password: ""
        }

        /*if (event.charCode === 13) {
            //let password = event.target.value
            //console.log("password:", password)
            //
        }*/

        query.userName = document.querySelector("#signin-username").value
        query.password = document.querySelector("#signin-password").value

        console.log("query:", query)

        API.getRecord(query).then((userList) => {
            console.log("userList", userList)
            if (userList.length) {

                signData = newSignData(userList[0].userName, userList[0].password, userList[0].id)
                console.log("getRecord signData: ", signData)
                document.querySelector("#auth-signin-button").innerHTML = "Sign Out"
                removeSignSection("signin-section")

                //if (signData.username.length) {
                //}
                //console.log("This is valid password")
            } else {
                console.log("Try again!")
                //console.log("This is not valid password")
            }
        })
    })

    /*
        //
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
                            document.querySelector("#signin-button").innerHTML = "Sign Out"
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
    */
}


let query = {

}

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

//
const signUpListener = (outputElement) => {

    removeSignSection("signin-section")
    removeSignSection("signup-section")

    let signUpElement = document.createElement('section')
    signUpElement.className = "signup-section"
    signUpElement.innerHTML = addSignUp()
    outputElement.appendChild(signUpElement)

    document.querySelector("#signup-button").addEventListener("click", (event) => {
        //removeSignSection("signup-section")
        //
        let query = {
            table: "users",
            realName: "",
            userName: "",
            email: "",
            password: "",
            password_confirm: ""
        }

        /*if (event.charCode === 13) {
            //let password = event.target.value
            //console.log("password:", password)
            //
        }*/
        /*        <input class="input" type="text" id="signup-realname" placeholder="first and last names">
                    <input class="input" type="text" id="signup-username" placeholder="new user name">
                    <input class="input" type="text" id="signup-password" placeholder="new password">
                    <input class="input" type="text" id="signup-password-confirm" placeholder="new password">
                    <input class="input" type="text" id="signup-email" placeholder="email address">
        */
        query.userName = document.querySelector("#signup-username").value
        query.password = document.querySelector("#signup-password").value
        query.password_confirm = document.querySelector("#signup-password-confirm").value
        query.realName = document.querySelector("#signup-realname").value
        query.email = document.querySelector("#signup-email").value

        console.log("query:", query)

        //const record = newRecord(query)

        API.checkRecord(query).then((userList) => {
            console.log("userList", userList)

            if (userList.length) {

                alert("account " + query.userName + " already exist. Try again!")

                /*signData.username = userList[0].userName
                signData.password = userList[0].email
                document.querySelector("#auth-signin-button").innerHTML = "Sign Out"
                removeSignSection("signin-section")*/

                //if (signData.username.length) {
                //}
                //console.log("This is valid password")

            } else { // putting new record to database

                const record = newRecord(query)

                API.putRecord("users", record).then(data => {
                    alert("New account \"" + record.userName + "\" created. Good job!")
                    removeSignSection("signup-section")
                })

                //console.log("Try again!")
                //console.log("This is not valid password")
            }
        })
        //
    })
}

//
const signIn = (outputElement) => {

    let buttonElement = document.querySelector("#auth-signin-button")

    buttonElement.addEventListener("click", (event) => {

        let status = event.target.innerHTML

        if (status === "Sign In") {
            console.log("Sing In status:", status)
            signInListener(outputElement)
        }
        if (status === "Sign Out") {
            console.log("Sign Out status:", status)

            signData = newSignData("", "", "")
            event.target.innerHTML = "Sign In"
        }
    })
}

//
const signUp = (outputElement) => {

    document.querySelector("#auth-signup-button").addEventListener("click", (event) => {

        console.log("signUp signData: ", signData)

        if (signData.userId) {
            alert("You have to Sign Out first.")
        } else {
            signData = newSignData("", "", "")
            signUpListener(outputElement)
        }
        //let usernameInput = document.querySelector("#signin-username")
        //usernameInput.addEventListener("keypress", (event) => {
        //})
    })
}

//
const authorization = () => {

    console.log("authorization")

    let outputElement = document.querySelector("#container")

    outputElement.innerHTML += authPanel("Sign In")

    signIn(outputElement)
    signUp(outputElement)

}


export default authorization
