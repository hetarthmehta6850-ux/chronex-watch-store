
const AnalyticsChart = ({ data, height = 250, labelColor = "#a3a3a3", barColor = "#f59e0b" }) => {
  // data should be an array of objects: { label: "Jan", value: 1200000 }
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map(d => d.value));
  const padding = { top: 20, right: 10, bottom: 30, left: 50 };
  const graphHeight = height - padding.top - padding.bottom;
  
  // Create Y-axis labels (3 markers)
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
      <svg width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: "visible" }}>
        
        {/* Y Axis Grid Lines & Labels */}
        {yAxisMarkers.map((marker, index) => {
          const y = padding.top + (index * (graphHeight / 3));
          return (
            <g key={`grid-${index}`}>
              <line 
                x1={padding.left} 
                y1={y} 
                x2="100%" 
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
          const barWidthPercent = 80 / data.length; 
          const spacingPercent = 20 / data.length;
          
          // X position as percentage
          const xPos = `${(index * (barWidthPercent + spacingPercent)) + (spacingPercent / 2)}%`;
          
          // Calculate bar height relative to max value
          const normalizedHeight = maxValue > 0 ? (item.value / maxValue) * graphHeight : 0;
          const yPos = padding.top + graphHeight - normalizedHeight;

          return (
            <g key={`bar-${index}`}>
              {/* The Bar */}
              <rect
                x={`calc(${padding.left}px + ${xPos})`}
                y={yPos}
                width={`${barWidthPercent}%`}
                height={normalizedHeight}
                fill={barColor}
                rx="4"
                className="transition-all duration-1000 ease-out hover:opacity-80 cursor-pointer"
              >
                <title>{`${item.label}: ₹${item.value.toLocaleString('en-IN')}`}</title>
              </rect>

              {/* X Axis Label */}
              <text
                x={`calc(${padding.left}px + ${xPos} + ${barWidthPercent / 2}%)`}
                y={height - 5}
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
