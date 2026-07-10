import { useEffect, useState } from "react";

const AnalyticsChart = ({ data, height = 250, labelColor = "#a3a3a3", barColor = "#f59e0b" }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setAnimated(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map(d => d.value));
  const svgWidth = 600;
  const svgHeight = height;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  // Create Y-axis labels (4 markers)
  const yAxisMarkers = [
    maxValue,
    maxValue * 0.66,
    maxValue * 0.33,
    0
  ];

  const formatCurrency = (val) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
    return `₹${val}`;
  };

  return (
    <div className="w-full relative" style={{ height: `${height}px` }}>
      <svg 
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        width="100%" 
        height="100%" 
        preserveAspectRatio="none" 
        style={{ overflow: "visible" }}
      >
        
        {/* Y Axis Grid Lines & Labels */}
        {yAxisMarkers.map((marker, index) => {
          const y = padding.top + (index * (graphHeight / 3));
          return (
            <g key={`grid-${index}`}>
              <line 
                x1={padding.left} 
                y1={y} 
                x2={svgWidth} 
                y2={y} 
                stroke="#333" 
                strokeDasharray="4 4" 
                strokeWidth="1"
              />
              <text 
                x={padding.left - 10} 
                y={y + 4} 
                fill={labelColor} 
                fontSize="10" 
                textAnchor="end"
                fontFamily="sans-serif"
              >
                {formatCurrency(marker)}
              </text>
            </g>
          );
        })}

        {/* Bars and X Axis Labels */}
        {data.map((item, index) => {
          // Calculate dynamic width based on number of items (leave space between)
          const barWidth = (graphWidth * 0.8) / data.length; 
          const spacing = (graphWidth * 0.2) / data.length;
          
          // X position inside the SVG coordinate system
          const xPos = padding.left + (index * (barWidth + spacing)) + (spacing / 2);
          
          // Calculate bar height relative to max value
          const normalizedHeight = maxValue > 0 ? (item.value / maxValue) * graphHeight : 0;
          
          // Dynamic height and Y values for growing animation
          const currentHeight = animated ? normalizedHeight : 0;
          const currentY = animated ? (padding.top + graphHeight - normalizedHeight) : (padding.top + graphHeight);

          return (
            <g key={`bar-${index}`}>
              {/* The Bar */}
              <rect
                x={xPos}
                y={currentY}
                width={barWidth}
                height={currentHeight}
                fill={barColor}
                rx="4"
                className="hover:opacity-80 cursor-pointer"
                style={{
                  transition: "height 0.8s cubic-bezier(0.16, 1, 0.3, 1), y 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                <title>{`${item.label}: ₹${item.value.toLocaleString('en-IN')}`}</title>
              </rect>

              {/* X Axis Label */}
              <text
                x={xPos + barWidth / 2}
                y={svgHeight - 10}
                fill={labelColor}
                fontSize="11"
                textAnchor="middle"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default AnalyticsChart;
