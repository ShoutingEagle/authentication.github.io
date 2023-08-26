if(localStorage.getItem('user')){
  showMessage("Already Logged In","success");
}

document.getElementById('signup').addEventListener('click', () => {
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if(password !== confirmPassword){
      showMessage("Passwords do not match !","error");
      return;
    }
  
    if (name && email) {
      const accessToken = generateAccessToken();
      const user = { name, email, password,accessToken };
  
      localStorage.setItem('user', JSON.stringify(user));
      showMessage("Successfully Signed In","success");
      window.location.href = 'profile.html'; 
    } else {
      showMessage('All fields are mandatory', 'error');
    }
  });
  
  function generateAccessToken() {
    return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
  }
  
  function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = message;
    if(type == "success"){
      messageDiv.style.color = "green";
    }
    else{
      messageDiv.style.color = "red";
    }
    
    setTimeout(() => {
      messageDiv.innerHTML = '';
      // messageDiv.className = '';
    }, 3000);
  }