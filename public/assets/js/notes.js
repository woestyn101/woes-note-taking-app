
// setting variabls from html id
const divE = document.getElementById('list');
var userTitle = document.getElementById("title");
var userText = document.getElementById("text");
var saveBtn = document.getElementById("postbutton");
var clearBtn = document.getElementById("clearbutton");
var newBtn = document.getElementById("newbutton");

// setting buttons to hide
saveBtn.style.display = "none";
clearBtn.style.display = "none";
newBtn.style.display = "none";

// clear button click
clearBtn.addEventListener("click", clearForm);

// clear form fields values
function clearForm(){
    userTitle.value = "";
    userText.value = "";
    
}

// new button click function
newBtn.addEventListener("click", newNote);

// new button function to clear form fields and hide newBtn
function newNote(){
  userTitle.removeAttribute('readonly');
  userText.removeAttribute('readonly');
    userTitle.value = "";
    userText.value = "";
     newBtn.style.display = "none";
}

// adding eventlisteners to input fields
   userTitle.addEventListener('keyup', show );
  userText.addEventListener('keyup', show );

  //hiding save and clear buttons
  function show(){
    
    if (userTitle.value != ""){
        saveBtn.style.display = "inline";
        clearBtn.style.display = "inline";
    }
   
  }

// getting notes from db.json
const getNotes = () =>
  fetch('/notes/data', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => {
       return data;
      });
      
      // setting empty arrar for db.json data
      var textobject = [];
     
      // outputting db.json data to html
    function renderNotes(note){
        var divTitle = document.createElement("div");
        var divText = document.createElement("div");
            
       
        divTitle.classList.add('title-list');
        divTitle.innerHTML = note.title;
        divText.innerHTML = note.text;
        textobject.push(note.title);
        textobject.push(note.text);
        textobject.push(note.id);
        divE.appendChild(divTitle);
               
     
        
        
        // outputting note text to form field
        divE.addEventListener('click', viewNote);
       
            }
   
            // function to view title and text  in form fields
     function viewNote(event){
        
       userTitle.value = event.target.textContent;
      

        //finding index of title in array
        let titleIndex = textobject.findIndex(x => x == event.target.textContent);
       // getting text value from array
        userText.value = textobject[titleIndex + 1];

        //displaying new btn
        newBtn.style.display = "inline";

        //hiding new btn
        saveBtn.style.display = "none";
        clearBtn.style.display = "none";

        userTitle.setAttribute('readonly', true);
        userText.setAttribute('readonly', true);
        
     }       

      // getting notes from db.json and outputting to html
    getNotes().then((response) => response.forEach((item) => renderNotes(item)));

    
   // savebtn click 
    saveBtn.addEventListener("click", postData);
    
    // fuction to post new data to db.json
      function postData() {

        // getting data from input fields
        var data = {
          title: userTitle.value,
          text: userText.value,
        
        };

        // using fetch to post new data
        fetch("/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
           
            return response.text();
          })
          .then((data) => {
            console.log(data);
          //   setTimeout(function(){
          //     window.location.reload();
          //  }, 500);
                               
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });

         
       
       
      }

