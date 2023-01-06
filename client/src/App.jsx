import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MyModal from './Modal3'

import './App.css'

const App = () => {
  const [item, setItem] = useState({})
  const [show, setShow] = useState(false)

  const onItemClick = (item) => {
    setShow(true)
    setItem(item)
  }

  const cleanUpItem = () => {
    setShow(false)
    setItem({})
  }

  // Dark Theme
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  const styles = {
    light: {
      backgroundColor: 'white',
      color: 'black',
    },
    dark: {
      backgroundColor: 'black',
      color: 'white',
    },
  }

  const [items, setItems] = useState([])

  const fetchTask = () => {
    axios
      .get('http://localhost:5000')
      .then((response) => {
        setItems(response.data)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  useEffect(() => {
    fetchTask()
  }, [])

  // Update
  const onSave = (updatedTask) => {
    setItems(
      items.map((task) => {
        if (task._id === updatedTask._id) {
          return updatedTask
        }
        return task
      })
    )
  }

  return (
    <div className='App' style={styles[theme]}>
      <h1 onClick={toggleTheme}>
        <span style={{ color: 'green' }}>Trello</span> Like Board
      </h1>

      <MyModal
        show={show}
        setShow={setShow}
        item={item}
        cleanUpItem={cleanUpItem}
        handleClose={() => setShow(false)}
        onSave={onSave}
        fetchTask={fetchTask}
      />
      <div className='Row'>
        <div className='Column col-lg-4'>
          <h2>To Do</h2>
          <ul>
            {items
              .filter((item) => item.status === 'To do')
              .map((item) => (
                <li
                  className='card'
                  key={item._id}
                  onClick={() => onItemClick(item)}
                >
                  {item.title}- {item.status}
                </li>
              ))}
          </ul>
        </div>
        <div className='Column col-lg-4'>
          <h2>In Progress</h2>
          <ul>
            {items
              .filter((task) => task.status === 'In Progress')
              .map((item) => (
                <li
                  className='card'
                  key={item._id}
                  onClick={() => onItemClick(item)}
                >
                  {item.title}- {item.status}
                </li>
              ))}
          </ul>
        </div>
        <div className='Column col-lg-4'>
          <h2>Done</h2>
          <ul>
            {items
              .filter((task) => task.status === 'Done')
              .map((item) => (
                <li
                  className='card'
                  key={item._id}
                  onClick={() => onItemClick(item)}
                >
                  {item.title}- {item.status}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
