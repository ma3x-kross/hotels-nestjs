export interface GenerateTokensDto {
  id: number
  email: string
  roles: {
    value: string
    description: string
  }[]
}
