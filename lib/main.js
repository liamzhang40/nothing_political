import initMap from './map';
import { fetchInstance, fetchGunSales } from './util/fetchData';

document.addEventListener('DOMContentLoaded', () => {
  fetchGunSales().then(gunSales => {
    fetchInstance().then(instances => {
      initMap(gunSales, instances);
    });
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
