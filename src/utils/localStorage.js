export const addLocalStorageUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

export const getLocalStorageUser = () => {
   return JSON.parse(localStorage.getItem('user'))
}

export const getLocalStorageToken = () => {
   return localStorage.getItem('token')
}

export const deleteLocalStorageUser = () => {
   localStorage.removeItem('user')
}

export const addLocalStorageCart = (product) => {
    localStorage.setItem('cart', JSON.stringify(product))
}

export const getLocalStorageCart = () => {
   return JSON.parse(localStorage.getItem('cart'))
}

export const deleteLocalStorageCart = () => {
   localStorage.removeItem('cart')
}

