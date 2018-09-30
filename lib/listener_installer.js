import updateInstances from './update_instances';


const listenerInstaller = (instances, DOMElements) => {
  let selectorValues = {
    yearOptions: "",
    genderOptions: "",
    venueOptions: "",
    raceOptions: ""
  };

  for (let key in DOMElements) {
    if (DOMElements.hasOwnProperty(key)) {
      if (key === "reset") {
        DOMElements.reset.addEventListener('click', () => {
          document.querySelectorAll("select").forEach(select => {
            select.selectedIndex = 0;
          });
          for (let key in selectorValues) {
            if (selectorValues.hasOwnProperty(key)) {
              selectorValues[key] = "";
            }
          }
          updateInstances(instances);
        });
      } else {
        DOMElements[key].addEventListener('change', e => {
          if (key === "yearOptions") selectorValues[key] = e.currentTarget.value.slice(2);
          else selectorValues[key] = e.currentTarget.value;
          const filteredInstances = filterInstances(instances);
          updateInstances(filteredInstances);
        });
      }
    }
  }

  // DOMElements.year_options.addEventListener('change', e => {
  //   year = e.currentTarget.value.slice(2);
  //   const filteredInstances = filterInstances(instances);
  //   updateInstances(filteredInstances);
  // });

  // DOMElements.venue_options.addEventListener('change', e => {
  //   venue = e.currentTarget.value;
  //   const filteredInstances = filterInstances(instances);
  //   updateInstances(filteredInstances);
  // });

  // DOMElements.gender_options.addEventListener('change', e => {
  //   gender = e.currentTarget.value;
  //   const filteredInstances = filterInstances(instances);
  //   updateInstances(filteredInstances);
  // });

  // DOMElements.race_options.addEventListener('change', e => {
  //   race = e.currentTarget.value;
  //   const filteredInstances = filterInstances(instances);
  //   updateInstances(filteredInstances);
  // });

  const filterInstances = (instances) => {
    const res = instances.filter(instance => {
      let date = instance.date;
      date = date.slice(date.length - 2);
  
      return (!selectorValues.yearOptions || date === selectorValues.yearOptions || (parseInt(date) < 14 && selectorValues.yearOptions === "d")) &&
        (!selectorValues.venueOptions || instance.venue === selectorValues.venueOptions) &&
        (!selectorValues.genderOptions || instance.gender === selectorValues.genderOptions) &&
        (!selectorValues.raceOptions || instance.race.toUpperCase() === selectorValues.raceOptions.toUpperCase());
    });
  
    return res;
  };
};


export default listenerInstaller;
