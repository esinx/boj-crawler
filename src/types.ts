export type Sample = {
  input: string
  output: string
}

export type Problem = {
  description: string
  input: string
  output: string
  samples: Sample[]
}
