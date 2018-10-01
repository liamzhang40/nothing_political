import updateInstances from './update_instances';

class listenerInstaller {
  constructor(instances) {
    this.instances = instances;
    this.selectorValues = {
      "year-options": "",
      "gender-options": "",
      "venue-options": "",
      "race-options": ""
    };
  }

  install() {
    // initial modal can not be closed until the map and instances have been mounted
    document.getElementsByClassName('modal-screen')[0].addEventListener('click', e => {
      document.getElementsByClassName('modal is-open')[0].classList.remove('is-open');
    });

    document.getElementsByClassName('close-modal')[0].addEventListener('click', e => {
      document.getElementsByClassName('modal is-open')[0].classList.remove('is-open');
    });

    document.getElementsByClassName('open-modal')[0].addEventListener('click', e => {
      document.getElementsByClassName('modal')[0].classList.add('is-open');
    });

    document.getElementById('reset').addEventListener('click', () => {
      document.querySelectorAll("select").forEach(selector => {
        selector.selectedIndex = 0;
        this.selectorValues[selector.className] = "";
      });
      updateInstances(this.instances);
    });
  
    document.querySelectorAll('select').forEach(selector => {
      selector.addEventListener('change', e => {
        this.selectorValues[selector.className] = e.currentTarget.value;
        const filteredInstances = this.filterInstances();
        updateInstances(filteredInstances);
      });
    });
  }
  
  filterInstances() {
    const res = this.instances.filter(instance => {
      let date = instance.date;
      date = date.slice(date.length - 2);
  
      return (!this.selectorValues["year-options"] || date === this.selectorValues["year-options"] || (parseInt(date) < 14 && this.selectorValues["year-options"] === "d")) &&
        (!this.selectorValues["venue-options"] || instance.venue === this.selectorValues["venue-options"]) &&
        (!this.selectorValues["gender-options"] || instance.gender === this.selectorValues["gender-options"]) &&
        (!this.selectorValues["race-options"] || instance.race.toUpperCase() === this.selectorValues["race-options"].toUpperCase());
    });
  
    return res;
  }
}

export default listenerInstaller;
