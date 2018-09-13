  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB5WTP72v5opHcG64QNk33Kl9XheradMkc",
    authDomain: "bookbank-79df6.firebaseapp.com",
    databaseURL: "https://bookbank-79df6.firebaseio.com",
    projectId: "bookbank-79df6",
    storageBucket: "bookbank-79df6.appspot.com",
    messagingSenderId: "180794152476"
  };
  firebase.initializeApp(config);

var name_print;
// Reference messages collection
var messagesRef = firebase.database().ref('users');

function gotosearch()
{
    window.location.href="search.htm";
}
function gotoreturn()
{
    window.location.href="return.htm";
}
// Submit form
function submitForm(){
  var name = getInputVal('name');
  var username= getInputVal('username');
  var dob=document.getElementById('dob');
  var dobmonth=document.getElementById('dobmonth');
  var dobyear=document.getElementById('dobyear');
  var dobtxt=dob.options[dob.selectedIndex].value;
  var dobmonthtxt=dobmonth.options[dobmonth.selectedIndex].value;
  var dobyeartxt=dobyear.options[dobyear.selectedIndex].value;	
  var email = getInputVal('email1');
  var password = getInputVal('pass1');
  // Save message
  saveMessage(name,username,dobtxt,dobmonthtxt,dobyeartxt,email, password);
  alert("Added successfully");
}


// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name,username,dobtxt,dobmonthtxt,dobyeartxt,email, password){
  var newMessageRef = messagesRef.child(username);
  var key=newMessageRef.key;
  newMessageRef.set({
	name: name,
    username: username,
    dob: dobtxt,
    dobmonth: dobmonthtxt,
    dobyear: dobyeartxt,
    email: email,
    password:password,
	books:"",
	key: key,
  });

}
function addbook(book)
{
    var d=new Date();
    var date=Date.parse(d);
	var updatebook=firebase.database().ref("users/"+localStorage.getItem("username")+"/books/").child(book);
	updatebook.set({
    	book:book,
        date: date
	});
    alert("book entered successfully");
}

function removebook(book,time)
{
      var d=new Date();
    var date=Date.parse(d);
    var date_diff=date-time;
    date_diff=(date_diff/8640000);
    if(date_diff<=7)
        {
		var rembook=firebase.database().ref("users/"+localStorage.getItem("username")+"/books/").child(book).remove();
        alert("remove book success, book kept for: "+date_diff+" days");
        }
    else{
        var xxxx=prompt('paid fine? yes/no');
        if(xxxx=='yes')
            {
                var rembook=firebase.database().ref("users/"+localStorage.getItem("username")+"/books/").child(book).remove();
                alert("remove book success, book kept for: "+date_diff+" days");
            }
    }
    document.location.reload(true);
}

function checkuser()
{
  var email_check=getInputVal('email2');
  var password_check=getInputVal('pass2');
  firebase.database().ref().child("users").orderByChild("username").equalTo(email_check).on('value',function(snapshot)
  {
    if(snapshot.exists())
    {
      firebase.database().ref().child("users").orderByChild("password").equalTo(password_check).on('value',function(snapshot_1)
      {
        if(snapshot_1.exists())
        {
            localStorage.setItem("username",email_check);
            window.location.href="login.htm";
        }
        else
        {
          alert("wrong password");
        }
      });
    }
    else
    {
      alert("user doesnt exists");
    }
  });
}
function asd(a) {
            if (a == 1) {
                document.getElementById("signupform").style.display = "none";
                document.getElementById("loginform").style.display = "block";
            } else {
                document.getElementById("signupform").style.display = "block";
                document.getElementById("loginform").style.display = "none";
            }
        }
