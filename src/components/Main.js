import QRCode from "react-qr-code";
import {useState, useEffect} from "react";

//

const Main = ({publicsessionid, description: initialDescription, onPollDescriptionChange}) => {
    const [pollDescription, setPollDescription] = useState('');
    
     useEffect(() => {
        if(initialDescription)
        {
            setPollDescription(initialDescription);
        }
    }, [initialDescription]);

    const updateDescription = (value) => {
        onPollDescriptionChange('usersession', {'description': value} );
    }

    const defaultDescription = initialDescription;

    const joinLink = `${window.location}join/${publicsessionid}`;

    console.log(defaultDescription);
    return (
        <div className='main'>        
            <div className='form-control'>
                <label><h4>Description</h4></label>
                <input type='text' value={pollDescription} placeholder='Please describe it here' onChange={(e) => setPollDescription(e.currentTarget.value)} onBlur={(e) => updateDescription(e.currentTarget.value)} />
            </div>

            <div className='joinLinks'>
            <div className='item'><h4>Please scan the QR code or type the URL in a web browser.</h4></div>
            <div className='item'><QRCode value={joinLink} /></div>
            <div className='item'><a href={joinLink} target='_blank' rel="noreferrer" >{joinLink}</a></div>
            </div>
        </div>
    )
}

export default Main
