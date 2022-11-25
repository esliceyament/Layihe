let leftButtons = document.querySelectorAll(".leftbuttons button");
let rightButtons = document.querySelectorAll(".rightbuttons button");
let leftAmount = document.querySelector("#left-input");
let rightAmount = document.querySelector("#right-input");
let base;
let converter;

function LeftConverter() {
  let str;
  let leftvalue = leftAmount.value;
  leftButtons.forEach((e) => {
    var styles = window
      .getComputedStyle(e, "")
      .getPropertyValue("background-color");
    if (e.classList.contains("selected")) {
      base = e.innerHTML;
      console.log(base, leftvalue);
    }
  });

  rightButtons.forEach((e) => {
    var styles = window
      .getComputedStyle(e, "")
      .getPropertyValue("background-color");

    if (e.classList.contains("selected")) {
      converter = e.innerHTML;
    }
  });

  fetch(
    `https://api.exchangerate.host/latest?base=${base}&symbols=${converter}`
  )
    .then((res) => res.json())
    .then((data) => {
      rightAmount?.setAttribute(
        "value",
        Object.values(data.rates)[0] * leftvalue
      );
    });
}

function RightConverter() {
  let str;
  let rightvalue = rightAmount.value;

  rightButtons.forEach((e) => {
    var styles = window
      .getComputedStyle(e, "")
      .getPropertyValue("background-color");
    if (e.classList.contains("selected")) {
      base = e.innerHTML;
      console.log(base, rightvalue);
    }
  });

  leftButtons.forEach((e) => {
    var styles = window
      .getComputedStyle(e, "")
      .getPropertyValue("background-color");
    if (e.classList.contains("selected")) {
      converter = e.innerHTML;
      console.log(base, rightvalue);
    }
  });

  fetch(
    `https://api.exchangerate.host/latest?base=${base}&symbols=${converter}`
  )
    .then((res) => res.json())
    .then((data) => {
      leftAmount?.setAttribute(
        "value",
        Object.values(data.rates)[0] * rightvalue
      );
    });
}

function select(current) {
  const parentNode = current.parentNode;
  const allButtons = document.querySelectorAll(
    `.${parentNode.className} button`
  );

  allButtons.forEach(function resetButton(button) {
    button.classList.remove("selected");
  });
  current.classList.add("selected");
}