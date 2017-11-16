const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const parser = require("json-parser");
var fs = require('fs');
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.set('view engine', 'pug')

app.get("/", (req, res) => {//// this is to give the list
    fs.readFile('./users.json', 'utf8', function(err, data) {
        if (err) { throw err };
        var obj = JSON.parse(data);
        res.render("index", { title: "Index", obj: obj });
    })
    
})


app.post("/search", function(req, res) {
    fs.readFile('./users.json', 'utf8', function(err, data) {
        if (err) { throw err };
        var obj = JSON.parse(data);
        for (var i = 0; i < obj.length; i++) {
            if (req.body.first == obj[i].firstname || req.body.last == obj[i].lastname || req.body.email == obj[i].email) {
                res.render("search", { title: "search", thisFirst:(obj[i].firstname),thisLast:(obj[i].lastname),thisEmail:(obj[i].email)  })

            }
        }
    })
})

app.get("/create", (req,res) => {
	res.render("create")
})


app.post("/make", function(req, res) {
	
	fs.readFile('./users.json', 'utf8', function(err, data) {
        if (err) { throw err };
        var oldusers = JSON.parse(data);
        // res.render("index", { obj: obj });
 		// res.send("we saved you")

 		//res.redirect ("/")

      


	var newuser1={
		"firstname" : req.body.first,
		"lastname" : req.body.last,
		"email" : req.body.email
	}

	oldusers.push(newuser1)

  	fs.writeFile('./users.json',JSON.stringify(oldusers),function(err) {
        if (err) { throw err };
		})
  })
  	res.redirect("/")
  })





app.listen(3003, () => {
    console.log("listening")
})