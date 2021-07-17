import {FaTimes, FaPlus} from 'react-icons/fa' 

export const Question = ({question, onDelete, onToggle}) => {
    return (        
        <div className = {`question ${question.current ? 'current': ''}`} onDoubleClick={() => onToggle(question.id)}>
            <h3>{question.text} {question.id > 0 
            ? (<FaTimes style={{color:'red', cursor:'pointer'}} onClick={() => onDelete(question.id)}/>)
            : (<FaPlus style={{color:'green', cursor:'pointer'}}/>)}  </h3>
            <p>{question.summary}</p>
        </div>
        
    )
}

export default Question

