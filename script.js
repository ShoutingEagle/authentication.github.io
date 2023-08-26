const app = document.getElementById('app');

const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  accessToken: localStorage.getItem('accessToken') || null,
};

function renderUI() {
  app.innerHTML = state.user
    ? `<div class="profile">
         <h2>Welcome, ${state.user.name.split(" ")[0]} <span style="color: red;">!<span\></h2>
         <p class="details">Name: ${state.user.name}</p>
         <p class="details">Email: ${state.user.email}</p>
         <p class="details">Password: ${state.user.password}</p>
         <button id="logout">Logout</button>
       </div>`
    : `<div class="signup">
         <h2>Signup</h2>
         <input type="text" id="name" placeholder="Full Name" required>
         <input type="email" id="email" placeholder="Email" required>
         <input type="password" id="password" placeholder="Password" required minlength=8>
         <input type="password" id="confirm-password" placeholder="Confirm Password" required minlength=8>
         <p id="message">Hi there</p>
         <button id="signup-btn">Signup</button>
       </div>`;
  if (state.user) {
    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', handleLogout);
  } else {
    const signupButton = document.getElementById('signup-btn');
    signupButton.addEventListener('click', handleSignup);
  }
}

function handleSignup() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  if(password!==confirmPassword){
    alert('Password and Confirm Password does not match');
    document.getElementById('name').value=document.getElementById('email').value=document.getElementById('password').value=document.getElementById('confirm-password').value=''; 
    return;
  }


  if (name && email) {
    const accessToken = generateAccessToken();
    state.user = { name, email, password};
    state.accessToken = accessToken;
    localStorage.setItem('user', JSON.stringify(state.user));
    localStorage.setItem('accessToken', accessToken);
    showMessage('Successfully Signed Up!', 'success');
    setTimeout(() => {
      renderUI();
    },1000);
    
    
  } else {
    showMessage('All fields are mandatory', 'error');
  }
}

function handleLogout() {
  state.user = null;
  state.accessToken = null;
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
  renderUI();
}

function generateAccessToken() {
  // Generate a random 16-byte string (not cryptographically secure)
  return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
}

function showMessage(message, type) {
  console.log('first');
  const messageDiv = document.getElementById('message');
  messageDiv.innerHTML = message;
  if(type == 'success'){
    messageDiv.style.color = '#7ECD71';
  }
  else{
    messageDiv.style.color = 'red';
  }
  setTimeout(() => {
    messageDiv.innerHTML = '';
    messageDiv.className = '';
  }, 3000);
}

renderUI();






