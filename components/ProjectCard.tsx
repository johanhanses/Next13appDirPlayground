import { Prisma, Project, TASK_STATUS } from '@prisma/client'
import { Card } from './Card'

const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
  include: { tasks: true }
})

type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('sv-SE', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const ProjectCard = ({ project }: { project: ProjectWithTasks }) => {
  const completedCount = project.tasks.filter((task) => task.status === TASK_STATUS.COMPLETED).length
  const progress = Math.ceil((completedCount / project.tasks.length) * 100)

  return (
    <Card classNames="!px-6 !py-8 hover:scale-105 transition-all ease-in-out duration-200">
      <div>
        <span className="text-sm text-gray-300">{formatDate(project.createdAt)}</span>
      </div>
      <div className="mb-6">
        <span className="text-3xl text-gray-600">{project.name}</span>
      </div>
      <div className="mb-2">
        <span className="text-gray-400">
          {completedCount}/{project.tasks.length} completed
        </span>
      </div>
      <div>
        <div className="w-full h-2 bg-violet-200 rounded-full mb-2">
          <div
            className="h-full text-center text-xs text-white bg-violet-600 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-600 font-semibold">{progress}%</span>
        </div>
      </div>
    </Card>
  )
}
