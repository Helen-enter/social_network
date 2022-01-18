import React, {useEffect, useState} from "react";

export type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatusWithHooks = (props: ProfileStatusType) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: React.SyntheticEvent<any>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || 'No status'}</span>
            </div>}
            {editMode &&
            <div>
                <input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={status}/>
            </div>}
        </>
    )
}
