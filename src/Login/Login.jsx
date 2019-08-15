import React from 'react';
import './Login.scss';
import logo from '../assets/aperture.svg';
import Spinner from '../Spinner/Spinner';
import Constants from '../constants';
import history from '../history';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            pendingServer: false,
            showError: false
        }
    }

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    validateInputs = () => {
        const { username, password } = this.state;
        if (username !== '' && password !== '') {
            return true;
        }
        return false;
    }

    handleKeyPress = (e) => {
        if (e.keyCode === 13 && this.validateInputs()) {
            this.handleLogin();
        }
    }

    handleLogin = () => {
        this.setState({
            pendingServer: true,
            showError: false
        })
        fetch(Constants.LOGIN +
            '/username/' + this.state.username +
            '/password/' + this.state.password, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.status === 401) {
                    this.setState({
                        pendingServer: false,
                        showError: true
                    })
                    throw Error(res.statusText);
                }
                else if (res.status !== 200) {
                    this.setState({ pendingServer: false })
                    throw Error(res.statusText);
                }
                return res.json();
            }).then(data => {
                sessionStorage.setItem("admin", "true");
                sessionStorage.setItem("token", data.token);
                history.push('/');
            }).catch(err => {
                console.log(err);
            })
    }


    render() {
        const { username, password, pendingServer, showError } = this.state;
        let signInBtnClass = 'sign-in-btn';
        if (!this.validateInputs() || pendingServer) {
            signInBtnClass += ' disabled';
        }
        return (
            <React.Fragment>
                <div className='login-wallpaper' />
                <div className='login' onKeyDown={this.handleKeyPress}>
                    <div className='login-title'>Log in</div>
                    {showError && <div className='error-wrapper'>
                        <div className='error-icon' />
                        <div>The username or password you entered is incorrect</div>
                    </div>}
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' value={username} onChange={this.handleUsernameChange} />
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' value={password} onChange={this.handlePasswordChange} />
                    <button className={signInBtnClass} onClick={this.handleLogin}>
                        Sign In
                        {pendingServer && <Spinner type='button' />}
                    </button>
                </div>
                <div className='logo-container'>
                    <img src={logo} width='40px' height='40px' alt='logo' />
                    <div className='title'>ROIE NATAN<br /><span className='bold'>PHOTOGRAPHY</span></div>
                </div>
            </React.Fragment>

        )
    }
}

export default Login;