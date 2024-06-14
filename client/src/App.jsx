
import TextEditor from "./TextEditor"

import {v4 as uuidV4} from "uuid"
import {BrowserRouter as Router , Route , Routes,Navigate } from "react-router-dom"

function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" exact element={<Navigate to={`/document/${uuidV4()}`} />}>
          
        </Route>

        <Route path="/document/:id" element={<TextEditor />}>
        
        </Route>
      </Routes>
      
    </Router>
      
    </>
  )
}

export default App
