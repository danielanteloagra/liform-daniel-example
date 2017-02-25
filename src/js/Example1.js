import React from 'react'
import Liform from 'liform-react'

const schema={
    'properties': {
        'email': {
            'title':'E-mail',
            'type':'string',
            'widget':'email',
            'format':'email'
        }
    },
    'required':[ 'email' ]
}

const Example = (props) => (
    <Liform schema={schema}
        onSubmit={props.onSubmit}
    />
)

export default Example
