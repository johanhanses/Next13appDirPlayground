'use client'

import { register, signin } from '@/lib/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useState } from 'react'
import { Button } from './Button'
import { Card } from './Card'
import { Input } from './Input'

const registerContent = {
  linkUrl: '/signin',
  linkText: 'Already have an account?',
  header: 'Create a new Account',
  subheader: 'Just a few things to get started',
  buttonText: 'Register'
}

const signinContent = {
  linkUrl: '/register',
  linkText: "Don't have an account?",
  header: 'Welcome Back',
  subheader: 'Enter your credentials to access your account',
  buttonText: 'Sign In'
}

const initial = {
  email: '',
  password: '',
  firstName: '',
  lastName: ''
}

interface AuthFormProps {
  mode: 'signin' | 'register'
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const [formState, setFormState] = useState({ ...initial })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        if (mode === 'register') {
          await register(formState)
        } else {
          await signin(formState)
        }

        router.replace('/home')
      } catch (e) {
        setError(`Could not ${mode}`)
        console.error(error)
      } finally {
        setFormState({ ...initial })
      }
    },
    [mode, router, formState, error]
  )

  const content = mode === 'register' ? registerContent : signinContent

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="py-10 w-full">
          {mode === 'register' && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">First Name</div>
                <Input
                  required
                  placeholder="First Name"
                  value={formState.firstName}
                  classNames="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) => setFormState((s) => ({ ...s, firstName: e.target.value }))}
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                <Input
                  required
                  placeholder="Last Name"
                  value={formState.lastName}
                  classNames="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) => setFormState((s) => ({ ...s, lastName: e.target.value }))}
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <Input
              required
              type="email"
              placeholder="Email"
              value={formState.email}
              classNames="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              required
              value={formState.password}
              type="password"
              placeholder="Password"
              classNames="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) => setFormState((s) => ({ ...s, password: e.target.value }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link href={content.linkUrl} className="text-blue-600 font-bold">
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" intent="secondary">
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  )
}
