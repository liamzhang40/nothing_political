import updateChart from './update_chart';
import updateInstances from './update_instances';
import listenerInstaller from './listener_installer';
import { fetchMap, fetchStates } from './util/fetchData';


const initMap = (gunSales, instances) => {
  fetchMap().then(us => {
    fetchStates().then(stateNames => {
      
      const usData = topojson.feature(us, us.objects.states).features;
      const svg = d3.select("svg");
      const path = d3.geoPath(null);
      const nameHash = {};
      stateNames.forEach(name => {
        nameHash[name.id] = name.name;
      });

      svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(usData)
        .enter().append("path")
        .attr("d", path)
        .attr("id", datum => datum.id);

      svg.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b )));

      svg.append("g")
        .attr("class", "state-names")
        .selectAll("text")
        .data(usData)
        .enter().append("text")
        .text(datum => {
          if (datum.id[0] === "0") {
            return nameHash[datum.id[1]];
          } else {
            return nameHash[datum.id];
          }
        })
        .attr("x", datum => path.centroid(datum)[0])
        .attr("y", datum => path.centroid(datum)[1])
        .attr("text-anchor", "middle")
        .attr("fill", "#6f9ba5")
        .on("click", handleClick);

      mountInstances(instances);
      });
  });

  const handleClick = datum => {
    const state = d3.event.target.textContent;
    const selectedYear = document.getElementById("year-options").value;
    if (!selectedYear) {
      window.alert("Please select a year!");
      return;
    } else if (selectedYear === 'old') {
      window.alert("No background check records before 2014!");
      return;
    }
  
    const filteredGunSales = gunSales.filter(sale => {
      return sale.month.slice(0,4) === selectedYear && sale.state === state;
    });
  
    const filteredInstances = instances.filter(instance => {
      return instance.date.slice(instance.date.length - 2) === selectedYear.slice(2) && instance.location === state;
    });
  
    updateChart(filteredGunSales, filteredInstances);
  };

  const mountInstances = instances => {
    updateInstances(instances);
    listenerInstaller(instances);
  };
};

export default initMap;
