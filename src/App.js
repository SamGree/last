import './App.css';
import NavBar from "./components/Navbar";

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