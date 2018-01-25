import React, { Component } from 'react';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = { asin: '' };
    }

    reset_input() {
        this.setState({
            asin: ''
        });
    }

    submit_input() {
        this.props.search_product(this.state.asin);
        this.reset_input();
    }

    render() {
        return (
            <div className="search-bar input-group">
                <input
                    value={this.state.asin}
                    className="form-control"
                    placeholder="Type an ASIN"
                    onChange={event => this.setState({ asin: event.target.value })}/>
                <span className="input-group-btn">
                <button
                    className="btn btn-success"
                    type="button"
                    onClick={() => this.submit_input()}>Search Product</button>
                </span>
            </div>
        );
    }
}

export default SearchBar;