const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// REGISTRO...
const register = document.getElementById('register');
const fullName = document.getElementById('fullName');
const userName = document.getElementById('userName');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

const userRegistered = [];
let id = 0;

register.addEventListener("submit", registerUser);

function registerUser(event) {
	event.preventDefault();
	id++;

	const user = {
		id: id,
		nameFull: fullName.value,
		user: userName.value,
		pass: password.value,
		confirmPassword: confirmPassword.value
	};

	if (
		fullName.value === "" ||
		userName.value === "" ||
		password.value === "" ||
		confirmPassword.value === ""
	) {
		alert("Por favor llene todos los campos")
	}

	else if (password.value !== confirmPassword.value) {
		alert("La contraseña no coincide");
	}

	else if (userRegistered.find(user => user.user === userName.value)) {
		alert("El ususario ya éxiste");
	}

	else {
		userRegistered.push(user);
		localStorage.setItem("user", JSON.stringify(userRegistered));
		alert("Usuario registrado con éxito");

		fullName.value = "";
		userName.value = "";
		password.value = "";
		confirmPassword.value = "";
	}
}

// LOGIN
const login = document.getElementById("login");
const newU = document.getElementById("newUser");
const passNew = document.getElementById("newPassword");

login.addEventListener("submit", loginUser);

function loginUser(event) {
	event.preventDefault();
	const getLocal = localStorage.getItem("user");
	const validateUser = JSON.parse(getLocal);

	if (newU.value === "" || passNew.value === "") {
		alert("Por favor llene todos los campos");
	}
	else if (!validateUser.find(user => user.user  === newU.value)) {
		alert("El usuario no existe");
	}
	else if (validateUser.find(user => user.user === newU.value).pass !== passNew.value) {
		alert("La contraseña no coincide");
	}
	else {
		alert("Usuario logueado con éxito");
		window.location.href= "/index.html";
	}
}

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


