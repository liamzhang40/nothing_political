document.addEventListener('DOMContentLoaded', () => {


  d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/mass_shootings_1982-2018.csv", data => {
    window.data = data;
  });


});
