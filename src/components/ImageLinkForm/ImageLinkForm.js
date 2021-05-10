import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange,onDetectButton}) =>{
 return(
 	<div>
    	<p className='f3'>
    		{'This Magic brain will detect the face in the picture. Just drop a link & have fun!!'}
    	</p>
    	<div className='center'>
    		<div className='form center pa4 shadow-5 br3'>
    			<input className='f4 pa2 w-70 center' type='url' onChange={onInputChange}/>
    			<button 
    				className='w-30 grow f4 link ph3 pv2 dib white bg-light-pink'
    				onClick={onDetectButton}>
    				Detect
                </button>
 			</div>
 		</div>
 	</div>
  );
}


export default ImageLinkForm;
