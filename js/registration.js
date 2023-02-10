function checkEmail(email) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://ecommerce-cc5d.restdb.io/rest/customer",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "63d78a453bc6b255ed0c4471",
      "cache-control": "no-cache"
    }
  }

  $.ajax(settings).done(function (response) {
    for (var i = 0; i < response.length; i++) {
      if (response[i].email === email) {
        alert("Email already exists in the database.");
        return false;
      }
    }
        return true;
      });
    }
    
//[STEP 0]: Make sure our document is A-OK
$(document).ready(function () {
    //what kind of interface we want at the start 
    const APIKEY = "63d78a453bc6b255ed0c4471";
  
    //[STEP 1]: Create our submit form listener
    $("#create-account").on("click", function (e) {
      //prevent default action of the button 
      e.preventDefault();

  
      //[STEP 2]: let's retrieve form data
      //for now we assume all information is valid
      //you are to do your own data validation
      let createName = $("#create-name").val();
      let createEmail = $("#create-email").val();
      let createPassword = $("#create-password").val();
      let checkpassword = $("#create-passwordcheck").val();
      let createCustomer = $("#create-customer").val();
      let createGender = $("#create-gender").val();
      
      if (!createName) {
        alert("Name field is required.");
        return false;
      }
      if (!createEmail) {
        alert("Email field is required.");
        return false;
      }
      checkEmail(createEmail)

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(createEmail)) {
        alert("Email is not valid.");
        return false;
      }
      if (!createPassword) {
        alert("Password field is required.");
        return false;
      }
      if (createPassword !== checkpassword) {
        alert("Passwords do not match.");
        return false;
      }
      if (!createGender) {
        alert("Password field is required.");
        return false;
      }
       
      //[STEP 3]: get form values when user clicks on send
      //Adapted from restdb api
      let jsondata = {
        "name": createName,
        "email": createEmail,
        "password": createPassword,
        "customer": createCustomer,
        "gender": createGender,
        
      };
  
      //[STEP 4]: Create our AJAX settings. Take note of API key
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ecommerce-cc5d.restdb.io/rest/customer",
        "method": "POST", 
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata),
        "beforeSend": function(){
          //@TODO use loading bar instead
          //disable our button or show loading bar
          $("#contact-submit").prop( "disabled", true);
          //clear our form using the form id and triggering it's reset feature
          $("#add-contact-form").trigger("reset");
        }
      }
  
      //[STEP 5]: Send our ajax request over to the DB and print response of the RESTDB storage to console.
      $.ajax(settings).done(function (response) {
        console.log(response);
        
        $("#contact-submit").prop( "disabled", false);
        window.location.href = "product.html";
        localStorage.setItem('loginemail',contactEmail)
      });
    });//end click 

  })
