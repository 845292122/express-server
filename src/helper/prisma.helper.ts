import { PrismaClient } from '@prisma/client'

export const PrismaHelper = new PrismaClient()

export const convertPageParam = (pageNo: any, pageSize: any) => {
  const skip: number = (Number(pageNo) - 1) * Number(pageSize)
  const take: number = Number(pageSize)
  return { skip, take }
}
