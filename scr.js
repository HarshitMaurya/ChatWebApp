var myFirebase = new Firebase("https://chat-191215.firebaseio.com/");

var usernameInput = document.querySelector("#username");
var textInput = document.querySelector("#text");
var postButton = document.querySelector("#post");
    
postButton.addEventListener("click", function(){

	var msgUser = usernameInput.value;
	var msgText = textInput.value;
	myFirebase.push({username:msgUser, text:msgText});
	textInput.value="";
    textInput.setAttribute("placeholder", "Enter new Message");
	});
textInput.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        postButton.click();
    }
});
 var startListening = function() {
      myFirebase.on('child_added', function(snapshot) {
        var msg = snapshot.val();
      
        var msgUsernameElement = document.createElement("b");
        msgUsernameElement.textContent = msg.username;
        
        var msgTextElement = document.createElement("p");
        msgTextElement.textContent = msg.text;
  
        var msgElement = document.createElement("div");
        msgElement.appendChild(msgUsernameElement);
        msgElement.appendChild(msgTextElement);
        msgElement.className = "msg";


        document.getElementById("results").appendChild(msgElement);
      });
    }

    // Begin listening for data
    startListening();