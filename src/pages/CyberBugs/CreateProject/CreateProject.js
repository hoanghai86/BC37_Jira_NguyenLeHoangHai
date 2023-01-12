import React from 'react'

export default function CreateProject() {
  return (
    <div className='container m-5'>
      <h3>Create Project</h3>
      <form className='container'>
        <div className='form-group'>
          <p>Name</p>
          <input className='form-control' name="projectName" />
        </div>
        <div className='form-group'>
          <p>Description</p>
          <input className='form-control' name="description" />
        </div>
        <div className='form-group'>
          <select name='categoryId' className='form-control'>
            <option>Software</option>
            <option>Web</option>
            <option>App</option>
          </select>
        </div>
        <button className="btn btn-outline-primary" type='submit'>Create Project</button>
      </form>
    </div>
  )
}
