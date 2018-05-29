const updateChart = (gunsales, instances) => {
  const x = d3.scaleBand().rangeRound([0, 400]),
        y = d3.scaleLinear().rangeRound([400, 0]),
        barWidth = 400 / 2 / gunsales.length,
        chartTitle = `${gunsales[0].month.slice(0,4)} ${gunsales[0].state} Firearm Background Checks`;
        instances = parseInstances(instances);

  gunsales.reverse();

  x.domain(gunsales.map(datum => datum.month.slice(datum.month.length - 2)));
  y.domain([0, d3.max(gunsales, (datum) => parseInt(datum.totals))]);

  const svg = d3.select("svg");
  svg.selectAll(".chart").remove();
  const chart = svg.append("g")
    .attr("class", "chart")
    .attr("transform", "translate(900, 280)");

  chart.append('text')
    .attr("class", "chart-title")
    .attr("x", 40)
    .attr("y", -20)
    .attr("fill", "#ccc")
    .attr("font-size", "15px")
    .text(chartTitle);


  chart.append("g")
    .attr("class", "axis-x")
    .attr("transform", "translate(0, 400)")
    .call(d3.axisBottom(x));

  chart.append("g")
    .attr("class", "axis-y")
    .call(d3.axisLeft(y));

  chart.selectAll(".bar")
    .data(gunsales)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", datum => x(datum.month.slice(datum.month.length - 2)) + barWidth / 2)
    .attr("y", datum => y(parseInt(datum.totals)))
    .attr("height", datum => 400 - y(parseInt(datum.totals)))
    .attr("width", barWidth);

  chart.selectAll(".dot")
    .data(instances)
    .enter().append("circle")
    .attr("r", Math.sqrt(barWidth))
    .attr("cx", datum => x(Object.keys(datum)[0]) + barWidth)
    .attr("cy", datum => 400 - parseInt(Object.values(datum)[0]) * 50)
    .attr("fill", "#fff");
};

const parseInstances = instances => {
  const res = {};
  instances.forEach(instance => {
    let month = instance.date.split('/')[0];
    if (month.length === 1) month = "0" + month;
    if (res[month]) res[month] += 1;
    else res[month] = 1;
  });
  return Object.keys(res).map(key => {return {[key]: res[key]};});
};

export default updateChart;
