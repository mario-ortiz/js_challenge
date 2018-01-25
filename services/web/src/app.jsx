import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import FlashMessages from './components/FlashMessages';
import NotFound from './components/NotFound';
import './app.css';

const API_URL = 'http://localhost:3001';

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            products: [],
            flash_messages: []
        }
        this.delete_flash_message = this.delete_flash_message.bind(this);
        this.create_flash_message = this.create_flash_message.bind(this);
        this.get_products = this.get_products.bind(this);
        this.search_product = this.search_product.bind(this);
    }

    componentWillMount() {
        this.get_products();
    }

    search_product(asin) {
        if (!asin)
            return this.create_flash_message('Please type an ASIN', 'error');
        axios
            .post(`${API_URL}/products/search/${asin}`)
            .then(res => {
                if (res.data.status === 'error') {
                    this.create_flash_message(res.data.payload.message, 'error');
                } else {
                    this.setState({ products: res.data.payload.products });
                }
            });
    }
    create_flash_message (text, type = 'success') {
        const message = { text, type };
        this.setState({
            flash_messages: [...this.state.flash_messages, message]
        });
    }
    delete_flash_message (index) {
        if (index > 0) {
            this.setState({
                flash_messages: [
                    ...this.state.flash_messages.slice(0, index),
                    ...this.state.flash_messages.slice(index + 1)
                ]
            });
        } else {
            this.setState({
                flash_messages: [...this.state.flash_messages.slice(index + 1)]
            });
        }
    }
    get_products() {
        const options = {
            url: `${API_URL}/products/list`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return axios(options)
            .then(res => {
                this.setState({ products: res.data.payload.products });
            });
    }
    render () {
        const {flash_messages, products} = this.state
        return (
            <div className='App container'>
                <br/>
                <FlashMessages
                    delete_flash_message={this.delete_flash_message}
                    messages={flash_messages} />
                <Switch>
                    <Route exact path='/' render={() => (
                        <div className="container text-center">
                            <h1>Jungle Challenge</h1>
                            <SearchBar search_product={this.search_product.bind(this)} />
                            <br/><br/><br/>
                            <ProductList
                                products={products}
                            />
                        </div>
                    )} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }
}

export default App