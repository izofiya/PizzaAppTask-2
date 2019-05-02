import React from "react";

export class TotalTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      countPay: 0,
      countMoneyToCollect: parseFloat(this.props.totalOrder)
    };
  }

  render() {
    return this.props.isActivePizzaAndTable ? (
      <table>
        <thead>
          <tr>
            <th>{"Name"}</th>
            <th>{"Share to pay"}</th>
            <th>{"Pay"}</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td>Total order</td>
            <td>{this.props.totalOrder}</td>
            <td />
          </tr>
          <tr>
            <td>Money to collect</td>
            <td>
              {this.state.count === this.props.vegans.length + 1
                ? 0 + " BYN"
                : Math.round(this.state.countMoneyToCollect * 10) / 10  + " BYN"}
            </td>
            <td />
          </tr>
          <tr>
            <td>Money collected</td>
            <td>
              {this.state.count - 1 === this.props.vegans.length
                ? parseFloat(this.props.totalOrder) + " BYN"
                : Math.round(this.state.countPay * 10) / 10  + " BYN"}
            </td>
            <td />
          </tr>
        </tfoot>
        <tbody>
          {this.props.vegans.map((elem, index) => (
            <tr key={index}>
              {elem.isVegan === true ? (
                <td className="green">{elem.name}</td>
              ) : (
                <td>{elem.name}</td>
              )}
              <td>
                {this.state[index] ? "0 BYN" : this.props.priceForOnePerson}
              </td>
              <td>
                <button
                  className="buttonPay"
                  disabled={!this.state[index] ? false : true}
                  onClick={() => {
                    this.setState({
                      count: this.state.count + 1,
                      [index]: !this.state[index],
                      countPay:
                        this.state.countPay +
                        parseFloat(this.props.priceForOnePerson),
                      countMoneyToCollect:
                        parseFloat(this.props.totalOrder) -
                        parseFloat(this.props.priceForOnePerson) *
                          this.state.count
                    });
                  }}
                >
                  {this.state[index] ? "PAID" : "PAY"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : null;
  }
}
