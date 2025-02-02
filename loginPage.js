document.addEventListener('DOMContentLoaded', () => {
  // Get references to form elements
  const user_field = document.querySelector('.signup input[name="txt"]');
  const email_field = document.querySelector('.signup input[name="email"]');
  const re_pass_field = document.querySelector('.signup input[name="re-pswd"]');
  const pass_field = document.querySelector('.signup input[name="pswd"]');


  // Error message elements (create if they don't exist)
  let errorMessageUsername = document.getElementById("username-error");
  if (!errorMessageUsername) {
    errorMessageUsername = createErrorMessageElement("username-error");
    if (user_field && user_field.parentNode) { // Check if user_field and parent exist
      user_field.parentNode.insertBefore(errorMessageUsername, user_field.nextSibling);
    }
  }

  let errorMessageEmail = document.getElementById("email-error");
  if (!errorMessageEmail) {
    errorMessageEmail = createErrorMessageElement("email-error");
    if (email_field && email_field.parentNode) { // Check if email_field and parent exist
      email_field.parentNode.insertBefore(errorMessageEmail, email_field.nextSibling);
    }
  }

  let errorMessagePass = document.getElementById("password-error"); // Correct ID!
  if (!errorMessagePass) {
    errorMessagePass = createErrorMessageElement("password-error");
    if (re_pass_field && re_pass_field.parentNode) { // Check if pass_field and parent exist
      re_pass_field.parentNode.insertBefore(errorMessagePass, re_pass_field.nextSibling);
    }
  }

  // Event listeners for input changes (clear errors)
  if (user_field) {
    user_field.addEventListener('input', () => {
      if (errorMessageUsername) errorMessageUsername.innerText = '';
      user_field.style.border = "none";
    });
  }

  if (email_field) {
    email_field.addEventListener('input', () => {
      if (errorMessageEmail) errorMessageEmail.innerText = '';
      email_field.style.border = "none";
    });
  }

  if (re_pass_field,pass_field) {
    re_pass_field.addEventListener('input', () => {
      if (errorMessagePass) errorMessagePass.innerText = '';
      re_pass_field.style.border = "none";
      if(pass_field.value !== re_pass_field.value){
        re_pass_field.style.border="2px solid red";
        errorMessagePass.innerText="Password and Re-Enter password does not Match";
      }
      else{
        re_pass_field.style.border="none";
        errorMessagePass.innerText = '';
      }
    });
  }
  pass_field.addEventListener('input',()=>{
    if (pass_field.value === re_pass_field.value){
      re_pass_field.style.border="none";
      errorMessagePass.innerText = '';
    }
  })
});


// Helper function to create error message elements
function createErrorMessageElement(id) {
  const element = document.createElement("div");
  element.id = id;
  element.style.color = "red";
  element.style.fontSize = "10px";
  element.style.fontWeight = "bold";
  element.style.marginTop = "5px";
  element.style.textAlign = "center";
  element.style.display = "block";
  return element;
}

// ... (your sign_up_user and pass functions remain the same)
// Function to validate login credentials
async function validateLoginForm(event) {
  event.preventDefault(); // Prevent form submission

  // Get the email and password from the form inputs
  const username = document.querySelector('.login input[name="email"]').value;
  const password = document.querySelector('.login input[name="pswd"]').value;
  
  //Validating data with server
  try {
    const response = await fetch('https://nodeserver-rgga.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message); // Login successful with Successful Message
        window.location.href = "homePage.html"; // Change 'nextPage.html' to your actual page
    } else {
        alert(data.message); // Show error message
        location.reload(); //Reload the Login Page
    }
  } 

  //When there is an error in retrieving the data from server
  catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
}
}

// Function to validate sign-up credentials
function validateSignupForm(event) {
  event.preventDefault(); // Prevent form submission

  // Perform your signup logic here (for now, just a success message)
  alert("Signup successful");
  window.location.href = "nextPage.html"; // Redirect after signup (change as necessary)
}

async function sign_up_user(event){

  event.preventDefault(); // Prevent form submission

  // Get the email,username and password from the form inputs
  const username = document.querySelector('.signup input[name="txt"]').value;
  const email = document.querySelector('.signup input[name="email"]').value;
  const password = document.querySelector('.signup input[name="pswd"]').value;
  const re_password=document.querySelector('.signup input[name="re-pswd"]').value;

  let errorMessageUsername = document.getElementById("username-error");
  let errorMessageEmail = document.getElementById("email-error");
  let errorMessagePass = document.getElementById("password-error");

  //Validating data with server
  try {
    const response = await fetch('https://nodeserver-rgga.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password,re_password}),
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message); 
        location.reload();
    } else {
        if (data.uname==''){
          document.querySelector('.signup input[name="txt"]').value='';//Setting username to null
          let user_field=document.querySelector('.signup input[name="txt"]');
          user_field.style.border="2px solid red";
          errorMessageUsername.innerText = data.message;
          
        }
        else if(data.email==''){
          document.querySelector('.signup input[name="email"]').value='';//Setting email to null
          let email_field=document.querySelector('.signup input[name="email"]');
          email_field.style.border="2px solid red";
          errorMessageEmail.innerText = data.message;
        }
        else if(data.password==''){
          let pass_field=document.querySelector('.signup input[name="re-pswd"]');
          pass_field.style.border="2px solid red";
          errorMessagePass.innerText=data.message;
        }
    }
  } 

  //When there is an error in retrieving the data from server
  catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
}
}

// Function to validate sign-up credentials
/*function validateSignupForm(event) {
  event.preventDefault(); // Prevent form submission

  // Perform your signup logic here (for now, just a success message)
  alert("Signup successful");
  window.location.href = "nextPage.html"; // Redirect after signup (change as necessary)
}
*/

function pass(inputId, iconId) {
  let passwordField = document.getElementById(inputId);
  let eyeIcon = document.getElementById(iconId);
  
  if (passwordField.type === "password") {
      passwordField.type = "text";
      eyeIcon.src = "eye-open.svg"; // Change to open-eye icon
  } else {
      passwordField.type = "password";
      eyeIcon.src = "eye-close.svg"; // Change to closed-eye icon
  }
}

