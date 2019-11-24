import {Component, h, State, Element, Prop, Watch, Listen} from '@stencil/core';
import {AV_API_KEY} from '../../global/global';

@Component({
  tag: 'mp-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})
export class StockPrice {
  stockInput: HTMLInputElement;

  @Element() el: HTMLElement;
  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() loading = false;
  @State() error: string;
  @Prop({mutable: true, reflect: true}) stockSymbol: string;

  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if(newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue)
    }
  }

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value
    this.stockInputValid = this.stockUserInput.trim().length > 0;
  }

  componentDidLoad() {
    const {stockSymbol} = this;
    if(stockSymbol) {
      this.stockUserInput = stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(stockSymbol)
    }
  }

  fetchStockPrice(stockSymbol: string) {
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Invalid!')
        }
        return res.json()
      })
      .then(parsedRes => {
        if (parsedRes['Error Message']) {
          throw new Error('Invalid symbol!')
        }
        this.error = null;
        this.fetchedPrice = +parsedRes['Global Quote']['05. price']
        this.loading = false;
      })
      .catch(err => {
        this.error = err.message;
        this.fetchedPrice = null;
        this.loading = false
      })
  }

  @Listen('body:mpSymbolSelected')
  onStockSymbolSelected(event: CustomEvent) {
    if(event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail
    }
  }

  hostData() {
    return {
      class: this.error ? 'error' : '',
    }
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    this.stockSymbol = this.stockInput.value;
  }

  render() {
    let dataContent = <p>Please enter symbol</p>;
    if (this.error) {
      dataContent = <p>{this.error}</p>;
    }
    if (this.fetchedPrice) {
      dataContent = <p>Price: ${this.fetchedPrice}</p>;
    }

    if (this.loading) {
      dataContent = <mp-spinner/>
    }

    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input
          id="stock-symbol"
          type="text" ref={el => this.stockInput = el}
          value={this.stockUserInput}
          onInput={this.onUserInput.bind(this)}
        />
        <button type="submit" disabled={!this.stockInputValid || this.loading}>Fetch</button>
      </form>,
      <div>{dataContent}</div>
    ]
  }
}
