import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import axios from 'axios'

function Modal3({
  item,
  handleClose,
  show,
  setShow,
  onSave,
  fetchTask,
  cleanUpItem,
}) {
  const [data, setData] = useState({
    title: '',
    description: '',
    status: '',
    user: '',
  })

  const handleShow = () => {
    setShow(true)
    setData({
      title: '',
      description: '',
      status: '',
      user: '',
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    if (!Object.keys(item).length) {
      axios
        .post('http://localhost:3000/', data)
        .then((response) => {
          setData(Object.assign({}, data, response.data))
          fetchTask()
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      axios
        .put(`http://localhost:3000/${item._id}`, data)
        .then((response) => {
          onSave(response.data)
          fetchTask()
        })
        .catch((error) => {
          console.log(error)
        })
    }
    // Close modal
    cleanUpItem()
  }

  // Sets
  useEffect(() => {
    if (Object.keys(item).length) {
      setData({
        title: item.title,
        description: item.description,
        status: item.status,
        user: item.user,
      })
    }
  }, [item])

  return (
    <>
      <Button variant='success' onClick={handleShow}>
        Add Task
      </Button>

      <Modal show={show} onHide={handleClose} backdrop={false}>
        <Modal.Header>
          <Modal.Title className='d-flex justify-content-between w-100'>
            <span>Task</span>
            <Button onClick={cleanUpItem} variant='danger'>
              X
            </Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <h5>Title</h5>
              <input
                className='form-control'
                id='title'
                name='title'
                placeholder='Enter a title...'
                required
                type='text'
                value={data.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <h5>Description</h5>
              <input
                className='form-control'
                id='message-text'
                name='description'
                placeholder='Enter a description...'
                type='text'
                value={data.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <h5>Status</h5>
              <select
                className='form-control'
                value={data.status}
                onChange={handleChange}
                name='status'
              >
                <option value='To do'>To do</option>
                <option value='In Progress'>In Progress</option>
                <option value='Done'>Done</option>
              </select>
            </div>
            <div>
              <h5>User</h5>
              <select
                className='form-control'
                name='user'
                value={data.user}
                onChange={handleChange}
              >
                <option value='Unassigned'>Unassigned</option>
                <option value='item1'>User 1</option>
                <option value='item2'>User 2</option>
                <option value='item3'>User 3</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default Modal3
