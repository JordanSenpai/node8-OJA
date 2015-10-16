//Yo! What up my glip glops!

//REQUIRES\\


var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');


//"I'm sorry, Morty. It's a bummer. 
//In reality you're as dumb as they come."

//CREATE EXPRESS APP\\


var app = express();


//We need a hang glider, and a crotch less uncle sam costume,
//and I want the entire field of your largest stadium covered end to end with naked red heads,
//and I want the stands packed with every man that remotely resembles my father.

//CONNECT TO MONGODB\\


mongoose.connect('mongodb://localhost/mycompanyname');

var applicantSchema = {
	name   : String,
	bio    : String,
	skills : String,
	years  : Number,
	why    : String
}

var Applicant = mongoose.model('Applicant', applicantSchema)


//This isn't Game of Thrones, Morty

//APPLICATION CONFIG\\


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


//Aww, gee, you got me there, Rick.

//ROUTES\\


app.get('/', function(req, res) {
	res.sendFile('html/index.html', {root : './public'});
});


// You're like Hitler, except...Hitler cared about Germany,
// or something

//LIST OF APPLICANTS\\


app.get('/applicants', function(req, res){
	res.sendFile('html/applicants.html', {root : './public'});
});

var applicantArray = []

app.get('/retrieveApplicants', function(req, res){
	Applicant.find({}, function(err, data){

		for(var i = 0; i < data.length; i++){
			var obj = {}
			applicantArray.push(data[i].name)
		}
		res.send(applicantArray)
	})
})


//If I've learned one thing, it's that before you get anywhere in life,
//you gotta stop listening to yourself.

//CREATES APPLICANT\\


app.post('/applicant', function(req, res){

	var newApplicant = new Applicant({
		name   : req.body.name,
		bio    : req.body.bio,
		skills : req.body.skills,
		years  : req.body.years,
		why    : req.body.why,
	})

	newApplicant.save(function(err, data){
		console.log(err)
	})

	res.send('Congrats you are qualified to sleep with my grandson!');
});


//Do you know how many characters there are in the Simpsons Morty?
//There's like a-a BILLION CHARACTERS, M-Morty. 
//There was an episode where Former President BUSH was their neighbor!

//REMOVES APPLICANT\\


app.get('/removeApplicant', function(req, res){
	console.log("remove")

})


//You're not gonna believe this, because it usually never happens, but I made a mistake

//=-=-=-=-= Create Server and Listen for Connections =-=-=-=-=-=-=-\\


var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})