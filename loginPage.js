
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
  
  //Validating data with server
  try {
    const response = await fetch('https://nodeserver-rgga.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password}),
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message); // Login successful with Successful Message
        location.reload();
    } else {
        if (data.uname==''){
          document.querySelector('.signup input[name="txt"]').value='';//Setting username to null
        }
        else if(data.email==''){
          document.querySelector('.signup input[name="email"]').value='';//Setting email to null
        }
        alert(data.message); // Show error message
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

