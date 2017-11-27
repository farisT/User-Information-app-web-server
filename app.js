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


app.post("/suggestion", function(req,res) {
	console.log("reached")
	fs.readFile('./users.json',function(err,data) {
		 if (err) { throw err };
		 var letsSuggest = JSON.parse(data)
		 var suggest = req.body.input
		 var list = []
		 console.log("Suggest", suggest)

		 for (var i = 0; i < letsSuggest.length; i++) {
		 	// if(req.body.input!==""){
            if (letsSuggest[i].firstname.toLowerCase().match(suggest) || (letsSuggest[i].lastname.toLowerCase().match(suggest)) || (letsSuggest[i].email.toLowerCase().match(suggest)) ) {
                console.log("WOOOHOO")
                // res.json({firstname:letsSuggest[i].firstname, lastname:letsSuggest[i].lastname, email:letsSuggest[i].email})
                list.push(letsSuggest[i].firstname + " "  + letsSuggest[i].lastname + " | ")
               
                
                
            }
            

        }
        if (letsSuggest.length !==0){
        	console.log("we did it")
        	res.json({input:list})
        }
        // if (!found){res.end()}


      






	})

})



app.listen(3003, () => {
    console.log("listening")
})


