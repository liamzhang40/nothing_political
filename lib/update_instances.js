const updateInstances = (data, latLng) => {
  const projection = d3.geoAlbersUsa().scale(1280).translate([960/2, 600/2]);

  const map = d3.select("svg");
  map.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("r", datum => Math.sqrt(datum.total_victims))
    .attr("fill", datum => {
      if (datum.latitude || latLng[datum["city or county"]]) return "red";
    })
    .attr("stroke", "black")
    .attr("transform", datum => {
      if (datum.latitude) {
        return "translate(" + projection([datum.longitude, datum.latitude]) + ")";
      } else {
        const city = latLng[datum["city or county"]];
        if (city) {
          return "translate(" + projection([city.longitude, city.latitude]) + ")";
        }
      }
  });


};

export default updateInstances;
