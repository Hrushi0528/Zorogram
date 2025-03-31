document.addEventListener('DOMContentLoaded', () => {
  // Get references to form elements
  const user_field = document.querySelector('.signup input[name="txt"]');
  const email_field = document.querySelector('.signup input[name="email"]');
  const re_pass_field = document.querySelector('.signup input[name="re-pswd"]');
  const pass_field = document.querySelector('.signup input[name="pswd"]');

  const login_pass_field=document.querySelector('.login input[name="pswd"]');
  const login_user_field=document.querySelector('.login input[name="email"]');


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

  let errorloginmessage = document.getElementById("login-error");
  if (!errorloginmessage) {
    errorloginmessage = createErrorMessageElement("login-error");
    if (login_pass_field && login_pass_field.parentNode) { // Check if user_field and parent exist
      login_pass_field.parentNode.insertBefore(errorloginmessage, login_pass_field.nextSibling);
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

  if (pass_field) {
    pass_field.addEventListener('input', () => {
      if (errorMessagePass) errorMessagePass.innerText = '';
      pass_field.style.border = "none";
    });
  }

  if (re_pass_field,pass_field) {
    re_pass_field.addEventListener('input', () => {
      if (errorMessagePass) errorMessagePass.innerText = '';
      re_pass_field.style.border = "none";
      if(pass_field.value !== re_pass_field.value){
        re_pass_field.style.border="2px solid red";
        errorMessagePass.innerText="Password doesn't Match";
        document.getElementById('signup-btn').disabled=true;
      }
      else{
        re_pass_field.style.border="none";
        errorMessagePass.innerText = '';
        document.getElementById('signup-btn').disabled=false;
      }
    });
  }
  pass_field.addEventListener('input',()=>{
    if (pass_field.value === re_pass_field.value){
      re_pass_field.style.border="none";
      errorMessagePass.innerText = '';
    }
  });

  if (login_user_field) {
    login_user_field.addEventListener('input', () => {
      if (errorloginmessage) errorloginmessage.innerText = '';
      login_user_field.style.border = "none";
    });
  }
  
  if (login_pass_field) {
    login_pass_field.addEventListener('input', () => {
      if (errorloginmessage) errorloginmessage.innerText = '';
      login_pass_field.style.border = "none";
    });
  }
});
  



// Helper function to create error message elements
function createErrorMessageElement(id) {
  const element = document.createElement("div");
  element.id = id;
  element.style.color = "red";
  element.style.fontSize = "16px";
  element.style.fontWeight = "bold";
  element.style.marginTop = "1px";
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

  let errorloginmessage = document.getElementById("login-error");

  const main=document.querySelector('.main');
  const loading=document.querySelector('.loader');
  
  main.style.display='none';
  loading.style.display='block';
  //Validating data with server
  try {
    const response = await fetch('https://nodeserver-rgga.onrender.com/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    loading.style.display='none';
    if (response.ok) {
        console.log("Login Response:", data);
        page_response('Login Successful !!',1,"index.html");

    } else {
      main.style.display='block';
          if(data.email===''){
            document.querySelector('.login input[name="email"]').value='';//Setting username to null
            document.querySelector('.login input[name="email"]').style.border="2px solid red";
            document.querySelector('.login input[name="pswd"]').value='';
            errorloginmessage.innerText = data.message;// Show error message
          }
          else if(data.pass===''){
            document.querySelector('.login input[name="pswd"]').value='';
            document.querySelector('.login input[name="pswd"]').style.border="2px solid red";
            errorloginmessage.innerText = data.message;// Show error message
          }
        }
  } 

  //When there is an error in retrieving the data from server
  catch (error) {
    loading.style.display='none';
    console.error('Error:', error);
    page_response("Server Busy !!",0);
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

  const main=document.querySelector('.main');
  const loading=document.querySelector('.loader');
  
  if (username.length<4){
    document.querySelector('.signup input[name="txt"]').value='';//Setting username to null
    let user_field=document.querySelector('.signup input[name="txt"]');
    user_field.style.border="2px solid red";
    errorMessageUsername.innerText='Invalid Username';
    return;
  }
  if(password.length<6){
    document.querySelector('.signup input[name="pswd"]').value='';
    document.querySelector('.signup input[name="re-pswd"]').value='';//Setting username to null
    let pass_field=document.querySelector('.signup input[name="pswd"]');
    pass_field.style.border="2px solid red";
    errorMessagePass.innerText='Password Too Short';
    return;
  }
  main.style.display='none';
  loading.style.display='block';

  //Validating data with server
  try {
    const response = await fetch('https://nodeserver-rgga.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password,re_password}),
    });

    const data = await response.json();
    
    if (response.ok) {
      loading.style.display='none';
        page_response('User Added !!',1,"loginPage.html");
    } else {
        setTimeout(()=>{
          loading.style.display='none';
         main.style.display='block'; 
        },500);
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
    loading.style.display='none';
    console.error('Error:', error);
    page_response("Server Busy !!",0);
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

function page_response(msg,option,next_page){
  document.querySelector('.Page_response').style.display='block';
  const msg_field=document.querySelector('.response_msg');

  if (option === 1){
      document.getElementById('response_img1').style.display='block';
      msg_field.innerHTML=msg;
    setTimeout(()=>{
      document.querySelector('.Page_response').style.display='none';
      document.getElementById('response_img1').style.display='none';
      window.location.href = next_page;
    },2000);
  }

  else if(option === 0){
      document.getElementById('response_img2').style.display='block';
      msg_field.innerHTML=msg;
    setTimeout(()=>{
      document.querySelector('.Page_response').style.display='none';
      document.getElementById('response_img2').style.display='none';
      location.reload();
    },2000);
  }
}
