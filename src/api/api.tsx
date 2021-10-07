import React from "react";
import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': '1d4411b3-b96b-4ab2-9d09-a99a5ed2b337'
    }
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`/users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(userId: number) {
        return instance.post(`/follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`/follow/${userId}`)
    },
    getProfile(userId: number) {
        return instance.get(`/profile/2` + userId);
    }
}

export const authAPI = {
    me() {
        return instance.get(`/auth/me`);
    }
}
