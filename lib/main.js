import initMap from './map';
import { fetchInstance, fetchGunSales } from './util/fetchData';

document.addEventListener('DOMContentLoaded', () => {
  fetchGunSales().then(gunSales => {
    fetchInstance().then(instances => {
      initMap(gunSales, instances);
    });
  });
});
