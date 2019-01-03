import React, { Component } from "react";
import Style from "./App.scss";
import { Icon } from "antd";
//webhook test

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isvisible: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("https://api.coinmarketcap.com/v2/global/")
      .then(response => response.json())
      .then(response => this.setState({ data: response.data }))
      .catch(error => console.log(error.message));
  }
  getDate() {
    const data = this.state.data;

    let update = new Date(data.last_updated * 1000).toLocaleDateString("eu-EU");
    return update.toString();
  }
  getColor() {
    const data = this.state.data;
    if (data.bitcoin_percentage_of_market_cap > 50) {
      return "green";
    }
    if (data.bitcoin_percentage_of_market_cap === 50) {
      return "orange";
    }
    return "red";
  }
  getVariant(dark) {
    return dark ? "dark" : "light";
  }
  handleClick(e) {
    e.preventDefault();
    this.setState(state => ({ isvisible: !state.isvisible }));
    console.log(this.state.isvisible);
  }

  getTable() {
    const data = this.state.data;
    console.log(this.state.isvisible);
    if (this.state.isvisible === true) {
      return (
        <table>
          <tbody>
            <tr>
              <th>active cryptocurrencies</th>
              <th>active markets</th>
              <th>bitcoin percentage of market cap</th>
              <th>last update</th>
            </tr>
            <tr>
              <td className={Style.color + ` ${this.getVariant()}`}>
                {data.active_cryptocurrencies}
              </td>
              <td className={Style.color + ` ${this.getVariant(true)}`}>
                {data.active_markets}
              </td>
              <td
                className={
                  Style.color + ` ${this.getColor() + ` ${this.getVariant()}`}`
                }
              >
                {data.bitcoin_percentage_of_market_cap + "%"}
              </td>
              <td className={Style.color + ` ${this.getVariant(true)}`}>
                {this.getDate()}
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
    return <div />;
  }
  getIcon() {
    if (this.state.isvisible === true) {
      return (
        <Icon
          onClick={this.handleClick}
          type="caret-down"
          className={Style.arrow}
        />
      );
    }
    return (
      <Icon
        onClick={this.handleClick}
        type="caret-up"
        className={Style.arrow}
      />
    );
  }
  render() {
    const data = this.state.data;
    console.log(data.quotes);
    return (
      <div className={Style.App}>
        <div className={Style.content}>
          <div className={Style.tab}>
            <p className={Style.tabtext}>Global stats</p>
            {this.getIcon()}
          </div>
          <div className={Style.whiteelement} />
          {this.getTable()}
        </div>
      </div>
    );
  }
}

export default App;
