import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import ContextProvider from "./context/Context";
{/* <meta name="monetag" content="97933881f72a4eaea0f62e6e4bbbf108"></meta> */}

createRoot(document.getElementById("root")).render(

  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>
);
