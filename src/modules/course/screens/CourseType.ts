type Question = {
  id: number
  title: string
  questions: any[] // Você pode adicionar a tipagem correta para as perguntas
}

export type Section = {
  id: number
  title: string
  description: string
  images: string[]
  videos: string[]
  pdfs: string[]
  tests: Question[]
}

export type CourseType = {
  id: number
  name: string
  sections: Section[]
}
