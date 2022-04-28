//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyC_WfPB6K-w7PKLz9KUShzN_r8cyNNJF3U",
      authDomain: "kwitter-final-4e7b2.firebaseapp.com",
      databaseURL: "https://kwitter-final-4e7b2-default-rtdb.firebaseio.com",
      projectId: "kwitter-final-4e7b2",
      storageBucket: "kwitter-final-4e7b2.appspot.com",
      messagingSenderId: "325706547091",
      appId: "1:325706547091:web:1a202818604b89ab02b266",
      measurementId: "G-1JTXTQHHYN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
room_name = localStorage.getItem("room_name");
user_name = localStorage.getItem("user_name");
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>like: " + like + "</span></button><hr>";

                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;
                        //End code

                  }
            });
      });
}
function updateLike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });

}
getData();
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}