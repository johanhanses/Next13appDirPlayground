'use client'
import { createNewProject } from '@/lib/api'
import { Project } from '@prisma/client'
import { FormEvent, useState } from 'react'
import Modal from 'react-modal'
import { Button } from './Button'
import { Input } from './Input'

Modal.setAppElement('#modal')

export const NewProject = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [name, setName] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name) await createNewProject(name as unknown as Pick<Project, 'name'>)
    setModalIsOpen(false)
  }

  return (
    <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
      <Button type="button" onClick={() => setModalIsOpen(true)}>
        + New Project
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-1/2 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Project</h1>
        <form className="flex items-center gap-6" onSubmit={handleSubmit}>
          <Input placeholder="project name" value={name} onChange={(e) => setName(e.target.value as string)} />
          <Button type="submit">Create</Button>
        </form>
      </Modal>
    </div>
  )
}
