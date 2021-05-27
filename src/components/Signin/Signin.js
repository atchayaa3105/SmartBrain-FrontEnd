import React from 'react';
import 'tachyons';

class Signin extends React.Component {
  constructor(props){
    super(props);
    this.state={
      signInEmail:'',
      signInPassword:''
    }
  }

  onEmailChange =(event)=>{
    this.setState({signInEmail:event.target.value})
  }

  onPasswordChange =(event)=>{
    this.setState({signInPassword:event.target.value})
  }

 onSubmitSignIn =()=>{
  if(!this.state.signInEmail || !this.state.signInPassword){
    window.alert('Sorry! The required fields cannot be empty.')
  }else{
        fetch('http://damp-journey-51447.herokuapp.com/signin', {
        method:'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword
        })
        })
        .then(response=> response.json())  
        .then(user =>{
           if(user.id) {
              this.props.loadUser(user);
              this.props.onRouteChange('home');
              window.alert('Hello! You have logged in successfully.Welcome back!!!')
            }else{
            window.alert('Sorry!! Wrong email_id or password!!!')
            }
        });
      }
  }

  render(){
      const {onRouteChange} =this.props;
      return(
      <div><h2><legend className="f1 fw6 ph5 mh0">FACE DETECTOR</legend></h2>
      <article className="br4 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
        <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email-address"  
                id="email-address"
                onChange={this.onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password"  
                id="password"
                onChange={this.onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input 
            onClick={this.onSubmitSignIn}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
            type="submit" 
            value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p onClick={()=>onRouteChange('Register')} className="b f5 pointer link dim black db">Register</p>
          </div>
        </div>
        </main>
      </article>
      </div>
      );
  }
 
}

export default Signin;



