const friendEvents = {
    friendDelete: function (event) {
        const userIDDelete = event.target.id.split("-");
        console.log(userIDDelete)
        document.querySelector(`#friendCell-${userIDDelete[1]}-${userIDDelete[2]}`).remove();
        fetch(`http://localhost:8088/friends?friendInitiate=${userIDDelete[1]}&userId=${userIDDelete[2]}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}
export default friendEvents