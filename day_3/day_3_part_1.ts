import {readFileSync, promises as fsPromises} from "fs";

function syncReadFile(filename: any) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

const alphabet: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const getAllCommonLetters = (data: string[]): string[] => {
  const allCommonLetters: string[] = data.flatMap(x => {
    const halfWay: number = x.length / 2
    const firstCompartment = x.substring(0, halfWay)
    const secondCompartment = x.substring(halfWay, x.length)
    const commonLetters = getCommonLetters(firstCompartment, secondCompartment);
    return commonLetters[0]
  })
  return allCommonLetters
}

const getCommonLetters = (firstCompartment: string, secondComartment: string) => {
  return firstCompartment.split('').filter(x => secondComartment.includes(x))
}

const getTotalPriorities = (commonLetters: string[]) => {
  return commonLetters.map(x => alphabet.indexOf(x) + 1).reduce((a, b) => a + b);
}

const allCommonLetters = getAllCommonLetters(data);
const totalPriorities = getTotalPriorities(allCommonLetters)
console.log('totalPriorities: ', totalPriorities)

