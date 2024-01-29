// Import Express.js
const express = require('express');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// import bodyparser to read and output json format
const bodyParser = require('body-parser');

//import fs to read and write files
const fs = require('fs');

//importing db.json file
const noteData = require('./public/assets/db/db.json');

//importing uuid to create unique id's
const uuid = require('uuid');
const { type } = require('os');

// initializing unique id variable
var uniqueID = uuid.v4();


// Initialize an instance of Express.js
const app = express();
// Specify on which port the Express.js server will run
const PORT = 8080;

// Static middleware pointing to the public folder
app.use(express.static('public'));

// middle ware to read json files
app.use(bodyParser.json());

// setting route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

// setting route for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

//setting route for reading data from json file
app.get('/notes/data', (req, res) => {
    res.json(noteData);
});


    // Define your route to handle POST requests
app.post('/notes', (req, res) => {
    // Assuming the request body contains JSON data
    const newData = req.body;

    // Read existing data from the file
    fs.readFile('./public/assets/db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
            return;
        }
       
       // getting new id for new data
        newData.id = uniqueID;
       
        // parson new data into json
        let jsonData = JSON.parse(data);
        
        
        // Add the new data to the existing data
        jsonData.push(newData);

        // Write the updated data back to the file
        fs.writeFile('./public/assets/db/db.json', JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing file');
                return;
            }
           
            res.send('Data saved successfully');            
                  
        
           
        });
       
       
    });

  

});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

