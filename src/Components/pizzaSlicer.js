import React from "react";

class Pizza extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getStyles = this.getStyles.bind(this);
  }
  getStyles(index, visitors) {
    var degrees = 360 / visitors;
    var countLi = degrees * (index + 1);
    var skewYValue = 0;
    let style = "";
    if (visitors > 4 && visitors < 8) {
      skewYValue = -30;
    } else if (visitors > 6 && visitors < 12) {
      skewYValue = -45;
    } else if (visitors > 10) {
      skewYValue = -60;
    }
    style = {
      transform: "rotate(" + countLi + "deg) skewY(" + skewYValue + "deg)"
    };
    return style;
  }

  render() {
    return (
      <div id="app">
        <h5>{"Pizza type: " + this.props.pizzaOrder.type}</h5>
        <h5>{"Pizza name: " + this.props.pizzaOrder.name}</h5>
        <ul className="circle">
          {this.props.data.map((elem, index) => (
            <li
              key={index}
              style={this.getStyles(index, this.props.data.length)}
              className="liCircleClass"
            >
              <div className="text">{index + 1}</div>
            </li>
          ))}
        </ul>
        <div className="div1">
          <h3>
            {"How many people came to the party: " + this.props.dataAll.length}
          </h3>
          <div>
            {this.props.dataAll.map((elem, index) => (
              <p key={index}>{elem.name}</p>
            ))}
          </div>
        </div>
        <div className="div2">
          <h3>{"How many people eat pizza: " + this.props.data.length}</h3>
          <div>
            {this.props.data.map((elem, index) => (
              <p key={index}>{elem.name}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export class PizzaSlicer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="divForPizza">
        {this.props.isActivePizzaAndTable === false ? null : (
          <Pizza
            data={this.props.data}
            dataAll={this.props.dataAll}
            pizzaOrder={this.props.pizzaOrder}
          />
        )}
      </div>
    );
  }
}
