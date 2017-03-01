import React from 'react'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { Provider } from 'react-redux'
import Example1 from './Example1'
import Example2 from './Example2'
import Example3 from './Example3'
import Example4 from './Example4'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n';


const onSubmit = (values) => { window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`) }

const App = () => {
    const reducer = combineReducers({ form: formReducer })
    const store = createStore(reducer)
    return (
        <Provider store={store}>
            <div>
                <h1>A Liform example</h1>
                <h2>Out of the box</h2>
                <p>
                    Out of the box just specifying stuff in the schema. This validates the email (because we have a "format" option that the library ajv can use to validate). As the schema uses the "required" option, it is also required.
                </p>
                <Example1 onSubmit={onSubmit}/>
                <h2>With custom widget and field-level validation</h2>
                <p>
                    In this example we specify a custom widget with a different background color and the label decorated with emojis of unicorns. We also specify field-level validation because we want, for instance, to accept only emails that start with the letter "a".
                </p>
                <Example2 onSubmit={onSubmit}/>
                <h2>With custom layout</h2>
                <p>
                    In this example we also specify a custom base layout with a reset button and different styles.
                </p>
                <Example3 onSubmit={onSubmit}/>
                <h2>With translations</h2>
                <p>
                    Using context for translations.
                    We can pass a context object that can contain a method for translatinf custom widgets.
                    Also, we can provide a syncValidation function, where we can use the localized version of ajv.
                </p>
                <I18nextProvider i18n={ i18n }>
                    <Example4 onSubmit={onSubmit}/>
                </I18nextProvider>
            </div>
        </Provider>
    )
}

export default App
