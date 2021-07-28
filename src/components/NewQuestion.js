import { useState, useEffect } from "react";
import Dropdown from 'react-dropdown';
import PlayCards from './PlayCards'
import 'react-dropdown/style.css';


const NewQuestion = ({ onAdd }) => {

    const [question, setQuestion] = useState('');
    const [preset, setPreset] = useState({});
    const [reminder, setReminder] = useState(false);

    const presets = [
        { value: '1', label: 'Fibonacci sequence', options: ["0", "1", "2", "3", "5", "8", "13", "21" ] },
        { value: '2', label: 'Mavericks Standard', options: ["1", "2", "4", "6", "8"] }
    ];
    
    const onSubmit = (e) => {
        e.preventDefault();
        //onAdd(question, preset);
        setQuestion('');
    }

    const onPresetSelected = (e) => {
        const selectedPreset = presets.filter((p) => p.value === e.value )[0];
        console.log(selectedPreset);
        setPreset(selectedPreset);
    }

    return (
        <div className='main'>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Question</label>
                    <input type='text' placeholder='Add a question here.' value={question} onChange={(e) => setQuestion(e.currentTarget.value)} />
                </div>
                <div className='form-control'>
                    <label>Options Preset</label>
                    <Dropdown options={presets} placeholder="Select an option" onChange={onPresetSelected} />
                </div>
                {preset && preset.options && 
                    <div>
                        <h4>Preview:</h4>
                        <PlayCards options={preset.options} />
                    </div>  
                }
                
                <input className='btn btn-block' type='submit' value='Create a question' />
            </form>
            
        </div>
    )
}

export default NewQuestion
