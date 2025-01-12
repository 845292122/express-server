export type AccountType = {
  id: number
  contact?: string
  phone?: string
  password?: string
  company?: string
  licenseNumber?: string
  address?: string
  type?: number
  remark?: string
  isAdmin?: number
  trialStartDate?: Date
  trialEndDate?: Date
  startDate?: Date
  endDate?: Date
  status?: number
  delFlag: number
  createdAt: Date
  updatedAt: Date
}
