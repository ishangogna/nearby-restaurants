import React, { Component } from 'react';

class SearchResult extends Component {
    constructor(props){
    super(props);
    }
    render(){
        return(
            <div style = {{
                display : 'flex',
                flexDirection : 'column',
                height : 70,  
                padding : 4,
                borderRadius : 10,
                backgroundColor : '#B3FCFF',
                justifyContent : 'center',
                marginTop : 5,
            }}>
                <div style = {{ fontSize : 12, fontWeight : 'bold' }}>{this.props.restaurant_name}</div>
                <div style = {{ fontSize : 12, fontWeight : 20 }}>{this.props.address}</div>
                <div style = {{ fontSize : 12, fontWeight : 20 }}>{this.props.price_range}</div>
                {this.props.cuisines.map(cuisine=>{<div>{cuisine} </div>})}
            </div>
        )
    }
}

export default SearchResult;