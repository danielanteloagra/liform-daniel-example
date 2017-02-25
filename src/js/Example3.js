import React from 'react'
import Liform, { DefaultTheme, renderField } from 'liform-react'
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

const BaseForm = props => {
    const { schema, handleSubmit, theme, error, submitting } = props
    return (
        <form style={{ border: '1px dashed #888', padding: '1em' }} onSubmit={handleSubmit}>
            {renderField(schema, null, theme || DefaultTheme)}
            <div>
                {error && <strong>{error}</strong>}
            </div>
            <button className="btn btn-primary btn-lg btn-warning" type="submit" disabled={submitting}>Submit</button>
            <button className="pull-right btn btn-primary btn-lg btn-danger" type="button" disabled={submitting} onClick={props.reset}> Reset </button>
        </form>)
}


const schema={
    'title': 'third-example',
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
        baseForm={BaseForm}
    />
)

export default Example
