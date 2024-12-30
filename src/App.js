import './App.css';
import NavBar from "./components/NavBar";

function App() {
  return (
    <ThemeProvider>
      <Router>
      <NavBar />
      </Router>
    </ThemeProvider>
  );
}

export default App;