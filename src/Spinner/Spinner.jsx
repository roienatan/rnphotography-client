import React from 'react';
import spinner from '../assets/spinner-black-bg.gif';

function Spinner(props){
    let leftValueStyle = '50%';
    let positionStyle = 'absolute';

    if(props.type === 'button'){
        leftValueStyle = '90%';
    }
    if(props.type === 'view'){
        positionStyle = 'fixed';
    }
    return(
        <img src={spinner} 
            style={{position: `${positionStyle}`,
                    width: '50px', 
                    height: '50px',
                    top: '50%', 
                    left: `${leftValueStyle}`,
                    transform: 'translate(-50%, -50%)'}} 
            alt='spinner' />
    )
}

export default Spinner;