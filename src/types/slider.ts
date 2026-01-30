import type { Ref } from 'vue'

export type SlideType = 'title' | 'content' | 'warning' | 'case' | 'checklist' | 'summary'

export interface SlideCase {
  situation: string
  reality?: string[]
  consequences?: string[]
  conclusion?: string
  lesson?: string
  problem?: string
  question?: string
}

export interface Slide {
  id: number
  title: string
  type: SlideType

  subtitle?: string

  bullets?: string[]
  checklist?: string[]

  note?: string
  result?: string

  case?: SlideCase

  examples?: string[]
}

export interface SlideStore {
  slides: Ref<Slide[]>
  totalSlides: number
}
