import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask";
import { GlobalProvider } from "./contexts/GlobalContext";

function App() {


  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route index Component={TaskList} />
            <Route path="/add-task" Component={AddTask} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
