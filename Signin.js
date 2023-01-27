//[STEP 0]: Make sure our document is A-OK
$(document).ready(function () {
    //what kind of interface we want at the start 
    const APIKEY = "63d3e5553bc6b255ed0c437d"; 
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
      
      //[STEP 3]: get form values when user clicks on send
      //Adapted from restdb api
      let jsondata = {
        "email": loginemail,
        "password": loginpassword,
      };

      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ecommerce-cc5d.restdb.io/rest/signin",
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
        "url": "https://ecommerce-cc5d.restdb.io/rest/signin",
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
          if (emailcheck == response[i].email){
            console.log(emailcheck);
            if(passwordcheck == response[i].password){
              console.log(passwordcheck);
              window.location.href = "homepage.html";
            }
          }
          //console.log(response[i]);
          //[METHOD 1]
          //let's run our loop and slowly append content
          //we can use the normal string append += method
          /*
          content += "<tr><td>" + response[i].name + "</td>" +
            "<td>" + response[i].email + "</td>" +
            "<td>" + response[i].message + "</td>
            "<td>Del</td><td>Update</td</tr>";
  
        }
  
        //[STEP 9]: Update our HTML content
        //let's dump the content into our table body
        $("#contact-list tbody").html(content);
  
        $("#total-contacts").html(response.length);
      });
  
  
    }
  */}})}})
