import React from 'react'
import Liform, { DefaultTheme } from 'liform-react'
import classNames from 'classnames'
import { Field } from 'redux-form'

const emailStartsWithA = value =>
    value && !/^a/i.test(value) ?
        'Invalid email address (in this example it must start with the letter "a")' : undefined

const CustomEmail = field => {
    const className = classNames([
        'form-group',
        { 'has-error' : field.meta.touched && field.meta.error }
    ])
    return (
        <div style={{ 'backgroundColor': '#eee', 'padding': '1em' }} className={className}>
            <label className="control-label" htmlFor={field.id}>🦄 {field.label} 🦄</label>
            <input {...field.input} className="form-control" type="email"/>
            {field.meta.touched && field.meta.error && <span className="help-block">{field.meta.error}</span>}
            {field.description && <span>{field.description}</span>}
        </div>
    )
}

const CustomEmailWidget = (props) => {
    // You can remove stuff from here like placeholder or description if you don't need it
    return (
        <Field
            component={CustomEmail}
            label={props.label}
            name={props.fieldName}
            required={props.required}
            id={'field-'+props.fieldName}
            placeholder={props.schema.default}
            description={props.schema.description}
            validate={emailStartsWithA}
            type={props.type}
        />
    )
}

const myTheme = { ...DefaultTheme, 'custom-email': CustomEmailWidget }

const schema={
    'title': 'second-example',
    'properties': {
        'email': {
            'title':'E-mail',
            'type':'string',
            'widget':'custom-email',
            'format':'email'
        }
    },
    'required':[ 'email' ]
}

const Example = (props) => (
    <Liform schema={schema}
        onSubmit={props.onSubmit}
        theme={myTheme}
    />
)

export default Example
