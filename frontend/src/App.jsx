import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NotePage from "./pages/NotePage"

function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />}/>
        <Route path="/create" element={<CreatePage />}/>
        <Route path="/note/:id" element={<NotePage />}/>
      </Routes>
    </>
  )
}

export default App