import React from 'react'
import * as d3 from 'd3' // use highcharts or something else instead
import './App.css';


function Plot (props) {

  // margin convention
  var top = 10
  var right = 30
  var left = 60
  var bottom = 30
  var width = 460 - left - right
  var height = 400 - top - bottom


  // scales for data
  var xScale = d3.scaleLinear().range([0, width])
  var yScale = d3.scaleLinear().range([height, 0])


  //const plot = d3.select(this.refs.plot)
  // add the svg to the body
  var svg = d3.select('plot-container').append('svg')
                                  .attr("width", width)
                                  .attr("height", height)
                                .append("g") // group elements
                                  .attr("transform", "translate(" + left + "," + top + ")")

  // Call the x axis in a group tag using xscale
  svg.append("g").attr("class","x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

  // Call the y axis in a group tag using yscale
  svg.append("g").attr("class", "y axis")
                  .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft


  var parseDate = d3.timeFormat("%b/%d/%y").parse



  var data = props.data


  // Scale the range of the data
  svg.selectAll("dot").data(data).enter().append("circle")
                                          .attr("class","dot")
                                          .attr("cx", d => xScale(d.index))
                                          .attr("cy", d => yScale(d.deaths))
                                          .attr("r",5)

  return (<div className="realplot"></div>)

}

export default Plot