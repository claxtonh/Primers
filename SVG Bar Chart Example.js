//** General plot setup (taken directly from class)

//data
var dataArray = [1, 2, 3];
var dataCategories = ["one", "two", "three"];

//svg container
var svgHeight = 400;
var svgWidth = 1000;

//margins
var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

// char area minus margins
var chartHeight = svgHeight - margin.top -margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

// create svg container
var svg = d3.select("#svg-area").append("svg") // creating a svg under the svg-area tag in the html
    .attr("heigh", svgHeight)
    .attr("width", svgWidth);

// shift everything over by the margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// scale y to chart height
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataArray)]) // we opted not to use extent because we wanted the graph to start at 0
    .range([chartHeight, 0]);    // In this instance, You're inverting how things will be drawn.  Remember rectangles a drawn from the top left corner down.

//scale x to chart width
var xScale = d3.scaleBand()
    .domain(dataCategories)
    .range([0, chartWidth ])
    .padding(0.05);

// create axes
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale);

// set x to the bottom of the chart
chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

// set y to the left of the chart
chartGroup.append("g")
    .call(yAxis);  // we don't need to translate this, because it's already in the correct place (as per the attribution in the parent "g")
    // this could also have been written as
    // var g = chartgroup.append("g");
        //yAxis(g);


    // Append Data to chartGroup
chartGroup.selectALL(".bar")
    .data(dataArray)
    .enter()   // because there are no bars in the html, all of them will be created
    .append("rect")
    .clased("bar", true)
    .attr("x", (d,i) => xScale(dataCategories[i]))   // remember xScale can provide the individual x coord of eache point in it's array
    .attr("y", d => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => chartHeight - yScale(d));

    