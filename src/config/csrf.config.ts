import csrf from 'csurf'

export const csrfProtection = csrf({
  cookie: true // 使用 Cookie 储存 CSRF Token
})
