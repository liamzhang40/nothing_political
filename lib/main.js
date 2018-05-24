import initMap from './map';

document.addEventListener('DOMContentLoaded', () => {

  let instances;
  let sales;

  const map = initMap();

  d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/merge.csv", data => {
    instances = data;

    const overlay = new google.maps.OverlayView();

    overlay.onAdd = () => {
      const layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
      .attr("class", "map-layer");

      overlay.draw = () => {
        const projection = this.getProjection(), padding = 10;

        const marker = layer.selectAll("svg")
                                 .data();
      };
    };
  });

  d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/nics_firearm_background_checks.csv", data => {
    sales = data;
  });

  d3.json("/csv/stations.json", function(error, data) {
    window.data = data;
  });


});
