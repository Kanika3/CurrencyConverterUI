import React from 'react'
import './converter.css'

class Converter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fromCurrency : "",
            toCurrency : "",
            amount : undefined,
            Currencies : [],
            convertedValue : undefined
        }
    }

    getArray(json) {
        var result = []
        for(var i in json)
            result.push([i,json[i]]);
        console.log(result);
        return result;
    }

    getCurrencyName(code) {
        for(var i in this.state.Currencies)
        {
            if(this.state.Currencies[i][0] === code)
                return this.state.Currencies[i][1];
        }
        return "";
    }

    componentDidMount() {
        const url = "https://localhost:44301/api/Currency";
        fetch(url).then(res => res.json())
        .then(json => this.setState({Currencies : this.getArray(json)}))
        .catch(err => console.log(err));
    }

    amountChanged = (value) => {
        
        this.setState({amount : value});
        this.getRate(this.state.fromCurrency,this.state.toCurrency,value);
    }

    getRate(from , to, amount) {
        if(from === "" || to === "")
            {
                alert("Please select From and To Currencies")
                return;
            }

        const url = "https://localhost:44301/api/ExchangeRates";
        let parameterizedUrl = url + "?from=" + from + "&to=" + to; 

        fetch(parameterizedUrl).then(res => res.json())
        .then(json => this.setState({convertedValue : json * amount}))
        .catch(err => console.log(err));
    }

    setFromCurrency = (currency) => {
        this.setState({fromCurrency : currency});

        if(this.state.amount)
            this.getRate(currency, this.state.toCurrency, this.state.amount);
    }

    setToCurrency = (currency) => {
        this.setState({toCurrency : currency});

        if(this.state.amount)
            this.getRate(this.state.fromCurrency, currency, this.state.amount);
    }

    render() {
        return (
            <div>
                <h2>Currency Converter</h2>
                <div>
                    <input type="text"  onChange={e => this.amountChanged(e.target.value)}/>
                    <select onChange={e => this.setFromCurrency(e.target.value)}>
                        <option selected disabled hidden Style='display: none' value=''>-- select an option --</option>
                        {this.state.Currencies.map(curr => <option key= {curr[0]} value = {curr[0]}>{curr[1]}</option>)}
                    </select>
                </div>
                <div>
                    <input readOnly type="text" value= {this.state.convertedValue}/>
                    <select onChange={e => this.setToCurrency(e.target.value)}>
                        <option selected disabled hidden Style='display: none' value=''>-- select an option --</option>
                        {this.state.Currencies.map(curr => <option key = {curr[0]} value = {curr[0]}>{curr[1]}</option>)}
                    </select>
                </div>
            </div>
        )
    }
}

export default Converter;