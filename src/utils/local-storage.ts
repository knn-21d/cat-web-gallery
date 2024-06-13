type UserType = {
    login: string
    posts?: string[]
    comments?: string[]
    likes?: string[]
    dislikes?: string[]
}

const USER_KEY = 'user'

export function getUser() {
    return localStorage.getItem(USER_KEY)
}

export function updateUser(user: Partial<UserType>): Partial<UserType> {
    const userStr = localStorage.getItem(USER_KEY)
    if (userStr) {
        const userObj = JSON.parse(userStr)
        const newUser = { ...userObj, ...user }
        localStorage.setItem(USER_KEY, JSON.stringify(newUser))
        return newUser
    } else {
        localStorage.setItem(USER_KEY, JSON.stringify(user))
        return user
    }
}

export function setUser(user: UserType): UserType {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    return user
}

export function clearUser() {
    localStorage.removeItem(USER_KEY)
}
