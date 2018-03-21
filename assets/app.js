  var config = {
    apiKey: "AIzaSyBmzxJWc3mbE_4fThFSgVUXkfCQkkQ0cfc",
    authDomain: "train-schedule-94ed5.firebaseapp.com",
    databaseURL: "https://train-schedule-94ed5.firebaseio.com",
    projectId: "train-schedule-94ed5",
    storageBucket: "",
    messagingSenderId: "193709842693"
  };
  firebase.initializeApp(config);

var database = firebase.database();


 $("#addTrainBtn").on("click", function(event) {
   event.preventDefault();
 
   var trainName= $("#exampleInputtrainName").val().trim();
   var destination = $("#exampleInputDestination").val().trim();
   var trainTime = $("#exampleInputtrainTime").val().trim();
   var frequency = $("#exampleInputFrequency").val().trim();
   
  var newTrain = {
   name: trainName,
   place: destination,
   trainTime: trainTime,
   freq: frequency

  }
 
 console.log(newTrain);
  database.ref().push(newTrain);

   $("#exampleInputtrainName").val("");
   $("#exampleInputDestination").val("");
   $("#exampleInputtrainTime").val("");
   $("#exampleInputFrequency").val("");

   return false;

 });

  database.ref().on("child_added", function(childSnapshot) {

   console.log(childSnapshot.val().trainName);
   console.log(childSnapshot.val().destination);
   console.log(childSnapshot.val().trainTime);
   console.log(childSnapshot.val().frequency);

 
   var trainName = childSnapshot.val().name;
   var destination = childSnapshot.val().place;
   var trainTime = childSnapshot.val().trainTime;
   var frequency = childSnapshot.val().freq;

   var firstTimeConverted = moment(trainTime, "HH:mm");

   var currentTime = moment().format("HH:mm");
 
   var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");

   var timeReminder = timeDiff % frequency;

   var minToTrain = frequency - timeReminder;

   var nextTrain = moment().add( minToTrain, "minutes").format("HH:mm");

   $("#trainTable").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>"+ frequency  + "</td><td>"  + nextTrain + "</td><td>" + minToTrain + "</td></tr>");

   });