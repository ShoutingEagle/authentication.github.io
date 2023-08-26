const user = JSON.parse(localStorage.getItem('user'));

console.log(user);

if (user) {
  document.getElementById('profileName').textContent = user.name.trim().split(" ")[0];;
  document.getElementById('Name').textContent = user.name;
  document.getElementById('profileEmail').textContent = user.email;
  document.getElementById('profile-password').textContent = user.password;
} else {
  window.location.href = 'index.html'; 
}

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.href = 'index.html'; 
});