import React from "react";
import s from './FormsControls.module.css'
import { WrappedFieldMetaProps} from "redux-form/lib/Field";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

export const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error

    return (
        <div className={hasError ? s.error : ''}>
            <div>
                {children}
            </div>
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>
    )
}

export const Textarea: React.FC<any> = (props) => {
    const {input, meta, child, ...restProps} = props
    return (
        <FormControl {...props}> <textarea {...input} {...restProps}/></FormControl>
    )
}


export const Input = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return (
        <FormControl {...props}> <input {...input} {...restProps}/></FormControl>
    )
}
