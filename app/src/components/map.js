import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import SearchBar from './searchBar';
class Map extends Component {
    state = {
        viewport: {
            width: '100vw',
            height: '100vh',
            latitude: 40.7309,
            longitude: -73.9973,
            zoom: 14
          },
          logs : [],
          showPopup : {},
          search_name : '',
          searchedResponses : []
    };

    componentDidMount = () => {
        const url = `https://api.documenu.com/v2/restaurants/search/geo?lat=${this.state.viewport.latitude}&lon=${this.state.viewport.longitude}&distance=5&fullmenu`;
        fetch(url, {
            headers : { 
                'X-API-KEY': '9ea85917729faab77a5052ddd39fb679'
            }
        })
          .then(response => response.json())
          .then(logs => {
                this.setState({
                    logs : logs.data
                }, ()=> console.log(this.state.logs))
              });
    }

    render(){
        return(
            <div style = {{display : 'flex', flexDirection : 'row'}}>
                <div style = {{display : "flex", flex : 1, height : '100%', width : '30%', paddingTop : 10, justifyContent : 'center'}}><SearchBar/></div>
                <ReactMapGL
                scrollZoom = {true}
                {...this.state.viewport}
                mapboxApiAccessToken = "pk.eyJ1IjoiaXNoYW5nb2duYSIsImEiOiJjano4NHc2Z3cwMGZqM2Ruazlmdm14Mm9rIn0.W1PryFGxgSy4ftdgYTQ6iw"
                onViewportChange={Viewport => this.setState(Viewport)}  
            >
                {this.state.logs.map(log=>(
                    <div onClick = {()=>{this.setState({
                        showPopup : {[log.restaurant_id] : true}
                    })}}>
                        <Marker latitude={log.geo.lat} longitude={log.geo.lon} offsetLeft={-20} offsetTop={-10}>
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                width={this.state.viewport.zoom}
                                height={this.state.viewport.zoom}  
                                viewBox="0 0 24 24" 
                                fill="red" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="feather feather-map-pin"
                                >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                        </Marker>  
                        { this.state.showPopup[log.restaurant_id] ? (
                        <Popup
                            latitude={log.geo.lat} 
                            longitude={log.geo.lon}
                            closeButton={true}
                            closeOnClick={true}
                            onClose={() => this.setState({showPopup: false})}
                            anchor="top" >
                            <div>
                                <h2>{log.restaurant_name}</h2>
                                <h3>{`${log.address.formatted}`}</h3>
                                <h4>{log.restaurant_phone}</h4>
                                <h4>{log.cuisines.map(cuisine=>`${cuisine} `)}</h4>
                                <h5>{log.price_range}</h5>
                            </div>
                        </Popup>
                    ) : null} 
                    </div> 
                ))}               
                {this.state.searchedResponses.map(searchedResponse => {
                    <Marker latitude={searchedResponse.geo.lat} longitude={searchedResponse.geo.lon} offsetLeft={-20} offsetTop={-10}>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width={this.state.viewport.zoom}
                        height={this.state.viewport.zoom}  
                        viewBox="0 0 24 24" 
                        fill="blue" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="feather feather-map-pin"
                        >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                </Marker>  
                })}
                
            </ReactMapGL>
          </div>

        )
    }
    
}

export default Map;