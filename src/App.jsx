import "./App.css";
import Links from "./pages/Links";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <video autoPlay loop muted className="background-video">
        <source src="./video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Navbar /> 
      <Links />
    </>
  );
}

export default App;
