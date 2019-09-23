const friendEvents = {
    friendDelete: function (event) {
        console.log("clicked")
        const userIDDelete = event.target.id.split("-");
        document.querySelector(`#friendCell-${userIDDelete[1]}`).remove();
        fetch(`http://localhost:8088/friends/${userIDDelete[1]}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}
export default friendEvents