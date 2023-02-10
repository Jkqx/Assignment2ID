//[STEP 0]: Make sure our document is A-OK
$(document).ready(function () {
  //what kind of interface we want at the start 
  const APIKEY = "63d78a453bc6b255ed0c4471"; 
  //[STEP 1]: Create our submit form listener
  $("#contact-signin").on("click", function (e) {
    //prevent default action of the button 
    e.preventDefault();
    contactcheck();
  })

  //let's create a function to allow you to retrieve all the information in your contacts
  //by default we only retrieve 10 results
  function contactcheck(limit = 10, all = true) {

    //[STEP 7]: Create our AJAX settings
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://ecommerce-cc5d.restdb.io/rest/contact",
      "method": "GET", //[cher] we will use GET to retrieve info
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
    }

    //[STEP 8]: Make our AJAX calls
    //Once we get the response, we modify our table content by creating the content internally. We run a loop to continously add on data
    //RESTDb/NoSql always adds in a unique id for each data, we tap on it to have our data and place it into our links 
    $.ajax(settings).done(function (response) {
      //check the what the "i" is for debugs.
      let emailcheck = document.getElementById("contact-email").value;
      let passwordcheck = document.getElementById("contact-password").value;

    
        for (var i = 0; i < response.length && i < limit; i++) {
          if (emailcheck == response[i].email && passwordcheck == response[i].password && response[i].customer === true){
            console.log(response[i].name)
            
            document.getElementById("profile").innerHTML = "Welcome, " + response[i].name;
            window.location.href = "customer.html";
            } 
          else if(emailcheck == response[i].email && passwordcheck == response[i].password && response[i].admin === true){

            window.location.href = "admin.html";
            localStorage.setItem('loginname',response[i].name);
          };
          
        }
    }
    )
  }
}
)