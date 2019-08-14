import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';



class Nav extends Component{
  constructor(){
    super()
    this.state = {
      userinfo: {
        email:'',
        password: '',
        username:'',
        name: '',
      },
    }
  }


  getUserInfo = async() => {
      const userId = localStorage.getItem('userId');
      console.log(userId);
      try{
        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/` + userId, {
          credentials: 'include'
        })

        if(!response.ok){
          throw Error(response.statusText)
        }


        const parsedResponse = await response.json();

        this.setState({
          userinfo: parsedResponse.data
        })

      }catch(err){
        console.log('getuserinfo func fail', err);
      }
  }

  logout = async() => {
    console.log('here?');
    const userId = localStorage.getItem('userId')
    console.log('userId?', userId);
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/logout`, {
        credentials: 'include'
      });
      console.log('response', response);
      console.log('true?', !response.ok);
      if(!response.ok){
        throw Error(response.statusText)
      }

      const responseParsed = await response.json();
      console.log('responseParsed', responseParsed);

      if(response.status === 200){
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        this.props.history.push('/login')
      }

    }catch(err){
      console.log('logout fail', err);
    }
  }

  render(){
    return(
      <div>
        <div className="mt-5 mb-3 ml-5 container">
          <div className="row">
            <div className="col-4 offset-4 text-center">
              <div className="">
                <Link to="/home">
                  <img src="Logo_ElectriCasa-05.png" className="logo"/>
                </Link>
              </div>
              <div className="">
                ElectriCasa
              </div>
            </div>
          </div>
        </div>
        <ul className="nav justify-content-end pr-5 py-1">
          <li className="nav-item ml-5">
            <Link to="/myaccount"><div className="navItem">My Account</div></Link>
          </li>
          <li className="nav-item ml-5">
            <input type="submit" value="Logout" className="logout" onClick={this.logout} />
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(Nav)
