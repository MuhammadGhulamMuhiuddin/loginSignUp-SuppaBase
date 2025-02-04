import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.47.12/+esm";


const projectUrl = "Your Project URl";
const projectApiKey = "Your ProjectAPI Key";

const supabase = createClient(projectUrl, projectApiKey);

console.log('Supabase Instance: ', supabase);


var isSignup = true;
var authTitle = document.getElementById("auth-title");
var authBtn = document.getElementById("auth-btn");
var toggleAuth = document.getElementById("toggle-auth");

toggleAuth.onclick = function() {
    isSignup = !isSignup;
    authTitle.innerText = isSignup ? "Sign Up" : "Login";
    authBtn.innerText = isSignup ? "Sign Up" : "Login";
    toggleAuth.innerText = isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up";
};

authBtn.onclick = async function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter email and password!");
        return;
    }

    if (isSignup) {
        
        let { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            alert("Signup Failed: " + error.message);
        } else {
            alert("Signup Successful! Please login.");
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);
        }
    } else {
        
        let storedEmail = localStorage.getItem("userEmail");
        let storedPassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
            alert("Login Successful!");
            window.location.href = "dashboard.html"; // Redirect to new page
        } else {
            alert("Invalid Email or Password!");
        }
    }
};
