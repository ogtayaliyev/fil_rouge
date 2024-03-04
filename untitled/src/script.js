"use strict";

// MOBILE NAVBAR TOGGLE

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});
/* script.js */

document.addEventListener('DOMContentLoaded', function () {
  var dateInput = document.getElementById('date');
  var timeInput = document.getElementById('heure');

  dateInput.addEventListener('change', function () {
    var selectedDate = new Date(dateInput.value);
    var day = selectedDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
    var selectedTime = new Date(timeInput.value);
    var hour = selectedTime.getHours(); // Get the hour (0-23) from the time input

    // Disable Saturday (day 6) and Sunday (day 0)
    if (day === 6 || day === 0) {
      dateInput.setCustomValidity('Les réservations ne sont pas disponibles les samedis et dimanches.');
    } else {
      // Check if the selected hour is within the allowed range (9-12 or 14-18)
      if ((hour >= 9 && hour < 12) || (hour >= 14 && hour < 18)) {
        dateInput.setCustomValidity('');
      } else {
        dateInput.setCustomValidity('Les réservations ne sont disponibles que de 09h à 12h et de 14h à 18h.');
      }
    }
  });
});
