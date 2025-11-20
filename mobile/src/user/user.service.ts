import User from "@/src/user/user.model";
import api from "@/src/root/api";

type EntityResponseType = User;
type EntityArrayResponseType = User[];

export default class UserService {

    async create(user: User): Promise<EntityResponseType> {
        return api.post(`/users`, user)
            .then(res => res.data);
    }

    async findAll(): Promise<EntityArrayResponseType> {
        return api.get(`/users`)
            .then(res => res.data);
    }

    async finById(id: number): Promise<EntityResponseType> {
        return api.get(`/users/${id}`)
            .then(res => res.data);
    }

    async updateUser(user: User): Promise<EntityResponseType> {
        return api.put(`/users`, user)
            .then(res => res.data);
    }

    async delete(id: number): Promise<EntityResponseType> {
        return api.delete(`/users/${id}`)
            .then(res => res.data);
    }

    async resetPasswordRequest(email: string, url: string): Promise<boolean> {
        const params = {
            email: email,
            url: url
        }
        return api.post(`/users/request-reset-password`, params)
            .then(res => res.data);
    }

    async resetPassword(newPassword: string, resetKey: string): Promise<boolean> {
        const params = {
            newPassword: newPassword,
            resetKey: resetKey
        }
        return api.post(`/users/reset-password`, params)
            .then(res => res.data);
    }

    async getCurrentUser(): Promise<EntityResponseType> {
        return api.get(`/users/me`)
            .then(res => res.data)
    }
}