import "./App.scss";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="App__Container">
        <Link className="App__Link" to={`table`}>Table</Link>
        <Link className="App__Link" to={`table`}>Table</Link>
        <Link className="App__Link" to={`table`}>Table</Link>
        <Link className="App__Link" to={`table`}>Table</Link>
      </div>
    </div>
  );
}

export default App;
