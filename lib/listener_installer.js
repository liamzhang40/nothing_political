import updateInstances from './update_instances';

const listenerInstaller = (instances) => {
  const selectorValues = {
    "year-options": "",
    "gender-options": "",
    "venue-options": "",
    "race-options": ""
  };

  document.getElementById('reset').addEventListener('click', () => {
    document.querySelectorAll("select").forEach(select => {
      select.selectedIndex = 0;
    });
    for (let option in selectorValues) {
      if (selectorValues.hasOwnProperty(option)) {
        selectorValues[option] = "";
      }
    }
    updateInstances(instances);
  });

  document.querySelectorAll('select').forEach(selector => {
    selector.addEventListener('change', e => {
      selectorValues[selector.className] = e.currentTarget.value;
      const filteredInstances = filterInstances(instances);
      updateInstances(filteredInstances);
    });
  });
  
  const filterInstances = (instances) => {
    console.log(selectorValues)
    const res = instances.filter(instance => {
      let date = instance.date;
      date = date.slice(date.length - 2);
  
      return (!selectorValues["year-options"] || date === selectorValues["year-options"] || (parseInt(date) < 14 && selectorValues["year-options"] === "d")) &&
        (!selectorValues["venue-options"] || instance.venue === selectorValues["venue-options"]) &&
        (!selectorValues["gender-options"] || instance.gender === selectorValues["gender-options"]) &&
        (!selectorValues["race-options"] || instance.race.toUpperCase() === selectorValues["race-options"].toUpperCase());
    });
  
    return res;
  };
};

export default listenerInstaller;
