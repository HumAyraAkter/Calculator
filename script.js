const display = document.getElementById("display");
const historyList = document.getElementById("historyList");
const historyBox = document.getElementById("historyBox");

let themeIndex = 1;

/* Append */
function append(val) {
  display.value += val;
}

/* Clear */
function clearDisplay() {
  display.value = "";
}

/* Delete */
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

/* 🔥 FIXED Calculate */
function calculate() {
  try {
    let exp = display.value
      .replace(/÷/g, "/")
      .replace(/×/g, "*");

    // ✅ Convert % to /100
    exp = exp.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

    let result = eval(exp);

    addHistory(display.value + " = " + result);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

/* History */
function addHistory(item) {
  const li = document.createElement("li");
  li.textContent = item;
  historyList.prepend(li);
}

/* Toggle History */
function toggleHistory() {
  if (window.innerWidth <= 768) {
    historyBox.classList.add("show");
  }
}

/* Close History */
function closeHistory() {
  historyBox.classList.remove("show");
}

/* Theme */
function changeTheme() {
  themeIndex++;
  if (themeIndex > 4) themeIndex = 1;
  document.body.className = "theme" + themeIndex;
}

/* Keyboard */
document.addEventListener("keydown", function (e) {
  if (!isNaN(e.key) || "+-*/.%".includes(e.key)) {
    append(e.key);
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key === "Escape") {
    clearDisplay();
  }
});