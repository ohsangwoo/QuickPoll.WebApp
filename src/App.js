import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Questions from './components/Questions'
import About from './components/About'


// const apiServerUri = 'https://quickpollapi.azurewebsites.net/api'
const apiServerUri = 'https://localhost:44385/api'

function App() {
  const [poll, setPoll] = useState([])
  const [userSession, setUserSession] = useState({});
  const [userSessionId, setUserSessionId] = useState('')

  const getSessionId = async () => {


    var sessionId = localStorage.getItem('SessionId');
    
    if(typeof(sessionId) === 'undefined' || sessionId == null)  
    {
      const newUserSession = await getData('usersession/');
       setUserSession(newUserSession);
       console.log(newUserSession);
       localStorage.setItem('SessionId', newUserSession.userSessionId);
    }
    
    setUserSessionId(sessionId);
  }

  
  
  useEffect(() => {
    const getTasks = async () => {   
      // const pollData = await getData();
      // console.log(pollData);
      // setPoll(pollData);
    }

    getSessionId();

    
    const sessionData = getData(`usersession/${userSessionId}`);
    console.log(sessionData);
  }, []);

  const getData = async (resource = '') => {
    const res = await fetch(`${apiServerUri}/${resource}`);
    const data = await res.json();
    console.log(data);
    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/questions/${id}`);
    const data = await res.json();

    return data;
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/questions/${id}`, {
      method: 'DELETE'
    });

    //setTasks(questions.filter((task) => task.id !== id));
  }

  //Toggle Reminder
  const putData = async (resource, data) => {

    
    console.log(data);
 
    const res = await fetch(`${apiServerUri}/${resource}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },

    
      body: JSON.stringify({'usersessionid' : userSessionId, ...data})
    });

    //setTasks(questions.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  // Add Task
  const postData = async (resource, data) => {
    const sessionId = getSessionId();
    const res = await fetch(`${apiServerUri}/${sessionId}/${resource}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });


    //setTasks([...questions, postData]);
  }

  return (
    <Router>
      <div className="container">
        <Header />
        <Questions questions={poll.questions} onDelete={deleteTask} />
        <Route path='/' exact render={(props) => (
          <Main description={userSession.description} onPollDescriptionChange={putData} />

        )} />
        
        {/* <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {questions.length > 0
              ?
              : 'No Tasks To Show'
            }
          </>
        )} /> */}
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}


export default App;
