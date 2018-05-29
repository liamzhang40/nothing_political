import initMap from './map';
import updateInstances from './update_instances';

document.addEventListener('DOMContentLoaded', () => {

  let latLng = {};
  let instances;
  let sales;
  const mapPromise = initMap();

  mapPromise.then(() => {
    d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/merge.csv").then(data => {
      instances = data;
      updateInstances(data);
    });
  });

  document.getElementById('year-options').addEventListener('change', e => {
    let year = e.currentTarget.value;
    year = year.slice(year.length - 2);
    const selectedInstances = instances.filter(instance => {
      let date = instance.date;
      date = date.slice(date.length - 2);
      return date === year;
    });
    updateInstances(selectedInstances);
  });

  document.getElementsByName('gender').forEach(node => {
    node.addEventListener('click', e => {
      if (e.currentTarget.checked) {
        const value = e.currentTarget.value;
        const selectedInstances = instances.filter(instance => {
          return value === instance.gender;
        });

        updateInstances(selectedInstances);
      }
    });
  });

});
