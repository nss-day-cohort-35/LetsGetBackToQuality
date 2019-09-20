/*
//
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

        //console.log("API.getRecord.query: ", query)

        return fetch(`http://localhost:8088/${query}`)
            .then(response => response.json())
    },

    checkRecord(input) {
        let query = ""

        if (input.table) {
            query = `${input.table}`
        }
        if (input.userName) {
            query += `/?userName=${input.userName}`
        }

        //console.log("API.checkRecord.query: ", query)

        return fetch(`http://localhost:8088/${query}`)
            .then(response => response.json())
    },

    //
    putRecord(table, input) {
        let query = ""

        if (table) {
            query = `${table}`
        }
        //console.log("API.putRecord.query: ", query)

        return fetch(`http://localhost:8088/${query}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        })
            .then(response => response.json())
    }
}

export default API
