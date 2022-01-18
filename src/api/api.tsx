import React from "react";
import axios from "axios";
import {ProfileType} from "../redux/profile-reducer";
import {UsersDataType} from "../components/Users/Users";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'fb3a72fc-b182-466b-85fc-baa514f38724'
    }
})

type DataType = {
    id: number
    email: string
    login: string
}

type MeResponseType = {
    resultCode: number
    messages: Array<string>
    data: DataType
}

type GetUsersItems = {
    items: Array<UsersDataType>
    totalCount: number
    error: string | null
}

type ResponseType<D = {}> = {
    data: D
    messages: Array<string>
    resultCode: number
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersItems>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post<ResponseType<DataType>>(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType<DataType>>(`follow/${userId}`)
    },
    getProfile(userId: number | null) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/` + userId);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId);
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status: status});
    },
    savePhoto(file: File) {
        let formData = new FormData()
        formData.append('image', file)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: ProfileType | null) {
        return instance.put<ResponseType>(`profile`, profile);
    }
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: any) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
}