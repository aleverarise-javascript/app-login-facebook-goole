import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import './index.css';
import 'materialize-css/dist/css/materialize.min.css';

class Login extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isLogged: false,
        }

        this.responseFacebook = this.responseFacebook.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.onFailure = this.onFailure.bind(this);
    }

    componentWillMount() {
		if(localStorage.getItem('facebookData') || localStorage.getItem('googleData') ){
			this.setState( {isLogged: true} )
		}
	}

    responseFacebook(response){
        localStorage.setItem("facebookData", JSON.stringify({
            token: response.token,
            email: response.email,
            name: response.name,
            picture: response.picture.data.url,
            social: 'facebook',
        }));

        this.setState( {isLogged: true } );

    }

    responseGoogle(response){
        localStorage.setItem('googleData', JSON.stringify({
            token: response.token,
            email: response.profileObj.email,
            name: response.profileObj.name,
            picture: response.profileObj.imageUrl,
            social: 'google',
        }));
        this.setState( {isLogged: true } );
    }

    onFailure(error){
        console.log(error);
    }
    
    render() {

        if(this.state.isLogged){
            return (<Redirect to="/home" />)
        }

        return (
            <div className="Login" >
                <div className="Login-box" >
                    <div className="card" >
                        <div className="card-content" >
                            <FacebookLogin 
                                appId="APP_ID_FACEBOOK"
                                autoLoad={ false }
                                fields="name, email, picture.width(120)"
                                callback={ this.responseFacebook }
                                onFailure={ this.onFailure }
                                textButton="Facebook"
                                cssClass="waves-effect waves-light btn blue darken-2"
                                icon="fa fa-facebook"
                            />
                            <br />
                            <GoogleLogin
                                clientId="770794522462-i481no6asonhdumje5k256vtnfm2po84.apps.googleusercontent.com"
                                autoLoad={ false }
                                onSuccess={ this.responseGoogle }
                                onFailure={ this.onFailure }
                                className="waves-effect waves-light btn red lighten-1"
                            >
                                <i className="fa fa-google" aria-hidden="true"></i> 
                                <span>Google</span>
                            </GoogleLogin>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {

};

export default Login;