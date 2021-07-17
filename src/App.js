import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Questions from './components/Questions'
import AddTask from './components/AddTask'
import About from './components/About'
import { FaSave } from 'react-icons/fa'

const apiServerUri = 'http://localhost:5000/api'

function App() {
  const [poll, setPoll] = useState([])
  //const [pollSessionId, setPollSessionId] = useState([]
  const getSessionId = () => {
    const getNewId = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    var sessionId = localStorage.getItem('SessionId');
    if(sessionId == null) 
    {
       sessionId = getNewId();
       localStorage.setItem('SessionId', sessionId);

    }

    return sessionId;
  }

  
  
  useEffect(() => {
    const getTasks = async () => {
      const sessionId = getSessionId();
    
      const tasksFromServer = await getData('');
      console.log(tasksFromServer);
      setPoll(tasksFromServer);
    }

    getTasks();
  }, []);

  const getData = async (resource) => {
    const res = await fetch(`${apiServerUri}/${getSessionId()}/${resource}`);
    const data = await res.json();

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
  const toggleReminder = async (id) => {
    console.log(id)

    const task = await fetchTask(id);

    task.reminder = !task.reminder;

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
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
        <Questions questions={poll.questions} onDelete={deleteTask} onToggle={toggleReminder} />
        <Route path='/' exact render={(props) => (
          <Main onPollDescriptionChange={postData} />

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
