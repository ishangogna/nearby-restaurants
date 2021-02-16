import React, { Component } from 'react';
import { SearchSharp  } from 'react-ionicons'
import SearchResult from './searchResult';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = { value : '', search_values : [] };
    }
    

    handleChange = ( event ) => {
        this.setState({value : event.target.value});
    }

    handleSubmit = (event) => {
        if(this.state.value === ''){
            console.log('no value');
        }
        else { 
            const URL_Search = `https://api.documenu.com/v2/restaurants/search/fields?restaurant_name=${this.state.value}&state=NY`;
            fetch(URL_Search, {
                headers : {
                    'X-API-KEY': '9ea85917729faab77a5052ddd39fb679'
                }
            })
            .then(response => response.json())
            .then(logs => {
                this.setState({
                    search_values : logs.data
                }, () => console.log(this.state.search_values))
            })
        }
        event.preventDefault();
        
    }

    render(){
        return (
            <div>
                <div style = {{
                    display : 'flex',
                    flexDirection : 'row',
                    justifyContent : 'center',
                    padding : 5,
                    }}>
                    <div style = {{
                        borderWidth : 1,
                        borderColor : 'black'
                    }}>
                        <form style = {{ 
                            display : 'flex',
                            alignContent : 'center',
                            justifyContent : 'center',
                        }}
                            onSubmit = {this.handleSubmit}
                            >
                        <SearchSharp
                            color={'#00000'}
                            height="20px"
                            width="20px"
                            onClick={() => alert('Hi!')}
                            />
                            <input 
                                type = "text" 
                                name = "search"
                                onChange = {this.handleChange}
                                placeholder = "Search by name"
                                />
                            <input type = "submit" value = "search" />
                        </form>
                    </div>
                </div>
                <div style = {{height : '94vh',overflow : 'scroll'}}>
                    {this.state.search_values.map(search=>(<div><SearchResult 
                                                                    restaurant_name = {search.restaurant_name}
                                                                    address = {search.address.formatted}
                                                                    price_range = {search.price_range}
                                                                    cuisines = {search.cuisines}
                                                                     /></div>))}    
                </div>
            </div>
        );
        }
    }
export default SearchBar;