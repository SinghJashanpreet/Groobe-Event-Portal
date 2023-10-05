import logo from './logo.svg';
import './App.css';
import Homeheader from './components/Header';
import Footer from './components/Footer';
import Society from './components/pages/Society';

function App() {
  return (
    <div className="App">
      <Homeheader/>
      <Society/>
      <Footer/>
    </div>
  );
}

export default App;
