
# RMJ - Homework 15 Interactive Visualizations and Dashboards

## Belly Button Biodiversity

Build an interactive dashboard to explore the Belly Button Biodiversity DataSet.

## Step 1 - Plotly.js 

Create a PIE chart that uses data from your samples route (/samples/<sample>) to display the top 10 samples.

```js
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
        height: 450,
        width: 450
    };

    // display the pie chart
    Plotly.plot("pie", pieChart, pieLayout);

 //END OF PIE CHART
    
```


![Pie Plot](static/images/piechart.png)
  
Create a Bubble Chart that uses data from your samples route (/samples/<sample>) to display each sample.

![Bubble Plot](static/images/bubbleplot.png)

Adapt the Gauge Chart to plot the Weekly Washing Frequency obtained from the route /wfreq/<sample>

Update the chart whenever a new sample is selected

![Gauge Plot](static/images/gaugeplot.png)



## Step 2 - Heroku 

Deploy your Flask app to Heroku.

Link to my Heroko app: 

![Dashboard](static/images/dashboard.png)

```python

```
