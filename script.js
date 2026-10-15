const display = document.querySelector(".display");
const operator = document.querySelectorAll(".operator");
const number = document.querySelectorAll(".number");
const decimal = document.querySelector(".decimal");

let saveValue = "0"; // Zaczynamy od tekstu "0"

number.forEach((element) => {
  element.addEventListener("click", () => {
    // Jeśli na ekranie jest samo "0", nadpisujemy je nową cyfrą
    if (saveValue === "0") {
      saveValue = element.innerText;
    } else {
      saveValue += element.innerText;
    }
    display.innerText = saveValue;
  });
});

operator.forEach((element) => {
  element.addEventListener("click", () => {
    let checkOpr = display.innerText.slice(-1);

    // Zabezpieczenie przed postawieniem dwóch operatorów obok siebie
    if ("+-%*/".includes(checkOpr)) {
      return;
    }
    saveValue += element.innerText;
    display.innerText = saveValue;
  });
});

// Decimal Button
// POPRAWIONE: Naprawiono literówkę w addEventListener
decimal.addEventListener("click", () => {
  let abc = display.innerText.split(/[+%*/-]/).pop();
  if (abc.includes(".")) {
    return;
  }

  saveValue += decimal.innerText;
  display.innerText = saveValue;
});

// Equal Button
document.querySelector(".equal").addEventListener("click", () => {
  try {
    // Eval oblicza wynik z tekstu
    let result = eval(display.innerText);
    saveValue = String(result); // Konwertujemy wynik na tekst
    display.innerText = saveValue;
  } catch (error) {
    display.innerText = "Error";
    saveValue = "0";
  }
});

// All Clear Button
document.getElementById("clear").addEventListener("click", () => {
  saveValue = "0"; // POPRAWIONE: Zmiana z liczby 0 na tekst "0"
  display.innerText = saveValue;
});

// Delete Button
document.getElementById("del").addEventListener("click", () => {
  saveValue = display.innerText.slice(0, -1);

  if (saveValue === "") {
    saveValue = "0"; // Aktualizujemy też zmienną pamięci
    display.innerText = "0";
  } else {
    display.innerText = saveValue;
  }
});
