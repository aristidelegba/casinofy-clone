
export type TMise = {
  title: string;
  value:  number;
};
export const misesOptions: TMise[] = [
  {
    title: "100 FCFA",
    value: 100,
  },
  {
    title: "200 FCFA",
    value: 200,
  },
  {
    title: "500 FCFA",
    value: 500,
  },
  {
    title: "1000 FCFA",
    value: 1000,
  },
  {
    title: "2000 FCFA",
    value: 2000,
  },
  {
    title: "10000 FCFA",
    value: 10000,
  },
  {
    title: "20000 FCFA",
    value: 20000,
  },
];

export type TNumbersCount = {
  title: string, value:  number, percent: number
}
const numberCountOptionTitle = (value: string | number, percent: number): string => value + ' -> Gains: Mise * ' + percent + '%'
export const numbersCountOptions: TNumbersCount[] = [{
  percent: 10,
  value: 2,
}, {
  percent: 15,
  value: 3,
}, {
  percent: 20,
  value: 4,
}, {
  percent: 25,
  value: 5,
}, {
  percent: 30,
  value: 6,
}, {
  percent: 40,
  value: 7,
}, {
  percent: 60,
  value: 8,
}, {
  percent: 90,
  value: 9,
}].map(({ percent, value }) => {
  return {
    percent, value, title: numberCountOptionTitle(value, percent)
  }
})


export type TWheelSpeed = {} & TNumbersCount
const wheelSpeedOptionTitle = (value: string | number, percent: number) => `${value} chiffres / seconde -> ${percent === 0 ? '+/-' : ''} ${percent}% Gains`
export const wheelSpeedOptions: TWheelSpeed[] = [{
  percent: -98,
  value: 1
}, {

  percent: -85,

  value: 2
}, {

  percent: -60,

  value: 3
}, {

  percent: 0,
  value: 4
}, {

  percent: +30,

  value: 5
}, {

  percent: +90,

  value: 6
}, {

  percent: +200,
  value: 7
}, {

  percent: +300,
  value: 8
}].map(({ percent, value }) => {
  return {
    percent, value, title: wheelSpeedOptionTitle(value, percent)
  }
})
