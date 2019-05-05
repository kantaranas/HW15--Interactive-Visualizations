
function buildMetadata(biosample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    var url = `/metadata/${biosample}`; 
    
    d3.json(url).then(function(biosample){ 

    var panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");


    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    Object.entries(biosample).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
      console.log(key, value);
      });
    });

}

//########################################################################

// CREATE PLOTS

function buildCharts(biosample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

  var url = `/samples/${biosample}`;
  d3.json(url).then(function(bacteriaData) {
    console.log(bacteriaData);

    // DATA TRACE

    var bubbletrace = {
      x: bacteriaData["otu_ids"],
      y: bacteriaData["sample_values"],
      text: bacteriaData["otu_labels"],
      mode: 'markers',
      opacity: 0.5,
      marker: {
        color: bacteriaData["otu_ids"],
        size: bacteriaData["sample_values"]
      },
      type: 'scatter'
    };
    console.log(bacteriaData.sample_values);


   // BUBBLE CHART
    var bubbledata = [bubbletrace];

    var bubblelayout = {
      title: "Bubble Chart: Bacteria Samples",
      hovermode: "closest",
      autosize: true,
      xaxis: { title: "OTU ID"},
    };

    //Display the bubble chart
    Plotly.newPlot("bubble", bubbledata, bubblelayout);

    // END OF BUBBLE CHART
    //#################################################

    // PIE CHART
    var pieChart = [{
        values : bacteriaData["sample_values"].slice(0, 10),
        labels : bacteriaData["otu_ids"].slice(0, 10),
        hovertext : bacteriaData["otu_labels"].slice(0, 10),
        hoverinfo: 'hovertext',
        type: "pie"
    }];

    var pieLayout = {
        title: "Pie Chart: Top 10 Bacteria Samples",
        height: 500,
        width: 500
    };

    // display the pie chart
    Plotly.plot("pie", pieChart, pieLayout);

    //END OF PIE CHART
    //#################################################
    
    //GAUGE PLOT

    // Enter a speed between 0 and 180
    var level = (biosample * (180/9));

    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var gaugedata = [{ type: 'scatter',
      x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: true,
        name: 'Frequency',
        text: level,
        hoverinfo: 'text+name'},
      { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
      rotation: 90,
      text: ['8-9', '7-8', '6-7', '5-6','4-5', '3-4', '2-3', '1-2', '0-1', ''],
      textinfo: 'text',
      textposition:'inside',
      marker: {
        colors:[
          'rgba(14, 127, 0, .5)',
          'rgba(14, 127, 0, .5)',
          'rgba(14, 127, 0, .5)',
          'rgba(14, 127, 0, .5)', 
          'rgba(110, 154, 22, .5)',
          'rgba(170, 202, 42, .5)', 
          'rgba(202, 209, 95, .5)',
          'rgba(210, 206, 145, .5)', 
          'rgba(232, 226, 202, .5)',
          'rgba(255, 255, 255, 0)']},
      labels: ['8-9 scrubs', '7-8 scrubs', '6-7 scrubs', '5-6 scrubs','4-5 scrubs', '3-4 scrubs', '2-3 scrubs', '1-2 scrubs', '0-1 scrubs', ''],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];

    var gaugelayout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      title: '<b>Belly Button Weekly Washing Frequency</b><br>Scrubs per Week',
      height: 500,
      width: 500,
      xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', gaugedata, gaugelayout);
  });
  }
// END GAUGE PLOT
//########################################################################

// INIT FUNCTION

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((biosample) => {
      selector
        .append("option")
        .text(biosample)
        .property("value", biosample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
