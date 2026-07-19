import { useEffect, useRef } from 'react';

interface InteractiveChartProps {
  data: {
    labels: string[];
    values: number[];
  };
  type?: 'bar' | 'line';
  color?: string;
}

export default function InteractiveChart({ 
  data, 
  type = 'bar',
  color = '#14B8A6'
}: InteractiveChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawChart = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.clearRect(0, 0, rect.width, rect.height);

      const padding = 40;
      const chartWidth = rect.width - padding * 2;
      const chartHeight = rect.height - padding * 2;
      const maxValue = Math.max(...data.values);
      const barWidth = chartWidth / data.values.length;

      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(rect.width - padding, y);
        ctx.stroke();
      }

      data.values.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + index * barWidth + barWidth * 0.1;
        const y = rect.height - padding - barHeight;
        const width = barWidth * 0.8;

        if (type === 'bar') {
          ctx.fillStyle = color;
          ctx.fillRect(Math.floor(x), Math.floor(y), Math.ceil(width), Math.ceil(barHeight));
        } else if (type === 'line') {
          if (index === 0) {
            ctx.beginPath();
            ctx.moveTo(x + width / 2, y);
          } else {
            ctx.lineTo(x + width / 2, y);
          }
          
          if (index === data.values.length - 1) {
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.stroke();
            
            data.values.forEach((val, idx) => {
              const pointX = padding + idx * barWidth + barWidth * 0.5;
              const pointY = rect.height - padding - (val / maxValue) * chartHeight;
              ctx.beginPath();
              ctx.arc(pointX, pointY, 4, 0, Math.PI * 2);
              ctx.fillStyle = color;
              ctx.fill();
            });
          }
        }

        ctx.fillStyle = '#6B7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          data.labels[index],
          x + width / 2,
          rect.height - padding + 20
        );
      });
    };

    drawChart();

    const resizeObserver = new ResizeObserver(() => {
      drawChart();
    });

    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
    };
  }, [data, type, color]);

  return (
    <div className="relative w-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-64"
        role="img"
        aria-label={`Graphique ${type === 'bar' ? 'en barres' : 'linéaire'} montrant ${data.labels.join(', ')}`}
      />
      <table className="sr-only">
        <caption>Données du graphique</caption>
        <thead>
          <tr>
            <th>Catégorie</th>
            <th>Valeur</th>
          </tr>
        </thead>
        <tbody>
          {data.labels.map((label, index) => (
            <tr key={index}>
              <td>{label}</td>
              <td>{data.values[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




