import initMap from './map';
import updateInstances from './update_instances';

document.addEventListener('DOMContentLoaded', () => {

  let latLng = {};
  let instances;
  let sales;
  let year;
  initMap();


  d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/merge.csv").then(data => {
    instances = data;
    window.data = data;
    setTimeout(() => updateInstances(data), 1000);
  });

  d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/nics_firearm_background_checks.csv", data => {
    window.sales = data;
  });


  document.getElementById('year-options').addEventListener('change', e => {
    year = e.currentTarget.value;
    year = year.slice(year.length - 2);
    const selectedInstances = instances.filter(instance => {
      let date = instance.date;
      date = date.slice(date.length - 2);
      return date === year;
    });
    updateInstances(selectedInstances, latLng);
  });

  document.getElementByName('gender').addEventListener('click', () => {
    const radioButtons = document.getElementByName('gender');
    let value;
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        value = radioButtons[i].value;
      }
    }

    const selectedInstances = instances.filter(intance => {
      // let date = instance.date, gender = instance.gender;
      // date = date.slice(date.length - 2);
      return value === instance.gender
    });
  });


});
