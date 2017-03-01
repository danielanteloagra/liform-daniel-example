import React from 'react'
import Liform, { DefaultTheme, renderField, setError } from 'liform-react'
import classNames from 'classnames'
import { Field } from 'redux-form'
import { translate } from 'react-i18next'
import localize from 'ajv-i18n'
import Ajv from 'ajv'

const emailStartsWithA = (t, value) => {
    return value && !/^a/i.test(value) ?  t('Invalid-email') : undefined
}

const CustomEmail = field => {
    const className = classNames([
        'form-group',
        { 'has-error' : field.meta.touched && field.meta.error }
    ])
    const { t } = field.context
    return (
        <div style={{ 'backgroundColor': '#eee', 'padding': '1em' }} className={className}>
            <label className="control-label" htmlFor={field.id}>🦄 {t(field.label)} 🦄</label>
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
            validate={emailStartsWithA.bind(this, props.context.t)}
            type={props.type}
            context={props.context}
        />
    )
}

const myTheme = { ...DefaultTheme, 'custom-email': CustomEmailWidget }

const BaseForm = props => {
    const { schema, handleSubmit, theme, error, submitting, context } = props
    const { t } = context
    return (
        <form style={{ border: '1px dashed #888', padding: '1em' }} onSubmit={handleSubmit}>
            {renderField(schema, null, theme || DefaultTheme, '', context)}
            <div>
                {error && <strong>{error}</strong>}
            </div>
            <button className="btn btn-primary btn-lg btn-warning" type="submit" disabled={submitting}>{ t('Submit') }</button>
            <button className="pull-right btn btn-primary btn-lg btn-danger" type="button" disabled={submitting} onClick={props.reset}>{ t('Reset') }</button>
        </form>)
}

// I18n in validation with ajv
// We pass our own validator, copying from https://github.com/Limenius/liform-react/blob/master/src/buildSyncValidation.js
const buildSyncValidation = schema => {
    const ajv = new Ajv({ errorDataPath: 'property', allErrors: true })
    return values => {
        let errors = {}
        const valid = ajv.validate(schema, values)
        if (valid) {
            return {}
        }
        const ajvErrors = ajv.errors
        localize.es(ajvErrors)

        ajvErrors.forEach((error) => {
            setError(errors, error)
        })
        return errors
    }
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


const Example = (props) => {
    return (
    <Liform schema={schema}
        onSubmit={props.onSubmit}
        theme={myTheme}
        baseForm={BaseForm}
        context={{ t: props.t }}
        syncValidation={ buildSyncValidation(schema) }
    />)
}


export default translate(['defaultNamespace'])(Example)
