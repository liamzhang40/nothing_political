const updateInstances = (data) => {
  const projection = d3.geoAlbersUsa().scale(1280).translate([960/2, 600/2]);

  const map = d3.select("svg");
  const circles = map.selectAll("circle").remove().exit();
  circles.data(data)
    .enter().append("circle")
    .attr("class", "circle-instances")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .transition().duration(750)
    .attr("r", datum => Math.sqrt(datum.total_victims))
    .attr("fill", datum => {
      if (datum.sources) return "#f70000";
      else return "#ccc";
    })
    .attr("stroke", "black")
    .attr("cx", datum => projection([datum.longitude, datum.latitude])[0])
    .attr("cy", datum => projection([datum.longitude, datum.latitude])[1]);
};

const handleMouseOver = (datum, i) => {
  if (datum.sources) {
    const currentCircle = d3.event.target;
    const svg = d3.select("svg");
    const dialogue = svg.append("polygon")
    .attr("id", `c${i}`)
    .attr("points", "0,0 0,160 300,160 300,0 50,0 37.5,-15 25,0")
    .attr("transform", `translate(
      ${currentCircle.attributes.cx.nodeValue - 37.5},
      ${parseFloat(currentCircle.attributes.cy.nodeValue) + 30}
    )`)
    .attr("fill", "#D8D8D8")
    .attr("opacity", 0)
    .transition()
    .duration(500)
    .attr("opacity", 0.75);

    const container = svg.append("foreignObject")
    .attr("width", 300)
    .attr("height", 160)
    .attr("x", currentCircle.attributes.cx.nodeValue - 37.5)
    .attr("y", parseFloat(currentCircle.attributes.cy.nodeValue) + 30);

    container.append("xhtml:div")
      .append("p")
      .html(`${datum.summary}`);
  }
};

const handleMouseOut = (datum, i) => {
  if (datum.sources) {
    d3.select(`#c${i}`).remove();
    d3.select("foreignObject").remove()
;  }
};

export default updateInstances;
