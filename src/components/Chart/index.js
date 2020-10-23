import React, { Component, createRef } from 'react';
import Chart from 'chart.js';

import { StyledCanvas } from './styles';

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'bar',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100,
              },
            },
          ],
        },
      },
      data: {
        labels: this.props.data.map(d => d.label),
        datasets: [
          {
            label: this.props.title,
            data: this.props.data.map(d => d.value),
            backgroundColor: this.props.color,
          },
        ],
      },
    });
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.label);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    this.myChart.update();
  }

  render() {
    return (
      <StyledCanvas>
        <canvas id="simChart" ref={this.canvasRef} />
      </StyledCanvas>
    );
  }
}

export default BarChart;
