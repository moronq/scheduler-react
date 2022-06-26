import axios, { AxiosResponse } from 'axios'
import { UserType } from '../types/UserType'

export const usersAPI = {
  getUsers: async () => {
    return axios
      .get<Array<UserType>>('users.json')
      .then((response: AxiosResponse<Array<UserType>>) => response.data)
  },
}
