export type SlideType =
  | 'title'
  | 'content'
  | 'warning'
  | 'case'
  | 'example'
  | 'checklist'
  | 'summary'
  | 'resources'
  | 'final'

export interface CaseStudy {
  situation: string
  reality?: string[]
  consequences?: string[]
  problem?: string
  question?: string
  conclusion?: string
  lesson?: string
  badResponse?: string
  goodResponse?: string
  outcome?: string[]
}

export interface Example {
  title: string
  description: string
  items: string[]
  conclusion: string
}

export interface Slide {
  id: number
  title: string
  subtitle?: string
  type: SlideType

  bullets?: string[]
  note?: string
  result?: string
  examples?: string[]
  exampleItem?: string

  case?: CaseStudy
  example?: Example
  checklist?: string[]
  resources?: string[]
}

export interface SlideStore {
  slides: Slide[]
  totalSlides: number
}
