import {Component, EventEmitter, Event, h, State} from '@stencil/core';
import {AV_API_KEY} from '../../global/global';

@Component({
  tag: 'mp-stock-finder',
  styleUrl: './stock-finder.css',
  shadow: true
})
export class StockFinder {
  stockNameInput: HTMLInputElement;

  @Event({
    bubbles: true,
    composed: true,
  }) mpSymbolSelected: EventEmitter<string>;
  @State() searchResults: {
    symbol: string,
    name: string,
  }[] = [];
  @State() loading = false;

  onFindStock(event: Event) {
    event.preventDefault();
    const stockName = this.stockNameInput.value;
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
      .then(res => res.json())
      .then(parsedRes => {
        this.searchResults = parsedRes['bestMatches'].map(match => {
          return {
            name: match['2. name'],
            symbol: match['1. symbol']
          }
        });
        this.loading = false;
      })
      .catch(err => {
        console.log(err)
        this.loading = false;
      })
  }

  onSelectSymbol(symbol: string) {
    this.mpSymbolSelected.emit(symbol)
  }

  render() {
    let content = (
      <ul>{this.searchResults.map(result => (
          <li onClick={this.onSelectSymbol.bind(this, result.symbol)}><strong>{result.symbol}</strong>-{result.name}</li>
        ))}
      </ul>
    );

    if (this.loading) {
      content = <mp-spinner/>
    }
    return [
      <form onSubmit={this.onFindStock.bind(this)}>
        <input
          id="stock-symbol"
          type="text" ref={el => this.stockNameInput = el}
        />
        <button type="submit">Find!</button>
      </form>,
        content
    ]
  }
}
