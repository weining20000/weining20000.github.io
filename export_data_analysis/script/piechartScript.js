// set the dimensions and margins of the graph
var width = 550
    height = 550
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'content'
var svg = d3.select("#content")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create 7 data sets
var dataEurope = {Africa: 182.06, Asia: 730.78, CIS:158.92, Europe:4482.48, "Middle East":209.81, "North America":562.84, SCA:99.86}

var dataAsia = {Africa: 166.71, Asia: 3103.53, CIS:101.91, Europe:931.96, "Middle East":237.35, "North America":1115.14, SCA:157.83}

var dataAfrica = {Africa: 71.98, Asia: 115.01, CIS: 2.13, Europe:147.08, "Middle East": 21.11, "North America": 34.11, SCA: 7.8}

var dataCIS = {Africa: 19.46, Asia: 107.41, CIS:92.99, Europe:237.5, "Middle East":15.44, "North America":21.2, SCA:8.47}	

var dataMiddleEast = {Africa: 35.05, Asia: 419.94, CIS:6.4, Europe:129.57, "Middle East":128.67, "North America":66.59, SCA:5.86}		

var dataNorthAmerica = {Africa: 25.6, Asia: 520.4, CIS:11.75, Europe:382.24, "Middle East":69.23, "North America":1190.49, SCA:174.49}

var dataSCA = {Africa: 15.66, Asia: 180.46, CIS:6.87, Europe:95.05, "Middle East":17.5, "North America":132.52, SCA:131.04}			

// set the color scale
var color = d3.scaleOrdinal()
  .domain(["Africa", "Asia", "CIS", "Europe", "Middle East", "North America", "SCA"])
  .range(["#ABEBC6", "#F5B7B1", "#73C6B6", "#85C1E9", "#FAD7A0", "#D7BDE2", "#E5E7E9"]);

// create a function that update the plot for a given variable
function update(data, dataName){

	switch(dataName) {
		case "Africa":
			document.getElementById("countryParagraph").innerHTML="The total merchandise exports from Africa to the world totaled USD 399.22 billion in 2017. The top three export destinations for Africa were: Europe (36.8%), Asia (28.8%), and Africa (18%).";
			document.getElementById("countryFootnotes").innerHTML="Africa: Algeria, Congo, Guinea, Morocco, South Africa, Angola, Democratic Republic of the Congo, Guinea-Bissau, Mozambique, Sudan, South Sudan, Benin, Côte d'Ivoire, Eswatini, Kenya, Namibia, Botswana, Djibouti, Lesotho, Niger, Tanzania, Burkina Faso, Egypt, Liberia, Nigeria, Togo, Burundi, Equatorial Guinea, Libya, Rwanda, Tunisia, Cameroon, Eritrea Madagascar, Sao Tomé and Principe, Uganda, Cabo Verde, Ethiopia, Malawi, Senegal, Zambia, Central African Republic, Gabon, Mali, Seychelles, Zimbabwe, Chad, The Gambia, Mauritania, Sierra Leone, Comoros Ghana, Mauritius, Somalia, and other territories in the region not elsewhere specified."
			break;
		// code block
		case "Asia":
			document.getElementById("countryParagraph").innerHTML="The total merchandise exports from Asia to the world totaled USD 5.81 trillion in 2017. The top three export destinations for Asia were: Asia (53.4%), North America (19.2%), and Europe (16%).";
			document.getElementById("countryFootnotes").innerHTML="Asia (including Oceania): Afghanistan, Hong Kong China, Malaysia, Papua New Guinea, Tonga, Australia, India, Maldives, Philippines, Tuvalu Bangladesh, Indonesia, Mongolia, Samoa, Vanuatu, Bhutan, Japan, Myanmar, Singapore, Viet Nam, Brunei Darussalam, Kiribati Nepal, Solomon Islands, Cambodia, Korea Republic of, New Zealand, Sri Lanka, China, Lao People’s Democratic Republic, Pakistan, Chinese Taipei, Fiji, Macao China, Palau Thailand, and other territories in the region not elsewhere specified.";
			break;
		// code block
		case "CIS":
			document.getElementById("countryParagraph").innerHTML="The total merchandise exports from CIS to the world totaled USD 502.47 billion in 2017. The top three export destinations for CIS were: Europe (47.3%), Asia (21.4%), and CIS (18.5%).";
			document.getElementById("countryFootnotes").innerHTML="Commonwealth of Independent States (CIS), including associate and former member States: Armenia, Georgia, Moldova, Republic of Turkmenistan, Azerbaijan, Kazakhstan, Russian Federation, Ukraine, Belarus, Kyrgyz Republic, Tajikistan, Uzbekistan, and other territories in the region not elsewhere specified."
			break;
		// code block
		case "Europe":
			document.getElementById("countryParagraph").innerHTML="The total merchandise exports from Europe to the world totaled USD 6.43 trillion in 2017. The top three export destinations for Europe were: Europe (70%), Asia (11.4%), and North America (8.8%).";
			document.getElementById("countryFootnotes").innerHTML="Europe: Andorra, Denmark, Iceland, Montenegro, Slovenia, Austria, Estonia, Ireland, Netherlands, Spain, Belgium, Finland, Italy, Norway, Sweden, Bosnia and Herzegovina, France, Latvia, Poland, Switzerland, Bulgaria, The Former Yugoslav Republic of Macedonia, Liechtenstein Portugal, Turkey, Croatia, Germany, Lithuania, Romania, United Kingdom, Cyprus, Greece, Luxembourg, Serbia, Czech Republic, Hungary, Malta, Slovak Republic, Albania, and other territories in the region not elsewhere specified."
			break;
		// code block
		case "Middle East":
			document.getElementById("countryParagraph").innerHTML="The total merchandise exports from Middle East to the world totaled USD 792.08 billion in 2017. The top three export destinations for Middle East were: Asia (53%), Europe (16.4%), and Middle East (16%).";
			document.getElementById("countryFootnotes").innerHTML="Middle East: Bahrain, Kingdom of Israel, Lebanese Republic, Saudi Arabia, Kingdom of Yemen, Iran, Jordan, Oman, Syrian Arab Republic, Iraq, Kuwait, the State of Qatar, United Arab Emirates, and other territories in the region not elsewhere specified."
			break;
		// code block
		case "North America":
			document.getElementById("countryParagraph").innerHTML="The total merchandise exports from North America to the world totaled USD 2.37 trillion in 2017. The top three export destinations for North America were: North America (50%), Asia (22%), and Europe (16%).";
			document.getElementById("countryFootnotes").innerHTML="North America: Bermuda, Canada, Mexico, United States of America, and other territories in the region not elsewhere specified."
			break;
		// code block
		case "SCA":
			document.getElementById("countryParagraph").innerHTML="The total merchandise exports from SCA to the world totaled USD 399.22 billion in 2017. The top three export destinations for SCA were: Asia (31.2%), North America (22.6%), and SCA (22.6%).";
			document.getElementById("countryFootnotes").innerHTML="South and Central America and the Caribbean: Antigua and Barbuda, Brazil, Ecuador, Jamaica, Saint Lucia, Argentina, Chile, El Salvador, Aruba, the Netherlands with respect to Saint Vincent and the Grenadines, Bahamas, Colombia, Grenada, Nicaragua, Suriname, Barbados, Costa Rica, Guatemala, Panama, Trinidad and Tobago, Belize, Cuba, Guyana, Paraguay, Uruguay, Venezuela, Bolivarian Rep. of Dominica, Haiti, Peru, Bolivia, Plurinational State of Dominican Republic, Honduras, Saint Kitts and Nevis, Curuçao Saint Martin, and other territories in the region not elsewhere specified."
			break;
		// code block
		case "Others":
			document.getElementById("countryParagraph").innerHTML="none";
			document.getElementById("countryFootnotes").innerHTML="none";
			break;
		// code block
	}

	// Compute the position of each group on the pie:
	var pie = d3.pie()
	  .value(function(d) {return d.value; })
	
	var data_ready = pie(d3.entries(data))

	// The arc generator
	var arc = d3.arc()
				.innerRadius(radius * 0.5)
				.outerRadius(radius * 0.8)

	//Another arc that won't be drawn. Just for labels positionning 
	var outerArc = d3.arc()
						.innerRadius(radius * 0.9)
						.outerRadius(radius * 0.9)

	// map to data
	var u = svg.selectAll("allSlices")
				.data(data_ready);

	// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
	u
	  .enter()
	  .append('path')
	  .merge(u)
	  .transition()
	  .duration(2000)
	  .attr('d', arc)
	  .attr('fill', function(d){ return(color(d.data.key)) })
	  .attr("stroke", "white")
	  .style("stroke-width", "2px")
	  .style("opacity", 1)

	// remove the group that is not present anymore
	u
		.exit()
		.remove();

}

// initialize the plot with the first dataset
update(dataAfrica, "Africa")

//append legend to the body of svg

var colorL = d3.scaleOrdinal()
		  .domain(["Africa", "Asia", "CIS", "Europe", "Middle East", "North America", "SCA", "Others"])
	  .range(["#ABEBC6", "#F5B7B1", "#73C6B6", "#85C1E9", "#FAD7A0", "#D7BDE2", "#E5E7E9"]);

svg.append("g")
    .attr("class", "legendOrdinal")
    .attr("transform", "translate(-35,-58)");

var colorLVar = d3.legendColor()
                        .shape("path", d3.symbol().type(d3.symbolSquare).size(150)())
                        .shapePadding(0.5)
  //use cellFilter to hide the "e" cell
                        .cellFilter(function(d){ return d.label !== "Others" })
                        .scale(colorL);

svg.select(".legendOrdinal")
    .call(colorLVar);