import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Login from '../Login'

describe('Login component', () => {
  let realFetch
  beforeEach(() => {
    realFetch = global.fetch
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })
  afterEach(() => {
    global.fetch = realFetch
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('shows validation errors for empty fields', async () => {
    render(<Login />)
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
    expect(await screen.findByText(/Email is required.|Password is required./i)).toBeInTheDocument()
  })

  it('successful login with backend response', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'tok-123' })
      })
    )

    render(<Login />)
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => expect(window.alert).toHaveBeenCalled())
    expect(localStorage.getItem('token')).toBe('tok-123')
  })

  it('shows backend error message on 401', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' })
      })
    )

    render(<Login />)
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'noone@example.com' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'badpass' } })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument()
  })
})
