import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import { Wheel } from 'react-custom-roulette'
import Spinner from '../Spinner/Spinner.js';
import './Roulette.css';

class Roulette extends Component {
    state = { query: '', 
    brewery: [],
    spinny:false
}

    componentDidMount(){
        this.fetchData();
      }

    // searchOrderParam = new URLSearchParams();

    fetchData = async () => {
        let url = 'http://localhost:7890/api/allbreweryinfo';

        // const userQuery = this.searchOrderParam.get('search')
        const userQuery = this.state.query;
        const fullUrl = url + `?search=${userQuery}`;
        let response = await fetch(fullUrl, {
            method:'GET',
            headers:{
                'Authorization': this.props.token,
            }
        });
        let data = await response.json()
        return data;
    }

    // handleSearch = async (e) => {
    //     e.preventDefault();
    //     const data = await this.fetchData();
    //     const oneData = Math.floor(Math.random() * data.length)
    //     console.log(oneData);
    //     this.setState({ brewery: data[oneData]})
    //     // console.log("search", this.state.brewery)
    // }
    

    handleQueryUpdate = async (event) => {
        await this.setState({ query: event.target.value });
    }

    // handleParentSt = (item) =>{
    //     this.props.stateHandler(item)
    // }

    handleSpinClick = async (e) => {
        e.preventDefault();
        console.log(this.props);
        const data = await this.fetchData();
        const newPrizeNumber = Math.floor(Math.random() * data.length)
        await this.setState({ brewery: data[newPrizeNumber], spinny: true})
        await this.setState({spinny:false})
        this.props.stateHandler(this.state.brewery)
      } 

    render() { 

        return ( 
            <section className="container">
            
            <h1>Let's play Brewlette!</h1>

            <form>
                <input placeholder="city, state" type="text" onChange={this.handleQueryUpdate}></input>
                {/* <button onClick={this.handleSearch}>Search</button> */}
            </form>

                <div className="roulette-wheel">
                    <Spinner 
                        brewData={this.state.brewery}
                        handleSpin={this.handleSpinClick}
                        realSpinny = {this.state.spinny}
                    />
                </div>
                
                <div className="brewery-box">
                    <NavLink to={'/detail'}>
                        <h3>{this.state.brewery.brewery_name}</h3>
                        <p>{this.state.brewery.url}</p> 
                        <p>{this.state.brewery.address} {this.state.brewery.city} {this.state.brewery.state}</p> 
                        <p>{this.state.brewery.reviewlink}</p>
    
                    </NavLink>
                </div>
               
            
            </section>
         );
    }
}
 
export default Roulette;
