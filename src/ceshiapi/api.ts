import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export const addUser = (data: any) => axios.post('/tests', data).then((res) => res.data)

export const getList = (data: any) => axios.get('/tests', { params: data }).then((res) => res.data)

export const delUser = (data: { id: any }) =>
  axios.delete(`/tests/${data.id}`).then((res) => res.data)

export const updateUser = (data: { id: any }) =>
  axios.patch(`/tests/${data.id}`, data).then((res) => res.data)
export const addTags = (data: { tags: string[]; testsId: number | undefined }) =>
  axios.post(`/tests/add/tags`, data).then((res) => res.data)
