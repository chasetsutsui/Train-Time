var config = {
    apiKey: "AIzaSyDl_oMLeLJ3RCfTaeDViyGIeK1Ly2_bXVY",
    authDomain: "traintime-67857.firebaseapp.com",
    databaseURL: "https://traintime-67857.firebaseio.com",
    projectId: "traintime-67857",
    storageBucket: "traintime-67857.appspot.com",
    messagingSenderId: "1039433609187",
    appId: "1:1039433609187:web:1ff937a789fbfd7d5f7ad6"

};

firebase.initializeApp(config);

var trainData = firebase.database();

trainData.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>")
})

$("#addTrainBtn").on("click", function () {
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();
    console.log(firstTrain);

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency

    }

    trainData.ref().push(newTrain);

    alert("train added");

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;

});
