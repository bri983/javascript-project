const toast = (message, bgColor = "linear-gradient(to right, #00b09b, #96c93d)") => {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: false,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: bgColor,
        },
        onClick: function () { },
    }).showToast();
};

const signup = (event) => {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const mail = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const sub = document.getElementById("sub");

    if (firstName === "" || lastName === "" || mail === "" || password === "" || confirmPassword === "") {
        toast("Please fill in all fields.", "red");
        sub.innerHTML = ".......loading";
        setTimeout(() => {
            sub.innerHTML = "Sign up";
        }, 1000);
        return;
    }

    if (mail.search(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) === -1) {
        toast("Please enter a valid email address.", "red");
        sub.innerHTML = ".......loading";
        setTimeout(() => {
            sub.innerHTML = "Sign Up";
        }, 2000);
        return;
    }

    if (password !== confirmPassword) {
        toast("Passwords do not match.", "red");
        sub.innerHTML = ".......loading";
        setTimeout(() => {
            sub.innerHTML = "Sign Up";
        }, 2000);
        return;
    }

    if (password.length < 8) {
        toast("Password must be at least 8 characters long.", "red");
        sub.innerHTML = ".......loading";
        setTimeout(() => {
            sub.innerHTML = "Sign Up";
        }, 2000);
        return;
    }

    if (password.search(/[0-9]/) === -1) {
        toast("Password must contain at least one number.", "red");
        sub.innerHTML = ".......loading";
        setTimeout(() => {
            sub.innerHTML = "Sign Up";
        }, 2000);
        return;
    }

    if (password.search(/[a-zA-Z]/) === -1) {
        toast("Password must contain at least one letter.", "red");
        sub.innerHTML = ".......loading";
        setTimeout(() => {
            sub.innerHTML = "Sign Up";
        }, 2000);
        return;
    }

    if (password.search(/[\W_]/) === -1) {
        toast("Password must contain at least one special character.", "red");
        sub.innerHTML = ".......loading";
        setTimeout(() => {
            sub.innerHTML = "Sign Up";
        }, 2000);
        return;
    }

    if (password.search(/[\s]/) !== -1) {
        toast("Password must not contain any spaces.", "red");
        sub.innerHTML = ".......loading";
        setTimeout(() => {
            sub.innerHTML = "Sign Up";
        }, 2000);
        return;
    }

    const allUsers = JSON.parse(localStorage.getItem("user")) || [];
    const user = {
        firstName: firstName,
        lastName: lastName,
        email: mail,
        password: password,
    };
    allUsers.push(user);
    localStorage.setItem("user", JSON.stringify(allUsers));
    toast("Signup successful!", "green");
    sub.innerHTML = ".........loading";
    setTimeout(() => {
        sub.innerHTML = "Sign Up";
        window.location.href = "signin.html";
    }, 2000);
    const myUser = JSON.parse(localStorage.getItem("user"));
    console.log(myUser);
};
const login = () => {
    const mail = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const sub = document.getElementById("login-btn"); // Use the correct id

    if (mail === "" || password === "") {
        toast("Please fill in all fields.");
        sub.innerHTML = ".......loading";
        setTimeout(() => {
            sub.innerHTML = "Login";
        }, 1000);
    } else {
        const allUsers = JSON.parse(localStorage.getItem("user")) || [];
        const userExists = allUsers.some((user) => user.email === mail && user.password === password);
        if (userExists) {
            toast("Login successful.");
            sub.innerHTML = "......loading";
            setTimeout(() => {
                sub.innerHTML = "Login";
                window.location.href = "dashboard.html"; // Redirect to dashboard
            }, 1000);
        } else {
            toast("Invalid email or password.");
            sub.innerHTML = ".......loading";
            setTimeout(() => {
                sub.innerHTML = "Login";
            }, 2000);
        }
    }
}