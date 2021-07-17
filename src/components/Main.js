import QRCode from "react-qr-code";
import {useState} from "react";

const joinLink = `${window.location}join/${localStorage.getItem('SessionId')}`;

const Main = ({onPollDescriptionChange}) => {
    const [pollDescription, setPollDescription] = useState('');
    
    const postData = () => {
        console.log(pollDescription)
        
    }

    return (
        <div className='main'>        
            <div className='form-control'>
                <label><h4>Description</h4></label>
                <input type='text' value={pollDescription} placeholder='Please describe about the poll session here' onChange={(e) => setPollDescription(e.currentTarget.value)} onBlur={postData} />
            </div>

            <div className='joinLinks'>
            <div className='item'><h4>Please scan the QR code or type the URL in a web browser.</h4></div>
            <div className='item'><QRCode value={joinLink} /></div>
            <div className='item'><a href={joinLink} target='_blank'>{joinLink}</a></div>
            </div>

        </div>
    )
}

export default Main
