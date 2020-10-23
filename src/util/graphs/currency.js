export const currencyBRoptions = {
  elements: {
    line: {
      tension: 0
    }
  },
  scales: {
    yAxes: [
      {
        ticks: {
          callback: function (value) {
            return 'R$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          },
        }
      },
    ],
    xAxes : [ {
      gridLines : {
          display : false
      },
      stacked: true
    } ]
  },
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      usePointStyle:true
    }
  }
}