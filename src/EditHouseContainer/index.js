import React, { Component } from 'react';

import Nav from '../Nav';
import EditHouseComponent from '../EditHouseComponent';
import './EditHouse.css';


class EditHouseContainer extends Component {
  constructor(){
    super()

    this.state = {
      house: '',
    }
  }

  componentDidMount(){
    this.getHouse()
  };

//get one house
  getHouse = async() => {
    const houseId = window.location.pathname.split('/')[1];
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/house/${houseId}`, {
        credentials: 'include',
      });

      if(!response.ok){
        throw Error(response.statusText)
      }

      const houseParsed = await response.json();
      console.log('what is houseParsed =====>', houseParsed);

      this.setState({
        house: houseParsed.data
      })

      }catch(err){
      return err
    }
  };


  handleEditFormInput = (e) => {
    this.setState({
      house: {
        ...this.state.house,
        [e.target.name]:  e.target.value
      }
    })
  }

//edit house info
  updateHouse = async (e) => {
    e.preventDefault();
    const houseId = window.location.pathname.split('/')[1];
    console.log('ediiiijkdlafjdskfj===>', houseId);
    try{
        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/house/${houseId}`, {
          method: 'PUT',
          credentials: 'include',
          body: JSON.stringify(this.state.house),
          headers: {
            'Content-Type' : 'application/json'
          }
        });

        if(!response.ok){
          throw Error(response.statusText)
        }




        let userId = localStorage.getItem('userId');
        let username = localStorage.getItem('username')

        if(userId === '5d7e9d844eb54d001728cf31') {
        // if(username === 'admin') {
            this.props.history.push('/adminHome')
        }else {
            this.props.history.push('/home');
        }


      } catch(err) {
        return err
      }
    }

  render(){

    return(
      <div>
        <Nav />
        <EditHouseComponent gethouse={this.gethouse} handleEditFormInput={this.handleEditFormInput} house={this.state.house} updateHouse={this.updateHouse} />
      </div>
    )
  }
}
export default EditHouseContainer
