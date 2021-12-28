import React, {FormEvent} from "react";
import {reduxForm} from "redux-form";
import {Field} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import s from '../../common/FormsControls/FormsControls.module.css'

type LoginFormPropsType = {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
    error: string
}

export const LoginForm = (props: LoginFormPropsType) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field validate={[requiredField]} placeholder={'email'} name={'email'} component={Input}/></div>
            <div><Field validate={[requiredField]} placeholder={'password'} name={'password'} type={'password'}
                        component={Input}/></div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}/>remember me
            </div>
            {props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>login</button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

export type FormDataType = {
    email: string,
    password: string,
    rememberMe: boolean
}

const Login = (props: any | undefined) => {
    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)