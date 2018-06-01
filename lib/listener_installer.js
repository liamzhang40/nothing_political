import updateInstances from './update_instances';

let year;
let gender;
let venue;

const listenerInstaller = (instances, DOMElements) => {
  DOMElements.year_options.addEventListener('change', e => {
    year = e.currentTarget.value.slice(2);
    const filteredInstances = filterInstances(instances);
    updateInstances(filteredInstances);
  });

  DOMElements.venue_options.addEventListener('change', e => {
    venue = e.currentTarget.value;
    const filteredInstances = filterInstances(instances);
    updateInstances(filteredInstances);
  });

  DOMElements.gender_options.addEventListener('change', e => {
    gender = e.currentTarget.value;
    const filteredInstances = filterInstances(instances);
    updateInstances(filteredInstances);
  });
};

const filterInstances = (instances) => {
  const res = instances.filter(instance => {
    let date = instance.date;
    date = date.slice(date.length - 2);

    return (!year || date === year || parseInt(date) < 14) &&
      (!venue || instance.venue === venue) &&
      (!gender || instance.gender === gender);
  });

  return res;
};

export default listenerInstaller;
