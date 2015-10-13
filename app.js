//=-=-=-=-=-=-=-=-=-=-=-=- Requires =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-= \\


var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');


//=-=-=-=-=-=-=-=-=- Create Express App =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\\


var app = express();


//=-=-=-=-=-=-=-=-=-=- Connect to MongoDB -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= \\


mongoose.connect('mongodb://localhost/mycompanyname');

var applicantSchema = {
	name   : String,
	bio    : String,
	skills : String,
	years  : Number,
	why    : String
}

var Applicant = mongoose.model('Applicant', applicantSchema)


//=-=-=-=-=-=-=-= Application Config =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


//=-=-=-=-=-=-=-=-=-=-=- Routes =-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=\\


app.get('/', function(req, res) {
	res.sendFile('html/index.html', {root : './public'});
});


//=-=-=-=-=-=-=-=-=- list of applicants -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\


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

//-=-=-=-=-=-=-=--= creates applicant =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\\


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

	res.send('Success!');
});


//=-=-=-=-=-=-=-=-= removes applicant =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\\


app.get('/removeApplicant', function(req, res){
	console.log("remove")

})


//=-=-=-=-= Create Server and Listen for Connections =-=-=-=-=-=-=-\\


var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})