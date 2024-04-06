document.addEventListener("DOMContentLoaded", function () {
  const chooseForm = document.getElementById("choose");
  const dobInput = document.getElementById("dob-input");
  const submitBtn = document.getElementById("submit");

  const timerDiv = document.getElementById("timer");
  const ageCount = document.getElementById("age");
  var timerIntervalId = null;

  const backBtn = document.getElementById("backBtn");

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const dopTimestamp = new Date(dobInput.value).getTime();
    localStorage.setItem("dob", dopTimestamp);
    renderAgeLoop();
  });

  backBtn.addEventListener("click", function (e) {
    e.preventDefault();
    clearInterval(timerIntervalId);
    renderChoose();
    localStorage.removeItem("dob");
    ageCount.innerHTML = "";
  });

  function renderAgeLoop() {
    const localDob = localStorage.getItem("dob");
    const dob = localDob ? new Date(parseInt(localDob)) : -1;

    chooseForm.style.display = "none";
    timerDiv.style.display = "block";

    timerIntervalId = setInterval(function () {
      const age = getAge(dob);
      ageCount.innerHTML = age.year + "<sup>." + age.ms + "</sup>";
    }, 100);
  }

  function renderChoose() {
    timerDiv.style.display = "none";
    chooseForm.style.display = "block";
  }

  function getAge(dob) {
    const now = new Date();
    const duration = now - dob;
    const years = duration / 31556900000;

    const majorMinor = years.toFixed(9).toString().split(".");

    return {
      year: majorMinor[0],
      ms: majorMinor[1],
    };
  }

  // Check if prefers-color-scheme is supported
  if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
    // Listen for changes in the prefers-color-scheme media query
    window.matchMedia("(prefers-color-scheme: dark)").addListener((e) => {
      const newTheme = e.matches ? "dark" : "light";
      document.getElementsByTagName("body")[0].classList.toggle("dark-theme", newTheme === "dark");
    });
  }

  // Set the initial theme based on prefers-color-scheme
  const initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.getElementsByTagName("body")[0].classList.toggle("dark-theme", initialTheme === "dark");

  localStorage.getItem("dob") == null ? renderChoose() : renderAgeLoop();

});
