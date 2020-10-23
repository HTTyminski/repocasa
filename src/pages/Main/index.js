import React, { Component } from 'react';

import BarChart from '../../components/Chart';
import Table from '../../components/Table';

import { StyledBoxes } from './styles';

// Data generation
function getRandomArray(numItems) {
  // Create random array of objects
  const names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const data = [];
  for (let i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(20 + 80 * Math.random()),
    });
  }
  return data;
}

function getData() {
  const data = [];

  data.push({
    title: 'Categories',
    data: getRandomArray(5),
  });

  return data;
}

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: getData(),
    };
  }

  componentDidMount() {
    window.setInterval(() => {
      this.setState({
        data: getData(),
      });
    }, 5000);
  }

  render() {
    return (
      <>
        <StyledBoxes className="box">
          <div className="box__item">
            <div className="box__item-left">
              <h3>Utilities</h3>
              <span>13%</span>
            </div>
            <div className="box__item-right">
              <div>
                <span className="icon icon--budget" data-tip="Orçado">
                  <span className="circle" />
                </span>
                R$ 1.047.020,12
              </div>
              <div>
                <span className="icon icon--fulfilled" data-tip="Realizado">
                  <span className="letter">R</span>
                </span>
                R$ 2.052.120,45
              </div>
            </div>
          </div>
          <div className="box__item">
            <div className="box__item-left">
              <h3>Utilities / RNE</h3>
              <span>13%</span>
            </div>
            <div className="box__item-right">
              <div>
                <span className="icon icon--budget" data-tip="Orçado">
                  <span className="circle" />
                </span>
                R$ 1.047.020,12
              </div>
              <div>
                <span className="icon icon--fulfilled" data-tip="Realizado">
                  <span className="letter">R</span>
                </span>
                R$ 3.052.120,45
              </div>
            </div>
          </div>
          <div className="box__item">
            <div className="box__item-left">
              <h3>Utilities / Rec</h3>
              <span>13%</span>
            </div>
            <div className="box__item-right">
              <div>
                <span className="icon icon--budget" data-tip="Orçado">
                  <span className="circle" />
                </span>
                R$ 4.047.020,12
              </div>
              <div>
                <span className="icon icon--fulfilled" data-tip="Realizado">
                  <span className="letter">R</span>
                </span>
                R$ 4.052.120,45
              </div>
            </div>
          </div>
        </StyledBoxes>
        <BarChart
          data={this.state.data[0].data}
          title={this.state.data[0].title}
          color="#00305e"
        />
        <Table />
      </>
    );
  }
}
