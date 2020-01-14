import React from 'react'

class Converter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fromCurrency : "US Dollar",
            toCurrency : "Euro",
            amount : 0,
            Currencies : []
        }
    }

    getArray(json) {
        var result = []
        for(var i in json)
            result.push([i,json[i]]);
        console.log(result);
        return result;
    }

    componentDidMount() {
        const url = "https://localhost:44301/api/Currency";
        fetch(url).then(res => res.json())
        .then(json => this.setState({Currencies : this.getArray(json)}))
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <div>
                    <input type="text"/>
                    <select value={this.state.fromCurrency}>
                        {this.state.Currencies.map(curr => <option key= {curr[0]} >{curr[1]}</option>)}
                    </select>
                </div>
                <div>
                    <input type="text"/>
                    <select value={this.state.toCurrency}>
                    {this.state.Currencies.map(curr => <option key = {curr[0]} >{curr[1]}</option>)}
                    </select>
                </div>
            </div>
        )
    }
}

export default Converter;