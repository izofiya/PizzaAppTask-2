import React from "react";
import ReactDOM from "react-dom";
import { ButtonLoad } from "./Components/buttonLoad";
import { PizzaSlicer } from "./Components/pizzaSlicer";
import { TotalTable } from "./Components/totalTable";
import "./css/styles.css";
import "./css/pizzaSlicer.css";

export class PizzaApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataAll: [],
      isActivePizzaAndTable: false,
      isActiveButtonLoad: false,
      isLoading: false,
      vegans: "",
      pizzaType: "",
      countVegan: 0,
      countMeat: 0,
      pizzaOrder: "",
      currency: "",
      countVisitorsEat: 0,
      priceForOnePerson: 0,
      totalOrder: 0
    };
    this.handleButtonLoadClick = this.handleButtonLoadClick.bind(this);
    this.getVisitors = this.getVisitors.bind(this);
    this.getVegans = this.getVegans.bind(this);
    this.getPizzaType = this.getPizzaType.bind(this);
    this.getPriceForOnePerson = this.getPriceForOnePerson.bind(this);
    this.getTotalOrder = this.getTotalOrder.bind(this);
    this.getCurrencyExchange = this.getCurrencyExchange.bind(this);
  }
  getVisitors(data) {
    let visitorsArr = [];
    let a = [];
    data.forEach(function(elem) {
      visitorsArr.push(elem.name);
    });
    for (var i = 0; i < visitorsArr.length; i++) {
      var words = visitorsArr[i].split(" ");
      a.push(words[0] + "%20" + words[1]);
    }
    return a.join();
  }
  getVegans(data) {
    fetch(
      "https://gp-js-test.herokuapp.com/pizza/world-diets-book/" +
        this.getVisitors(data)
    )
      .then(response => response.json())
      .then(vegans => {
        let pizzaType = [];
        let countVegan = 0;
        let countMeat = 0;
        vegans.diet.forEach(elem => {
          if (elem.isVegan === true) {
            pizzaType.push("vegan");
            countVegan += 1;
          }
          if (elem.isVegan === false) {
            pizzaType.push("meat");
            countMeat += 1;
          }
        });
        this.setState({
          vegans: vegans.diet,
          pizzaType: pizzaType,
          countVegan: countVegan,
          countMeat: countMeat
        });
        this.getPizzaType(countMeat, countVegan, countMeat + countVegan);
      });
  }
  getPizzaType(countMeat, countVegan, countVisitorsEat) {
    let url = "https://gp-js-test.herokuapp.com/pizza/order/";
    if (countMeat >= countVegan) {
      url = url + "meat/" + countVisitorsEat;
    }
    if (countMeat < countVegan) {
      var arrValue = ["vegan", "cheese"];
      var rand = Math.floor(Math.random() * arrValue.length);
      url = url + arrValue[rand] + "/" + countVisitorsEat;
    }
    Promise.all([
      fetch(url),
      fetch("https://gp-js-test.herokuapp.com/pizza/currency")
    ]).then(arr => {
      const pizzaOrderResponse = arr[0];
      const currencyResponse = arr[1];
      Promise.all([pizzaOrderResponse.json(), currencyResponse.json()]).then(
        dataArr => {
          this.setState({
            pizzaOrder: dataArr[0],
            currency: dataArr[1]
          });
          this.getPriceForOnePerson(
            dataArr[0],
            dataArr[1],
            this.state.countVisitorsEat
          );
          this.getTotalOrder(dataArr[0], dataArr[1], 1);
        }
      );
    });
  }
  getCurrencyExchange(price, course, count) {
    let valueTotalOrder;
    if (price.price.match(/USD/g)) {
      valueTotalOrder =
      Math.round(((parseFloat(price.price) / count) * course.USD) * 10) / 10  + " BYN";
    } else if (price.price.match(/EUR/g)) {
      valueTotalOrder =
      Math.round(((parseFloat(price.price) / count) * course.USD) * 10) / 10  + " BYN";
    } else {
      valueTotalOrder =
      Math.round(((parseFloat(price.price) / count) * course.USD) * 10) / 10  + " BYN";
    }
    return valueTotalOrder;
  }
  getTotalOrder(price, course, count) {
    this.setState({
      totalOrder: this.getCurrencyExchange(price, course, count)
    });
  }
  getPriceForOnePerson(price, course, count) {
    this.setState({
      priceForOnePerson: this.getCurrencyExchange(price, course, count)
    });
  }
  handleButtonLoadClick() {
    fetch("https://gp-js-test.herokuapp.com/pizza/guests")
      .then(response => response.json())
      .then(data => {
        let dataArr = [];
        let countVisitorsEat = 0;
        data.party.forEach(elem => {
          if (elem.eatsPizza === true) {
            dataArr.push(elem);
            countVisitorsEat += 1;
          }
        });
        this.setState({
          data: dataArr,
          dataAll: data.party,
          countVisitorsEat: countVisitorsEat,
          isActiveButtonLoad: true,
          isLoading: true
        });
        this.getVegans(dataArr);
      });

    setTimeout(() => {
      this.setState({
        isActiveButtonLoad: false,
        isActivePizzaAndTable: true,
        isLoading: false
      });
    }, 3000);
  }

  render() {
    return (
      <div className="wrapp">
        <ButtonLoad
          className={this.state.isActiveButtonLoad}
          onClick={this.handleButtonLoadClick}
        />
        {this.state.isLoading ? (
          <p className="pLoading">loading</p>
        ) : (
          <div>
            <TotalTable
              vegans={this.state.vegans}
              isActivePizzaAndTable={this.state.isActivePizzaAndTable}
              pizzaOrder={this.state.pizzaOrder}
              priceForOnePerson={this.state.priceForOnePerson}
              totalOrder={this.state.totalOrder}
            />
            <PizzaSlicer
              data={this.state.data}
              dataAll={this.state.dataAll}
              isActivePizzaAndTable={this.state.isActivePizzaAndTable}
              pizzaOrder={this.state.pizzaOrder}
            />
          </div>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<PizzaApp />, rootElement);
