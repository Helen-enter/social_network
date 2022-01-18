import React from "react";
import {reduxForm, InjectedFormProps} from "redux-form";
import {Field} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import s from '../../common/FormsControls/FormsControls.module.css'

export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}

type LoginFormOwnProps = {
    captchaUrl: string | null
    onSubmit: any
}

export const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({
                                                                                                                       handleSubmit,
                                                                                                                       error,
                                                                                                                       captchaUrl
                                                                                                                   }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><Field validate={[requiredField]} placeholder={'email'} name={'email'} component={Input}/></div>
            <div><Field validate={[requiredField]} placeholder={'password'} name={'password'} type={'password'}
                        component={Input}/></div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}/>remember me
            </div>
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl &&
            <Field validate={[requiredField]} name={'captcha'} component={Input} placeholder={'symbols from image'}/>}
            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>login</button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

export type FormDataType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => Promise<void>
    isAuth: boolean
    captchaUrl: string | null
}

const Login = (props: FormDataType) => {
    const onSubmit = (formData: { email: string, password: string, rememberMe: boolean, captcha: string }) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/Profile'}/>
    }
    return (
        <div>
            <h1>login</h1>
            <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)
