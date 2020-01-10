//set up
var margin = { top: 5, right: 10, bottom: 5, left: 10 },
    width = 600,
    height = 600,
    innerRadius = Math.min(width, height) * 0.3,
    outerRadius = innerRadius * 1.06;


var Names = ["Africa", "Asia", "CIS", "Europe", "Middle East", "North America", "SCA"];

var svg = d3.select("#content")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var Colors = ["#ABEBC6", "#F5B7B1", "#73C6B6", "#85C1E9", "#FAD7A0", "#D7BDE2", "#E5E7E9"];

var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

var chord = d3.chord()
    .padAngle(0.03) //set pad angle between adjacent groups to the specified number in radians and returns this chord layout
    .sortSubgroups(d3.descending) //sort chords inside each arc
    .sortGroups(d3.descending)
    .sortChords(d3.descending); //sort layers of chords when crossing, biggest chord at bottom

var ribbon = d3.ribbon().radius(innerRadius);


d3.csv("data/2017_TM_Data_by_Region_Matrix.csv").then(function(d) {

    var matrix = d.map(function(d) {
        return [+d.Africa, +d.Asia, +d.CIS, +d.Europe, +d['Middle East'], +d['North America'], +d.SCA];
    });

    var g = svg.append("g")
        .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")")
        .datum(chord(matrix));

    var group = g.append("g")
        .attr("class", "group")
        .selectAll("g")
        .data(function(chords) {
            return chords.groups; })
        .enter()
        .append("g");

    group.append("path")
        .style("fill", function(d, i) {
            return Colors[i]; })
        .attr("d", arc)
        .style("fill-opacity", 0.75)
        .attr("class", function(d) {
            return ("group" + d.index); });

    group.append("g")
        .append("text")
        .attr("class", "label")
        .text(function(d, i) {
            return Names[i]; })
        .attr("transform", function(d) {
            var angle = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2,
                distance = outerRadius + 35;
            if (angle <= Math.PI / 2 & angle >= -Math.PI / 2) {
                return "rotate(" + angle * 180 / Math.PI + ") translate (" + (distance) + "0)";
            } else {
                return "rotate(" + (angle - Math.PI) * 180 / Math.PI + ") translate (-" + (distance + 68) + "0)";
            }
        });

    // ticks
    var groupTick = group.selectAll(".group-tick")
        .data(function(d) {
            return groupTicks(d, 40); })
        .enter()
        .append("g")
        .attr("class", "group-tick")
        .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate (" + outerRadius + ",0)"; });

    groupTick.append("line")
        .attr("x2", 3);

    groupTick.filter(function(d) {
            return d.value % 200 === 0; })
        .append("text")
        .attr("x", 8)
        .attr("dy", ".35em")
        .attr("transform", function(d) {
            return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
        .style("text-anchor", function(d) {
            return d.angle > Math.PI ? "end" : null; })
        .text(function(d) {
            return d.value });


    //ribbons
    g.append("g")
        .attr("class", "ribbons")
        .selectAll("path")
        .data(function(chords) {
            return chords; })
        .enter()
        .append("path")
        .attr("d", ribbon)
        .attr("class", function(d) {
            return ("group" + d.source.index); })
        .style("fill", function(d) {
            return Colors[d.source.index]; })
        .style("stroke", function(d) {
            return d3.rgb(Colors[d.source.index]).darker(); });


    //mouseover
    group.on("mouseover", function(d) {
        d3.selectAll(".ribbons")
            .selectAll("path")
            .style("stroke-width", "0")
            .style("fill-opacity", 0);

        d3.selectAll(".ribbons")
            .selectAll(".group" + d.index)
            .style("stroke-width", "0.03em")
            .transition()
            .style("fill-opacity", 0.75);

    }).on("mouseout", function(d) {
        d3.selectAll(".ribbons")
            .selectAll("path")
            .style("stroke-width", "0.01em")
            .style("fill-opacity", 0.55);

        d3.selectAll(".ribbons")
            .selectAll(".group" + d.index)
            .style("stroke-width", "0.01em")
            .transition()
            .style("fill-opacity", 0.55);

    });

    //function
    function groupTicks(d, step) {
        var k = (d.endAngle - d.startAngle) / d.value;
        return d3.range(0, d.value, step).map(function(value) {
            return { value: value, angle: value * k + d.startAngle };
        });
    }

});