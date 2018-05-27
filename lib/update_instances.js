const updateInstances = (data) => {
  const projection = d3.geoAlbersUsa().scale(1280).translate([960/2, 600/2]);

  const map = d3.select("svg");
  const circles = map.selectAll("circle").remove().exit();
  circles.data(data)
    .enter().append("circle")
    .on("mouseover", handleMouseOver)
    .transition().duration(750)
    .attr("r", datum => Math.sqrt(datum.total_victims))
    .attr("fill", "#f70000")
    .attr("stroke", "black")
    // .attr("transform", datum => {
    //   if (datum.latitude) {
    //     return "translate(" + projection([datum.longitude, datum.latitude]) + ")";
    //   } else {
    //     const city = latLng[datum["city or county"]];
    //     if (city) {
    //       return "translate(" + projection([city.longitude, city.latitude]) + ")";
    //     }
    //   }
    // });
    .attr("cx", datum => {
      console.log(datum.location, datum.date)
      return projection([datum.longitude, datum.latitude])[0];
    })
    .attr("cy", datum => projection([datum.longitude, datum.latitude])[1]);
};

const handleMouseOver = (datum, i) => {
  const currentCircle = d3.event.target;
  if (datum.latitude) {
    d3.select("svg").append("svg:text")
      .text(datum.summary)
      .attr("id", i)
      // .attr("x", 500)
      // .attr("y", 500)
      .attr(currentCircle.attributes.transform)
      .attr("fill", "#ccc");
  }
};

export default updateInstances;
