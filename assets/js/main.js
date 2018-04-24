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
  $("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#employee-name-input").val().trim();
    var trainDest = $("#role-input").val().trim();
    var firstTrainTime = $("#start-input").val().trim();
    var frequency = $("#rate-input").val().trim();
    var nextArrival = moment(firstTrainTime, 'HH:mm').add(frequency, 'minutes').format("HH:mm")
    console.log(nextArrival);
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      dest: trainDest,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
      nextArrival: nextArrival
    };
  
    // Uploads employee data to the database
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
    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var firstTrainTime = moment(childSnapshot.val().firstTrainTime, 'hh:mm a');
    var frequency = childSnapshot.val().frequency;
    var nextArrival = childSnapshot.val().nextTrain;

    var difference = moment().diff(moment.unix(firstTrainTime), "minutes");
    var timeLeft = moment().diff(moment.unix(firstTrainTime), 'minutes') % frequency;
    var mins = moment(frequency - timeLeft, "mm").format('mm');
    var nextTrain = moment().add(mins, "m").format("hh:mm a");


    // Employee Info
    console.log("train name: " + trainName);
    console.log("train dest: " + trainDest);
    console.log("first train time: " + firstTrainTime);
    console.log("frequency: " + frequency);
    console.log("next arrival: " + nextArrival);
    console.log("time left: " + timeLeft);
    console.log("difference: " + difference);
    console.log("next train: " + nextTrain)
  
    // Add each train's data into the table
    $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    frequency + "</td><td>" + nextTrain + "</td><td>" + mins + "</td></tr>");

  });