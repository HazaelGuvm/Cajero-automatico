var accounts = [
    { name: "Marcos", saldo: 500, contrasena: "marcos" },
    { name: "Diana", saldo: 500, contrasena: "diana" },
    { name: "Regina", saldo: 500, contrasena: "regina" },
];

var currentAccount = null;

function login() {
    var accountIndex = document.getElementById("account").value;
    var contrasena = document.getElementById("contrasena").value;
    var loginMessage = document.getElementById("login-message");

    if (accounts[accountIndex].contrasena === contrasena) {
        currentAccount = accounts[accountIndex];
        document.getElementById("account-selection").style.display = "none";
        document.getElementById("opciones").style.display = "block";
        loginMessage.textContent = "";
    } else {
        loginMessage.textContent = "Contraseña incorrecta, intenta de nuevo";
    }
}

function logout() {
    currentAccount = null;
    document.getElementById("account-selection").style.display = "block";
    document.getElementById("opciones").style.display = "none";
    document.getElementById("saldo").style.display = "none";
    document.getElementById("transaction").style.display = "none";
    document.getElementById("login-message").textContent = "";
    document.getElementById("contrasena").value = "";
}

function checksaldo() {
    document.getElementById("saldo").textContent = "Saldo: $" + currentAccount.saldo;
    document.getElementById("saldo").style.display = "block";
    document.getElementById("transaction").style.display = "none";
}

function showDeposit() {
    document.getElementById("saldo").style.display = "none";
    document.getElementById("transaction").style.display = "block";
    document.getElementById("amount").value = "";
    document.getElementById("transaction-message").textContent = "";
    document.getElementById("transaction").setAttribute("data-type", "deposit");
}

function showretiro() {
    document.getElementById("saldo").style.display = "none";
    document.getElementById("transaction").style.display = "block";
    document.getElementById("amount").value = "";
    document.getElementById("transaction-message").textContent = "";
    document.getElementById("transaction").setAttribute("data-type", "retiro");
}

function performTransaction() {
    var amount = parseInt(document.getElementById("amount").value);
    var transactionType = document.getElementById("transaction").getAttribute("data-type");
    var transactionMessage = document.getElementById("transaction-message");

    if (isNaN(amount) || amount <= 0) {
        transactionMessage.textContent = "Ingresa monto válido.";
        return;
    }

    if (transactionType === "deposit") {
        if (currentAccount.saldo + amount > 990) {
            transactionMessage.textContent = "Monto mayor excedido, no puede ser mayor a $990.";
        } else {
            currentAccount.saldo += amount;
            transactionMessage.textContent = "Deposito: $" + amount + " Saldo nuevo: $" + currentAccount.saldo;
        }
    } else if (transactionType === "retiro") {
        if (currentAccount.saldo - amount < 10) {
            transactionMessage.textContent = "El monto minimo requerido es de $10, no puede retirar";
        } else {
            currentAccount.saldo -= amount;
            transactionMessage.textContent = "Retiro: $" + amount + " Saldo nuevo: $" + currentAccount.saldo;
        }
    }
}