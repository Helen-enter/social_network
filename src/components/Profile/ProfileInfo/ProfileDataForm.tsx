import React from "react";
import {Field, InjectedFormProps} from "redux-form";
import {Input, Textarea} from "../../../common/FormsControls/FormsControls";
import s from "../Profile.module.css";
import {reduxForm} from "redux-form";
import {ProfileType} from "../../../redux/profile-reducer";

type PropsType = {
    profile: ProfileType
}

export const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, error, profile}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <button>save</button>
                </div>
                {error && <div className={s.formSummaryError}>
                    {error}
                </div>}
                <div>
                    <b>Full name</b>:
                    <input placeholder={'fullName'}/>
                    <Field name={'fullName'} placeholder={'fullName'} component={Input}/>
                </div>
                <div>
                    <b>Looking for a job</b>:
                    <Field name={'lookingForAJob'} type={'checkbox'}
                           component={Input}/>
                </div>
                <div>
                    <b>My professional skills</b>:
                    <Field name={'lookingForAJobDescription'} type={'password'} placeholder={'My professional skills'}
                           component={Textarea}/>
                </div>

                <div>
                    <b>About me</b>:
                    <Field placeholder={'About me'} name={'AboutMe'} type={'password'}
                           component={Textarea}/>
                </div>
                <div>
                    <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                    return <div className={s.contact}>
                        <b>{key}:</b> <Field component={Input} name={`contacts${key}`} placeholder={key}/>
                    </div>
                })}
                </div>
            </div>
        </form>
    )
}

export const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)