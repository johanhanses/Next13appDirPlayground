import { Greeting } from '@/components/Greeting'
import { GreetingsSkeleton } from '@/components/GreetingSkeleton'
import { NewProject } from '@/components/NewProject'
import { ProjectCard } from '@/components/ProjectCard'
import { TaskCard } from '@/components/TaskCard'
import { delay } from '@/lib/async'
import { getUserFromCookie } from '@/lib/auth'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Suspense } from 'react'

const getData = async () => {
  await delay(1000)
  const user = await getUserFromCookie(cookies())
  if (user) {
    const projects = await db.project.findMany({
      where: {
        ownerId: user.id
      },
      include: { tasks: true }
    })
    return projects
  }
}

export default async function Home() {
  const projects = await getData()

  return (
    <div className="h-full overflow-y-auto pl-6 w-full">
      <div className=" h-full w-full items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            {/* @ts-expect-error Server Component */}
            <Greeting />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          {projects &&
            projects.map((project) => (
              <div className="w-1/3 p-3" key={project.id}>
                <Link href={`/project/${project.id}`}>
                  <ProjectCard project={project} />
                </Link>
              </div>
            ))}
          <div className="w-1/3 p-3">
            <NewProject />
          </div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            {/* @ts-expect-error Server Component */}
            <TaskCard />
          </div>
        </div>
      </div>
    </div>
  )
}
