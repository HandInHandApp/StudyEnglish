angular.module('firebaseConfig', ['firebase'])

.run(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDj4hXV-bz6HEj2edPxdmdt9puy4PVeLp0",
    authDomain: "handinhand-11eed.firebaseapp.com",
    databaseURL: "https://handinhand-11eed.firebaseio.com",
    storageBucket: "handinhand-11eed.appspot.com",
  };
  firebase.initializeApp(config);

})

/*

.service("TodoExample", ["$firebaseArray", function($firebaseArray){
    var ref = firebase.database().ref().child("todos");
    var items = $firebaseArray(ref);
    var todos = {
        items: items,
        addItem: function(title){
            items.$add({
                title: title,
                finished: false
            })
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        }
    }
    return todos;
}])

*/