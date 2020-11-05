var MAX_NUM_CLASSES = 10; // The max number of classes a user can add at one time


/*
Starts us off with 4 class input fields
    - @return (void)*/
function initInputs() {
    addInputField();
    addInputField();
    addInputField();
    addInputField();
}


/*
Adds an input field
    - @return (void)
*/
function addInputField() {
    var container = document.getElementById("container");

    // We can only add up to MAX_NUM_CLASSES input fields
    if (container.childNodes.length <= MAX_NUM_CLASSES) {
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter subject and class ID";
        input.className = "course-input form-control";
        input.addEventListener("keyup", async function(event) {
            validateInput(this, event);
        });
        container.appendChild(input);
    }
}


/*
Validates user input, and fetches the corresponding class
    - obj (Object): The input field which called this
    - event (KeyEvent): the keyEvent
    - @return (void)
*/
async function validateInput(obj, event) {
    // Only go on enter
    if (event.keyCode === 13) {
        event.preventDefault();
        var semester = document.getElementById("semester-selector");
        await handleSingleCourse(obj.value, semester.value);

        /*try {
            
            var output = 
            var name = output[0];
            var coreqs = output[1];

            obj.value = name;
            obj.style.backgroundColor = '#9d9';



            if (coreqs != null) {
                var message = document.getElementById("message-div");
                message.style.backgroundColor = '#9d9';
                message.innerHTML = coreqs;
                message.style.visibility = "visible";
            }
        }
        catch (err) {
            handleErr(err.message);
        }*/
    }
}



function handleErr(message) {
    var messageDiv = document.getElementById("message-div");
    messageDiv.style.backgroundColor = '#f66';
    messageDiv.innerHTML = message;
    messageDiv.style.visibility = "visible";
    setTimeout(function(){ messageDiv.style.visibility = "hidden"; }, 5000);
}

function handleMessage(message) {
    var messageDiv = document.getElementById("message-div");
    messageDiv.style.backgroundColor = '#9d9';
    messageDiv.innerHTML = message;
    messageDiv.style.visibility = "visible";
}


