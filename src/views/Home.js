import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './index.css';

class Home extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			ProfileImage: '',
			fullName: '',
			isLogout: false
		}
		
		this.onLogout = this.onLogout.bind(this);
	}

	componentDidMount() {
		let googleData = JSON.parse(localStorage.getItem('googleData'));
		let facebookData = JSON.parse(localStorage.getItem('facebookData'));

		if(!googleData && !googleData){
			this.setState( {isLogout: true } );
		}	

		if(facebookData){
			this.setState({ ProfileImage: facebookData.picture, fullName: facebookData.name });
		}else if(googleData){
			this.setState({ ProfileImage: googleData.picture, fullName: googleData.name });
		}
	}

	onLogout(){
		localStorage.clear();
		this.setState( {isLogout: true } );
	}
	
	render(){
		if(this.state.isLogout){
            return (<Redirect to="/" />)
        }
		return(
			<div className="Home" >
				 <nav>
					<div className="nav-wrapper">
						<a href="#" className="brand-logo">Logo</a>
						<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li><a href="">{ this.state.fullName }</a></li>
							<li><img className="circle Home-avatar" src={ this.state.ProfileImage } /></li>
							<li><i onClick={ this.onLogout } className="Home-logout fa fa-power-off" ></i></li>
						</ul>
						
					</div>
				</nav>
			</div>
		);
	}
}

export default Home;
