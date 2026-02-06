import { deleteApi, editApi } from "@/services/api";

export const approve = async (user_id, arg) => {
    const aux = { user_id, approved: arg }
    const res = await editApi(['/user/admin/approve', aux])
    return res
}

export const deleteUser = async (user_id) => {
    const res = await deleteApi(`/user/admin/delete?id=${user_id}`)
    return res
}

export const password = async (user_id, newPassword) => {
    const aux = { user_id, newPassword }
    const res = await editApi(['/user/admin/password', aux])
    return res
}

export const email = async (user_id, newEmail) => {
    const aux = { user_id, newEmail }
    const res = await editApi(['/user/admin/email', aux])
    return res
}

export const role = async (user_id, newRole) => {
    console.log("role handler")
    const aux = { user_id, newRole }
    console.log(aux)
    const res = await editApi(['/user/admin/role', aux])
    console.log(res)
    return res
}


