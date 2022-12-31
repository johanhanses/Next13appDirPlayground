import { Project, User } from '@prisma/client'

export const fetcher = async ({
  url,
  method,
  body,
  json = true
}: {
  url: string
  method: string
  body: Object
  json: boolean
}) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) throw new Error('API Error')

  if (json) {
    const data = await res.json()
    return data.data
  }
}

export const register = async (user: Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>) => {
  return fetcher({
    url: '/api/register',
    method: 'POST',
    body: user,
    json: false
  })
}

export const signin = async (user: Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>) => {
  return fetcher({
    url: '/api/signin',
    method: 'POST',
    body: user,
    json: false
  })
}

export const createNewProject = async (name: Pick<Project, 'name'>) => {
  return fetcher({
    url: '/api/project',
    method: 'POST',
    body: { name },
    json: true
  })
}
