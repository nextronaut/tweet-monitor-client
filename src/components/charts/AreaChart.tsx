import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { Anomaly } from "../../utils/types"; // Import the Anomaly interface

interface AreaChartProps {
  data: Anomaly[];
  height: number;
}

const AreaChart: React.FC<AreaChartProps> = ({ data, height }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);

    svg.html("");

    // Extract tweets number from anomalies
    const tweetsData = data.map((anomaly) => anomaly.tweets);

    // Define scales
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, svgRef.current.clientWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(tweetsData) || 0])
      .range([height, 0]);

    // Define area function
    const area = d3
      .area<number>()
      .x((_, i) => xScale(i) || 0)
      .y0(height)
      .y1((d) => yScale(d) || 0);

    // Append the area path to the SVG
    svg
      .append("path")
      .datum(tweetsData)
      .attr("fill", "steelblue")
      .attr("d", area);

    // Add x-axis label
    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "middle")
      .attr("x", svgRef.current.clientWidth / 2)
      .attr("y", height - 6)
      .text("Anomaly");

    // Add y-axis label
    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "middle")
      .attr("x", -height / 2)
      .attr("y", -1)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Tweet Counts");

  }, [data, height]);

  return <svg ref={svgRef} style={{ width: "100%", height }}></svg>;
};

export default AreaChart;