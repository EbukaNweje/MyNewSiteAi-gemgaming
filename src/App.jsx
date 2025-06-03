import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Element } from './routes/Router'
import Loader from './components/Loader'


const App = () => {
  return (
        <RouterProvider router={Element} fallbackElement={Loader} />
)
}

export default App