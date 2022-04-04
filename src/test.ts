import crawlProblemID from './crawler'

const main = async () => {
  const test = await crawlProblemID(1120)
  console.log(test)
}

main()
