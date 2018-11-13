import { Component } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  percentage = 40;

  ngOnInit() {
    var svg = d3.select("svg");
    var data = ["", "", "", "", "", "", "", ""];
    var colors = ["#308344", "#59A253", "#7DC370", "#B3E0A6", "#FFBEB2", "#FA8F79", "#F05C4D", "#D3293D"];
    var opacity = [];
  
    for (let i = 0; i < data.length; i++) {
      if (this.percentage / 100 * data.length < i)
        opacity.push(0.2);
      else
        opacity.push(1);
    }
  
    var local = d3.local();
    var bars = svg.selectAll(null)
      .data(data)
      .enter()
      .append("g");

    bars.append("text")
      .text(String)
      .attr("y", function () {
        local.set(this.parentNode, this.getComputedTextLength())
        return 20;
      });

    bars.append("rect")
      .style("fill", function (d, i) {
        return colors[i];
      })
      .style("stroke-width", "3")
      .style("stroke", "#fff")
      .style("opacity", function (d, i) {
        return opacity[i]
      })
      .attr("x", function () {
        return local.get(this.parentNode);
      })
      .attr("y", 6)
      .attr("width", 30)
      .attr("height", 18);

    var counter = 0;

    bars.each(function (d, i) {
      if (i) {
        d3.select(this).attr("transform", "translate(" + (counter += local.get(this.previousSibling) + 32) + ",0)")
      }
    })
    var lineWidth = this.percentage * (counter + 30) / 100;
    var lineY = 14.5; //(16+8+linestroke pixels) by 2
    svg.append('line')
      .attr('x1', 0)
      .attr('y1', lineY)
      .attr('x2', lineWidth)
      .attr('y2', lineY)
      .attr('stroke', 'black')
      .attr('stroke-width', "4");

    svg.append('line')
      .attr('x1', lineWidth)
      .attr('y1', 0)
      .attr('x2', lineWidth)
      .attr('y2', lineY * 2)
      .attr('stroke', 'black')
      .attr('stroke-width', "4");
  }
}
