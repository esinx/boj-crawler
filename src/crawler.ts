import axios from 'axios'
import * as cheerio from 'cheerio'
import { Problem, Sample } from './types'
import UserAgent from 'user-agents'

const agent = new UserAgent()

const crawlProblemID = async (id: string | number): Promise<Problem> => {
  const URL = `https://www.acmicpc.net/problem/${id}`
  const { data } = await axios.get(URL, {
    headers: {
      'User-Agent': agent.toString(),
    },
  })
  const $ = cheerio.load(data)
  try {
    const description = $('#problem_description').html()!.trim()
    const input = $('#problem_input').html()!.trim()
    const output = $('#problem_output').html()!.trim()
    const samples: Sample[] = []
    while ($(`#sample-input-${samples.length + 1}`).length > 0) {
      const input = $(`#sample-input-${samples.length + 1}`)
        .html()!
        .trim()
      const output = $(`#sample-output-${samples.length + 1}`)
        .html()!
        .trim()
      samples.push({
        input,
        output,
      })
    }
    return {
      description,
      input,
      output,
      samples,
    }
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to parse problem: ${id}.`)
  }
}

export default crawlProblemID
