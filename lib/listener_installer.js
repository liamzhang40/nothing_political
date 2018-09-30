import updateInstances from './update_instances';


const listenerInstaller = (instances, DOMSelectors) => {
  let selectorValues = {
    yearOptions: "",
    genderOptions: "",
    venueOptions: "",
    raceOptions: ""
  };

  for (let selector in DOMSelectors) {
    if (DOMSelectors.hasOwnProperty(selector)) {
      if (selector === "reset") {
        DOMSelectors.reset.addEventListener('click', () => {
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
      } else {
        DOMSelectors[selector].addEventListener('change', e => {
          if (selector === "yearOptions") selectorValues[selector] = e.currentTarget.value.slice(2);
          else selectorValues[selector] = e.currentTarget.value;
          const filteredInstances = filterInstances(instances);
          updateInstances(filteredInstances);
        });
      }
    }
  }

  // DOMSelectors.year_options.addEventListener('change', e => {
  //   year = e.currentTarget.value.slice(2);
  //   const filteredInstances = filterInstances(instances);
  //   updateInstances(filteredInstances);
  // });

  // DOMSelectors.venue_options.addEventListener('change', e => {
  //   venue = e.currentTarget.value;
  //   const filteredInstances = filterInstances(instances);
  //   updateInstances(filteredInstances);
  // });

  // DOMSelectors.gender_options.addEventListener('change', e => {
  //   gender = e.currentTarget.value;
  //   const filteredInstances = filterInstances(instances);
  //   updateInstances(filteredInstances);
  // });

  // DOMSelectors.race_options.addEventListener('change', e => {
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
