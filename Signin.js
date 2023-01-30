//[STEP 0]: Make sure our document is A-OK
$(document).ready(function () {
    //what kind of interface we want at the start 
    const APIKEY = "63d7a9893bc6b255ed0c447f"; 
    //[STEP 1]: Create our submit form listener
    $("#contact-signin").on("click", function (e) {
      //prevent default action of the button 
      e.preventDefault();
      contactcheck();
  
      //[STEP 2]: let's retrieve form data
      //for now we assume all information is valid
      //you are to do your own data validation
      let loginemail = $("contact-email").val();
      let loginpassword = $("#contact-password").val();
      let admincheck = $("#contact-admincheck").val();
      let customercheck = $("#contact-customercheck").val();
      
      //[STEP 3]: get form values when user clicks on send
      //Adapted from restdb api
      let jsondata = {
        "email": loginemail,
        "password": loginpassword,
        "admin" : admincheck,
        "customer": customercheck,
      };

      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://websites-1948.restdb.io/rest/login-information",
        "method": "GET", 
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
      }

    });//end 

    //let's create a function to allow you to retrieve all the information in your contacts
    //by default we only retrieve 10 results
    function contactcheck(limit = 10, all = true) {
  
      //[STEP 7]: Create our AJAX settings
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://websites-1948.restdb.io/rest/login-information",
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
        let admincheck = "admin";

      
          for (var i = 0; i < response.length && i < limit; i++) {
            if (emailcheck == response[i].email && passwordcheck == response[i].password && response[i].customer === true){
              window.location.href = "homepage.html";
              } 
            else if(emailcheck == response[i].email && passwordcheck == response[i].password && response[i].admin === true){
              window.location.href = "admin.html";
            };
            
          }
      }
      )
    }
  }
)
