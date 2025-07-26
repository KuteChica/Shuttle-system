// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Your Firebase configuration
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
const db = getFirestore(app);

// Function to show feedback messages
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = 'block';
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 3000);
}

// Signup event listener
const signUpBtn = document.getElementById("submitSignup");
signUpBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    showMessage("Passwords do not match!", "signupMessage");
    return;
  }

  try {
    // Create user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullname: fullname,
      email: email
    });

    showMessage("Account created successfully!", "signupMessage");

    // Redirect to dashboard after short delay
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);

  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      showMessage("Email already in use. Please use a different email.", "signupMessage");
    } else {
      showMessage("Error: " + error.message, "signupMessage");
    }
  }
});
