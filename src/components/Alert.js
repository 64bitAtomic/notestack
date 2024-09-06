import React from 'react'

export const Alert = (props) => {
    return (
        <div>
            <div className="alert alert-dark" role="alert">
            <strong>{props.message}</strong>
            </div>
        </div>
    )
}
