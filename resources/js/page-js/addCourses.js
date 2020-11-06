/*
Validates user input, and fetches the corresponding class
    - obj (Object): The input field which called this
    - event (KeyEvent): the keyEvent
    - @return (void)
*/
async function validateInput(input, event) {
    // Only go on enter
    if (event.keyCode === 13) {
        event.preventDefault();
        await handleSingleCourse(input);
    }
}



/*
Displays an error message
    - message (String) the message to display
*/
function handleErr(message) {
    var messageDiv = document.getElementById("message-div");
    messageDiv.style.backgroundColor = '#f66';
    messageDiv.innerHTML = message;
    messageDiv.style.visibility = "visible";
}

/*
Displays an informational (ie. non-error) message
    - message (String) the message to display
*/
function handleMessage(message) {
    var messageDiv = document.getElementById("message-div");
    messageDiv.style.backgroundColor = '#9d9';
    messageDiv.innerHTML = message;
    messageDiv.style.visibility = "visible";
}


