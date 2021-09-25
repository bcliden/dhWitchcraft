/*
  this function is extracted from a different dhWitchcraft repo of mine.
  it draws the word frequency comparison charts we will use in figures/frequency
  https://github.com/bliden/digital-witchcraft-viz
*/

import { 
  axisBottom, 
  axisLeft, 
  csv, 
  max,
  scaleBand, 
  scaleOrdinal,
  scaleLinear, 
  schemePaired, 
  select, 
  stack as d3stack, 
  stackOffsetNone, 
  stackOrderNone, 
} from 'd3'

export async function drawChart(element, file, count = 0) {
  let data = null;
  try {
    data = await csv(file)
  } catch (e) {
    // debugger
    console.warn("couldn't find file: ", file)
    return false
  }

  /*
    word
    uses_in_*primary*, // numeric
    uses_in_*secondary*, // numeric
    total_uses // numeric
  */
  data = data.slice(0, 15);
  const numericHeadings = Object.keys(data[0]).slice(1); // cut out 'word'
  data.forEach(d => {
    numericHeadings.forEach(heading => {
      d[heading] = Number.parseInt(d[heading]);
    });
  });
  return render(element, data, count);
}

function render(element, data, count) {
  // build top svg and append class no.
  const svg = select(element)
    .append("div")
    .attr("class", d => `chart-${count}`)
    .append("svg")
    .attr("width", 960)
    .attr("height", 500);

  // iteration counter for color changes
  // multiply to ensure it's even, then modulo by 12
  const iteration = (count * 2) % 12;

  const width = Number.parseInt(svg.attr("width"));
  const height = Number.parseInt(svg.attr("height"));
  const margin = {
    left: 80,
    top: 50,
    right: 30,
    bottom: 70
  };
  const xValue = d => d.word;
  const yValue = d => d.total;
  const xAxisLabel = "Word";
  const yAxisLabel = "# of Uses";
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const stackFields = Object.keys(data[0]).slice(1, 3);
  const [primary, secondary] = stackFields;

  // config X scale and axis
  const xScale = scaleBand()
    .domain(data.map(xValue))
    .range([0, innerWidth])
    .padding(0.3);

  const xAxis = axisBottom(xScale);

  // config Y scale and axis
  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight, 0])
    .nice();

  const yAxis = axisLeft(yScale).tickSize(-innerWidth);

  // set color scheme
  const colors = scaleOrdinal(schemePaired);

  // append graph body & move according to margin
  const body = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // add groups for Axes
  const yAxisG = body
    .append("g")
    .attr("class", "y axis")
    .attr("z-index", 0)
    .call(yAxis);
  yAxisG.selectAll(".domain").remove();

  const xAxisG = body
    .append("g")
    .call(xAxis)
    .attr("class", "x axis")
    .attr("z-index", 0)
    .attr("transform", `translate(0, ${innerHeight})`);
  xAxisG.select(".domain").remove();

  // Stack Generator
  const stack = d3stack()
    .keys(stackFields)
    .order(stackOrderNone)
    .offset(stackOffsetNone);
  const series = stack(data);

  // append special g just for bars + series in graph
  const graph = body.append("g");

  // add groups for each row
  const groupings = graph
    .selectAll("g")
    .data(series)
    .enter()
    .append("g")
    .attr("class", "grouping")
    .style("fill", (d, i) => schemePaired[i + iteration]);

  // add bars across row
  groupings
    .selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
    .attr("y", d => {
      return yScale(d[1]);
    })
    .attr("x", (d, i) => {
      return xScale(d.data.word);
    })
    .attr("width", d => xScale.bandwidth())
    .attr("height", d => yScale(d[0]) - yScale(d[1]));

  // append title
  body
    .append("text")
    .text(`${primary} vs. ${secondary}`)
    .attr("class", "chart-title")
    .attr("y", -10);

  // append X Axis label
  xAxisG
    .append("text")
    .attr("y", 50)
    .attr("x", innerWidth / 2)
    .attr("fill", "black")
    .attr("class", "x axis-label")
    .text(xAxisLabel);

  // append Y axis label
  yAxisG
    .append("text")
    .attr("y", -40)
    .attr("x", -innerHeight / 2)
    .attr("fill", "black")
    .attr("class", "y axis-label")
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text(yAxisLabel);

  // append legends
  const legend = body
    .selectAll(".legend")
    .data(stackFields)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) {
      return "translate(0," + i * 20 + ")";
    })
    .style("font", "10px sans-serif");

  legend
    .append("rect")
    // .attr("x", innerWidth + 18)
    .attr("x", innerWidth - 18)
    .attr("width", 18)
    .attr("height", 18)
    .attr("fill", (d, i) => schemePaired[i + iteration]);

  legend
    .append("text")
    // .attr("x", innerWidth + 44)
    .attr("x", innerWidth - 25)
    .attr("y", 9)
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .text(d => {
      return d;
    });

  return true
}