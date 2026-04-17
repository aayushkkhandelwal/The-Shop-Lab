document.addEventListener("DOMContentLoaded", function () {
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
  

if (signUpButton && signInButton) {
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});
signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});
  }

  const signInForm = document.querySelector('.sign-in-container form');

  if (signInForm) {
    signInForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = signInForm.querySelector('input[type="email"]').value;
      const password = signInForm.querySelector('input[type="password"]').value;

      try {
        const res = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.success) {
          const username = email.split('@')[0];

          localStorage.setItem("username", username);
          localStorage.setItem("isLoggedIn", "true");

          window.location.href = "indexamazon.html";
        } else {
          alert("Invalid email or password ❌");
        }

      } catch (error) {
        console.log(error);
        alert("Server not running ❌");
      }
    });
  }


  const signUpForm = document.querySelector('.sign-up-container form');

  if (signUpForm) {
    signUpForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = signUpForm.querySelector('input[type="text"]').value;
      const email = signUpForm.querySelector('input[type="email"]').value;
      const password = signUpForm.querySelector('input[type="password"]').value;

      try {
        const res = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.success) {
          alert("Account created successfully ✅");
          container.classList.remove("right-panel-active");
        } else {
          alert(data.message || "Registration failed ❌");
        }
      } catch (error) {
        console.log(error);
        alert("Server error ❌");
      }
    });
  }
});

const username = email.split('@')[0];
localStorage.setItem("username", username);