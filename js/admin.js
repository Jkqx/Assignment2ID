function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
  }
// const loginInfo = localStorage.getItem('loginname');
// console.log(loginInfo);
// document.getElementById("butons").innerHTML = `<div class="welcome-message">Welcome, ${loginInfo}</div>`;
//[STEP 0]: Make sure our document is A-OK
$(document).ready(function () {
  //what kind of interface we want at the start 
  const APIKEY = "63d78a453bc6b255ed0c4471";
  getContacts();
  console.log("hi")
  $("#update-contact-container").hide();
  $("#add-update-msg").hide();
  

  //[STEP 1]: Create our submit form listener
  $("#create-submit").on("click", function (e) {
    //prevent default action of the button 
    e.preventDefault();

    //[STEP 2]: let's retrieve form data
    //for now we assume all information is valid
    //you are to do your own data validation
    let createName = $("#create-name").val();
    let createEmail = $("#create-email").val();
    let createPassword = $("#create-password").val();
    let createCustomer = $("#create-customer").val();
    let createAddress = $("#create-address").val();
    let createPhone = $("#create-phone").val();
    let createGender = $("#create-gender").val();
    
    

    //[STEP 3]: get form values when user clicks on send
    //Adapted from restdb api
    let jsondata = {
      "name": createName,
      "email": createEmail,
      "password": createPassword,
      "customer": createCustomer,
      "address": createAddress,
      "phone": createPhone,
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
      
      $("#create-submit").prop( "disabled", false);

      //update our table 
      getContacts();
    });
  });//end click 


  //[STEP] 6
  //let's create a function to allow you to retrieve all the information in your contacts
  //by default we only retrieve 10 results
  function getContacts(limit = 40, all = true) {

    //[STEP 7]: Create our AJAX settings
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://ecommerce-cc5d.restdb.io/rest/customer",
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
      let content = "";
      contactcount = 0

      for (var i = 0; i < response.length && i < limit; i++) {
        console.log(i)
        content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
        <td>${response[i].email}</td>
        <td>${response[i].password}</td>
        <td><a href='#contact-list' class='delete' data-id='${response[i]._id}'>Del</a></td>
        <td><a href='#update-contact' class='update' data-id='${response[i]._id}' data-name='${response[i].name}' data-email='${response[i].email}' data-password ='${response[i].password}'>Update</a></td></tr>`;
        contactcount += 1;

        
        //dump the content into our table body
        $("#contact-list tbody").html(content);
  
        $("#total-contacts").html(contactcount);
        }
      }
    )
  }
    $("#contact-list").on("click", ".update", function (e) {
      e.preventDefault();
      //update our update form values
      let contactName = $(this).data("name");
      let contactEmail = $(this).data("email");
      let contactPassword = $(this).data("password");
      let contactId = $(this).data("id");
      
      
      //[STEP 11]: Load in our data from the selected row and add it to our update contact form 
      $("#update-contact-name").val(contactName);
      $("#update-contact-email").val(contactEmail);
      $("#update-contact-password").val(contactPassword);
      $("#update-contact-id").val(contactId);
      $("#update-contact-container").show();
  
    });//end contact-list listener for update function
  
    //[STEP 12]: Here we load in our contact form data
    //Update form listener
  $("#update-contact-submit").on("click", function (e) {
      e.preventDefault();
      //retrieve all my update form values
      let contactName = $("#update-contact-name").val();
      let contactEmail = $("#update-contact-email").val();
      let contactPassword = $("#update-contact-password").val();
      let contactId = $("#update-contact-id").val();
      console.log(contactId)
      
  
      //[STEP 12a]: We call our update form function which makes an AJAX call to our RESTDB to update the selected information
      updateForm(contactId, contactName, contactEmail, contactPassword);
    });//end updatecontactform listener
  
    //[STEP 13]: function that makes an AJAX call and process it 
    //UPDATE Based on the ID chosen
    function updateForm(id, contactName, contactEmail, contactPassword) {
      //@TODO create validation methods for id etc. 
  
      var jsondata = { "name": contactName, "email": contactEmail, "password": contactPassword };
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://ecommerce-cc5d.restdb.io/rest/customer/${id}`,//update based on the ID
        "method": "PUT",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
      }
      
      //[STEP 13a]: send our AJAX request and hide the update contact form
      $.ajax(settings).done(function (response) {
        console.log("working")
        console.log(response);

        $("#update-contact-container").fadeOut(5000);
        //update our contacts table
        getContacts();
      });
    //end updateform function
  //[Step 14]: delete 
  $("#contact-list").on("click", ".delete", function (e) {
    e.preventDefault();
    
    console.log("delete");
    let contactId =$(this).data("id");
    $("#delete-contact-container").show();
    deleteRecord(contactId);
    $("#delete-contact-container").fadeOut(5000);
    getContacts();
  });
  
  function deleteRecord(id) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://ecommerce-cc5d.restdb.io/rest/customer/${id}`,
      "method": "DELETE",
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
    }; 
    $.ajax(settings).done(function (response){
      console.log(response);
    });   
  }
  
  function deleteRecord(id) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://ecommerce-cc5d.restdb.io/rest/login/${id}`,
      "method": "DELETE",
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
    };
    $.ajax(settings).done(function (response){
      console.log(response);
    });   
  }

  function deleteRecord2(id) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://websites-1948.restdb.io/rest/login-information/${id}`,
      "method": "DELETE",
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
    };https://ecommerce-cc5d.restdb.io/rest/customer  
    $.ajax(settings).done(function (response){
      console.log(response);
    });   
  }
}})