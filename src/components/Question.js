import {FaTimes, FaPlus} from 'react-icons/fa' 
import { Link } from 'react-router-dom'

export const Question = ({question, onDelete, onToggle}) => {
    return (        
        <div className = {`question ${question.current ? 'current': ''}`} onDoubleClick={() => onToggle(question.id)}>
            <h3>{question.text} {question.id > 0 
            ? (<FaTimes style={{color:'red', cursor:'pointer'}} onClick={() => onDelete(question.id)}/>)
            : (<Link to="/newquestion"><FaPlus style={{color:'green', cursor:'pointer'}} /></Link>)}  </h3>
            <p>{question.summary}</p>
        </div>
        
    )
}

export default Question

