const MONTH = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
};

const updateChart = data => {
  const x = d3.scaleBand().rangeRound([0, 400]),
        y = d3.scaleLinear().rangeRound([400, 0]);
  data.reverse();

  x.domain(data.map(datum => datum.month.slice(datum.month.length - 2)));
  y.domain([0, d3.max(data, (datum) => parseInt(datum.totals))]);
  window.x = x;
  window.y = y;
  const svg = d3.select("svg");
  const chart = svg.append("g")
    .attr("class", "chart")
    .attr("transform", "translate(900, 280)");

  chart.append("g")
    .attr("class", "axis-x")
    .attr("transform", "translate(0, 400)")
    .call(d3.axisBottom(x));

  chart.append("g")
    .attr("class", "axis-y")
    .call(d3.axisLeft(y));

  chart.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", datum => x(datum.month.slice(datum.month.length - 2)) + 200 / data.length)
    .attr("y", datum => y(parseInt(datum.totals)))
    .attr("height", datum => 400 - y(parseInt(datum.totals)))
    .attr("width", 10);
};

export default updateChart;
