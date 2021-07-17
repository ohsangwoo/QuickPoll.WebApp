import Question from './Question'

const Questions = ({questions, onDelete, onToggle}) => {


    return (
        <div className='questionList'>
          {
           questions && questions.length > 0 && questions.map((question) => (
              <Question key={question.id} question={question} onDelete={onDelete} onToggle={onToggle} />
          ))} 
          <Question key={0} question={{id: 0, text: 'Create a new question', current: false}} />
        </div>
    )
}

export default Questions