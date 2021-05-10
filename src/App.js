import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/LOGO/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'; 
import Rank from './components/Rank/Rank'; 
import './App.css';



const particleOptions={
	particles: {
		number:{
			value: 80,
			density:{
				enable:true,
				value_area:800	
			}
		}
			
	}
}



const initialState={
    input:'',
    imageUrl:'',
    box:{},
    route: 'Signin',
    user:{
      id:'',
      name:'',
      email:'',
      entries:0,
      joined: ''
    }
}

class App extends Component {
  constructor(){
  	super();
  	this.state = initialState;
  }



  loadUser=(data)=>{
    this.setState({
      user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined: data.joined
      }
    })
  }


  facelocator=(data)=>{
    const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box; 
    const image= document.getElementById('inputimage');
    const width= Number(image.width);
    const height= Number(image.height);
    return{
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width-(clarifaiFace.right_col * width),
        bottomRow: height-(clarifaiFace.bottom_row * height) 
    }
  }




  displayFaceBox=(box)=>{
    this.setState({box:box});
  }


  onInputChange=(event)=>{
    this.setState({input: event.target.value});
  }


  onDetectButton=()=>{
    this.setState({imageUrl: this.state.input});

    if(!this.state.input) {
      window.alert('Oops! Nothing can be detected.')
    }else {
        fetch('http://localhost:3000/imageurl',{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            input: this.state.input,
          })
        })
        .then(response=> response.json())
        .then(response=>{
          if(response === 'error with API'){
            window.alert('Not a valid URL')
          }else{
            fetch('http://localhost:3000/image',{
                method:'put',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                  id: this.state.user.id,
                })
              })
              .then(response=> response.json())
              .then(count=>{
                  this.setState(Object.assign(this.state.user,{ entries:count }))
              })  
              this.displayFaceBox(this.facelocator(response))
          }
               
          })
          .catch(err=>console.log(err))     
    }        
  }




  onRouteChange=(route)=>{
   
    if(route === 'Signin'){
      this.setState(initialState); 
    }
    this.setState({route:route});
  }

  render(){
    return (
      <div className="App">
          	<Particles className='particles'
          	params={particleOptions}
          	/>
       	
        {this.state.route==='home' 
         ? <div>
            <Navigation onRouteChange={this.onRouteChange}/>
            <Logo/> 
      	    <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      	    <ImageLinkForm 
      	     onInputChange={this.onInputChange} 
      	     onDetectButton={this.onDetectButton}
      	    />
      	    <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
          :(
            this.state.route==='Signin'
            ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             )
          }
      </div>
    );
  }
}


export default App;



