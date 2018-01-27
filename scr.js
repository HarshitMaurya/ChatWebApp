//Initialising Firebase variable
var myFirebase = new Firebase("https://chat-191215.firebaseio.com/");

//Linking html elements to js variables
var usernameInput = document.querySelector("#username");
var textInput = document.querySelector("#text");
var postButton = document.querySelector("#post");

//connecting post button to Firebase upload
postButton.addEventListener("click", function(){
    
    //Parsing input text as string
    var msgUser = usernameInput.value;
    var msgText = textInput.value;
    
    //Getting date
    var d=new Date();
    var time=d.toLocaleDateString()+" "+d.toLocaleTimeString();
    
    //Push to Firebase
    myFirebase.push({username:msgUser, text:msgText, timeinfo:time });
    
    //Initialising Message Field
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
          
        var msgTimeElement= document.createElement("i");
        msgTimeElement.textContent = msg.timeinfo;
        
        var msgTextElement = document.createElement("p");
        msgTextElement.textContent = msg.text;
  
        var msgElement = document.createElement("div");
        msgElement.appendChild(msgUsernameElement);
        msgElement.appendChild(msgTimeElement);
        msgElement.appendChild(msgTextElement);
        msgElement.className = "msg";


        document.getElementById("results").appendChild(msgElement);
      });
    }

    // Begin listening for data
    startListening();