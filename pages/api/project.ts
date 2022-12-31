import { validateJWT } from '@/lib/auth'
import { db } from '@/lib/db'
import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function project(req: NextApiRequest, res: NextApiResponse) {
  const cookie = process.env.COOKIE_NAME
  if (typeof cookie === 'string') {
    const reqCookie = req.cookies[cookie] as string
    const user = (await validateJWT(reqCookie)) as User

    const project = await db.project.create({
      data: {
        name: req.body.name,
        ownerId: user.id
      }
    })

    res.json({ data: { message: 'ok', project } })
  }
}
