import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Anomaly } from '../../utils/types'; // Import the Anomaly interface

interface AreaChartProps {
  data: Anomaly[];
  width: number;
  height: number;
}

const AreaChart: React.FC<AreaChartProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);

    // Extract tweets number from anomalies
    const tweetsData = data.map(anomaly => anomaly.tweets);

    // Define scales
    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(tweetsData) || 0])
      .range([height, 0]);

    // Define area function
    const area = d3.area<number>()
      .x((_, i) => xScale(i) || 0)
      .y0(height)
      .y1(d => yScale(d) || 0);

    // Append the area path to the SVG
    svg.append("path")
      .datum(tweetsData)
      .attr("fill", "steelblue")
      .attr("d", area);
  }, [data, height, width]);

  return (
    <svg ref={svgRef} width={width} height={height}></svg>
  );
};

export default AreaChart;
