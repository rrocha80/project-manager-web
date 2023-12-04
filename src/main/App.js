import React from 'react'
import Navbar from '../Components/navbar'
import Rotas from './rotas'

import 'bootswatch/dist/flatly/bootstrap.css'

//import 'bootstrap/dist/css/bootstrap.min.css'
import '../custom.min.css'

class App extends React.Component {
  render() {
    return(
      <>
      <Navbar/>
      <div>
        <Rotas />
      </div>
      </>
    )
  }


}

export default App
