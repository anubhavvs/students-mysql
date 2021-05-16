import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form';
import Leaderboard from './pages/LeaderBoard';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/add' component={Form}/>
        <Route path='/leader' component={Leaderboard}/>
        <Route path='/' exact component={Home} />
      </Router>
    </div>
  );
}

export default App;
