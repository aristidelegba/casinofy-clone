import { TMise, TNumbersCount, TWheelSpeed } from "@/configs";

export function getRandomNumbers(min: number, max: number, count: number): number[] {
  const randomNumbers: number[] = [];
  for (let i = 0; i < count; i++) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.push(randomNum);
  }
  return randomNumbers;
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function calculateTotalGain(data: { mise: TMise, numbersCount: TNumbersCount, wheelSpeed: TWheelSpeed }) {
  const { mise, numbersCount, wheelSpeed } = data
  const gain = calculatePercentage(mise.value, numbersCount.percent)
  const gainBySpeed = gain + calculatePercentage(gain, wheelSpeed.percent)
  return gainBySpeed.toFixed(2)
}

export function calculatePercentage(total: number, percent: number) {
  if (percent === 0) return 0
  return parseFloat((percent / 100 * total).toFixed(2))
}


export function shuffleArray(initialArray: any[]):any[]{
  return initialArray
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

}

