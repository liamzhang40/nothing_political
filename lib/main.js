import initMap from './map';
import updateInstances from './update_instances';

document.addEventListener('DOMContentLoaded', () => {

  let latLng = {};
  let instances;
  let sales;
  initMap();


  d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/merge.csv").then(data => {
    instances = data;
    window.data = data;
    setTimeout(() => updateInstances(data), 1000);
  });

  d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/nics_firearm_background_checks.csv", data => {
    window.sales = data;
  });


  document.getElementById('year-options').addEventListener('change', (e) => {
    let year = e.currentTarget.value;
    year = year.slice(year.length - 2);
    const selectedInstances = instances.filter(instance => {
      let date = instance.date;
      date = date.slice(date.length - 2);
      return date === year;
    });
    updateInstances(selectedInstances, latLng);
  });


});
