import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployess } from '../services/EmployeeServices'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)

    const navigator = useNavigate()

    useEffect(() => {
        getAllEmployees()
    }, [])

    function getAllEmployees() {
        setLoading(true)

        listEmployess()
            .then((response) => {
                setEmployees(response.data)
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function addNewEmployee() {
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id) {
        deleteEmployee(id)
            .then(() => {
                getAllEmployees()
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className='container py-4'>

            {/* Header */}
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <div>
                    <h2 className='fw-bold mb-0'>Employees</h2>
                    <small className='text-muted'>Manage all employees in your system</small>
                </div>

                <button
                    className='btn btn-primary px-4'
                    onClick={addNewEmployee}
                >
                    + Add Employee
                </button>
            </div>

            {/* Loading state */}
            {loading && (
                <div className='text-center py-5'>
                    <div className='spinner-border text-primary' role='status'></div>
                    <p className='mt-2 text-muted'>Loading employees...</p>
                </div>
            )}

            {/* Empty state */}
            {!loading && employees.length === 0 && (
                <div className='text-center py-5 border rounded bg-light'>
                    <h5>No Employees Found</h5>
                    <p className='text-muted'>Start by adding a new employee</p>
                    <button className='btn btn-primary mt-2' onClick={addNewEmployee}>
                        Add Employee
                    </button>
                </div>
            )}

            {/* Table */}
            {!loading && employees.length > 0 && (
                <div className='card shadow-sm border-0'>
                    <div className='card-body p-0'>

                        <div className='table-responsive'>
                            <table className='table table-hover align-middle mb-0'>
                                <thead className='table-dark'>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th className='text-center'>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {employees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.email}</td>

                                            <td className='text-center'>
                                                <div className='btn-group'>

                                                    <button
                                                        className='btn btn-sm btn-outline-info'
                                                        onClick={() => updateEmployee(employee.id)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className='btn btn-sm btn-outline-danger'
                                                        onClick={() => removeEmployee(employee.id)}
                                                    >
                                                        Delete
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}

export default ListEmployeeComponent