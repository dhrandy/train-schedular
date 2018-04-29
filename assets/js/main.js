// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyCf_kGGrwNt4k4OaM1DVL6KJ2rmYf72Cgs",
    authDomain: "train-schedule-1dcbb.firebaseapp.com",
    databaseURL: "https://train-schedule-1dcbb.firebaseio.com",
    projectId: "train-schedule-1dcbb",
    storageBucket: "",
    messagingSenderId: "1049644383811"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#role-input").val().trim();
    var firstTrainTime = $("#start-input").val().trim();
    var frequency = $("#rate-input").val().trim();
    var nextArrival = moment(firstTrainTime, 'HH:mm').add(frequency, 'minutes').format("HH:mm")
    console.log(nextArrival);
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      dest: trainDest,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
      nextArrival: nextArrival
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.trainDest);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);
    console.log(newTrain.nextArrival);
  
    // Alert
    alert("Sucessfully Added New Train");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding train times to the database and a row in the html when a user adds an entry

  
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var firstTrainTime = moment(childSnapshot.val().firstTrainTime, 'HH:mm');
    var frequency = childSnapshot.val().frequency;
    var nextArrival = childSnapshot.val().nextTrain;

    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var minsNextTrain = frequency - tRemainder;
    var nextTrain = moment().add(minsNextTrain, "minutes");
    var nextTrainConverted = moment(nextTrain).format("HH:mm");

    // Train Info
    console.log("train name: " + trainName);
    console.log("train dest: " + trainDest);
    console.log("first train time: " + firstTrainTime);
    console.log("frequency: " + frequency);
    console.log("time left: " + minsNextTrain);
    console.log("difference: " + diffTime);
    console.log("next train time: " + nextTrainConverted)
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    frequency + "</td><td>" + nextTrainConverted + "</td><td>" + minsNextTrain + "</td></tr>");

    // setInterval(function(){updateData()},10000);
  });




