
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBFp7YYQ7VigPFqm6Vow_a8VDusTdOSlRk",
    authDomain: "train-schedule-9371c.firebaseapp.com",
    databaseURL: "https://train-schedule-9371c.firebaseio.com",
    projectId: "train-schedule-9371c",
    storageBucket: "train-schedule-9371c.appspot.com",
    messagingSenderId: "757481803878"
  };
  firebase.initializeApp(config);

  var trainDatabase = firebase.database();

  

  
   
 
// Testing the database to make sure I can get and see data
//   trainData.ref().set({
//       "name" : "Ferenc"
//   });

//   trainData.ref().push({
//     "name" : "Ferenc"
// });

//   trainData.ref().once("value").then(function(snapshot){
//       console.log(snapshot.val());
//   })

  $("#addTrainBtn").on("click", function() {
     
      
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10,"years").format("X");
      var frequency = $("#frequencyInput").val().trim();

      var newTrain = {
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency

      }

      trainDatabase.ref().push(newTrain);

      alert("Train Added");

      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#firstTrainInput").val("");
      $("#frequencyInput").val("");

      return false;
      
  })

  trainDatabase.ref().on("child_added", function(snapshot) {
      var name = snapshot.val().name;
      var destination = snapshot.val().destination;
      var frequency = snapshot.val().frequency;
      var firstTrain = snapshot.val().firstTrain;

      var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
      var minutes = frequency - remainder;
      var arrival = moment().add(minutes,"n").format("hh:mm A");

      console.log(remainder);
      console.log(minutes);
      console.log(arrival);  

      
      $("#trainTable > tbody").append("<td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td>");
      console.log(destination, frequency, arrival, minutes);
  })


