export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
  localId?: string
}

export interface Post {
  id?: string
  title: string
  text: string
  author: string
  date: Date
}

export interface FbCreateResponse {
  name: string
}

export interface Alert {
  type: AlertType
  text: string
}

export type AlertType = 'success' | 'warning' | 'danger'
