import React from 'react';
import { Bar } from 'react-chartjs-2';

import { Wrapper } from './styles';

export default function ChartBar({
  displayTitle,
  displayLegend,
  data,
  options,
}) {
  return (
    <Wrapper>
      <Bar
        data={data}
        width={100}
        height={450}
        options={{
          maintainAspectRatio: false,
          title: {
            display: displayTitle,
            text: '',
          },
          legend: { display: displayLegend, position: 'bottom' },
          ...options,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </Wrapper>
  );
}
