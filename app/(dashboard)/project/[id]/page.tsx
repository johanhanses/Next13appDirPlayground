import { TaskCard } from '@/components/TaskCard'
import { getUserFromCookie } from '@/lib/auth'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

const getData = async (id: string) => {
  const user = await getUserFromCookie(cookies())

  if (user) {
    const project = db.project.findFirst({
      where: {
        id,
        ownerId: user.id
      },
      include: {
        tasks: true
      }
    })
    return project
  }
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getData(params.id)
  return (
    <div className="h-full overflow-y-auto pl-6 w-full">
      {/* @ts-expect-error Server Component */}
      <TaskCard tasks={project?.tasks} title={project?.name} />
    </div>
  )
}
