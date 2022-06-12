import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Nav from "./components/Home/Nav/Nav";
import LandingPage from "./components/Landing page/LandingPage";
import DragDrop from "./components/Home/Drag-drop/Drag-drop"
import Dropzone from "./components/Home/Edit/Dropzone";

function App() {
  return (
    <div>
      <Route path="/home" component={Nav} />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/dragdrop" component={DragDrop} />
      <Route exact path="/home/image-edit" component={Dropzone} />
    </div>
  );
}

export default App;
