import initMap from './map';
import updateInstances from './update_instances';
import listenerInstaller from './listener_installer';

document.addEventListener('DOMContentLoaded', () => {
  let instances;
  const DOMElements = {};
  initMap();

  DOMElements.yearOptions = document.getElementById('year-options');
  DOMElements.genderOptions = document.getElementById('gender-options');
  DOMElements.venueOptions = document.getElementById('venue-options');
  DOMElements.raceOptions = document.getElementById('race-options');
  DOMElements.reset = document.getElementById('reset');

  d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/merge.csv").then(data => {
    instances = data;
    setTimeout(() => updateInstances(data), 1000);
    listenerInstaller(instances, DOMElements);
  });

  document.getElementsByClassName('modal-screen')[0].addEventListener('click', e => {
    document.getElementsByClassName('modal is-open')[0].classList.remove('is-open');
  });

  document.getElementsByClassName('close-modal')[0].addEventListener('click', e => {
    document.getElementsByClassName('modal is-open')[0].classList.remove('is-open');
  });

  document.getElementsByClassName('open-modal')[0].addEventListener('click', e => {
    document.getElementsByClassName('modal')[0].classList.add('is-open');
  });
});
