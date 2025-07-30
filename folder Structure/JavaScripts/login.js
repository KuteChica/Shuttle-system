// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Firebase config (same as the one in auth.js)
const firebaseConfig = {
  apiKey: "AIzaSyDLahfitofShOkFNNJdtoK5NuMgmbF_21c",
  authDomain: "rush-hour-de047.firebaseapp.com",
  projectId: "rush-hour-de047",
  storageBucket: "rush-hour-de047.firebasestorage.app",
  messagingSenderId: "743441637081",
  appId: "1:743441637081:web:3ebe14fc70653aecc328c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Show user message
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = 'block';
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 3000);
}

// Handle login
const loginBtn = document.getElementById("submitLogin");
loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    showMessage("Login successful!", "loginMessage");

    // Redirect to home page or dashboard
    setTimeout(() => {
      window.location.href = "dashboard.html";  // You can change this to your real dashboard/home
    }, 1500);
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      showMessage("Incorrect password. Please try again.", "loginMessage");
    } else if (error.code === "auth/user-not-found") {
      showMessage("No account found with this email.", "loginMessage");
    } else {
      showMessage("Login failed: " + error.message, "loginMessage");
    }
  }
});
