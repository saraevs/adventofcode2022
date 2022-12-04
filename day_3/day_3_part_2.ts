import {readFileSync, promises as fsPromises} from "fs";

function syncReadFile(filename: any) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

const alphabet: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const groupBy = (rucksacks: string[], n: number) => {
  const group: string[][] = [];
  for (var i = 0, end = rucksacks.length / n; i < end; ++i)
    group.push(rucksacks.slice(i * n, (i + 1) * n));
  return group;
}

const getAllCommonLetters = (groups: string[][]): string[] => {
  const allCommonLetters: string[] = groups.flatMap(x => {
    const commonLetters = getCommonLetters(x[0], x[1], x[2]);
    return commonLetters[0]
  })
  return allCommonLetters
}

const getCommonLetters = (first: string, second: string, third: string) => {
  return first.split('').filter(x => second.includes(x) && third.includes(x))
}

const getTotalPriorities = (commonLetters: string[]) => {
  return commonLetters.map(x => alphabet.indexOf(x) + 1).reduce((a, b) => a + b);
}

const data = syncReadFile('day_3/data.txt');
const groups = groupBy(data, 3)
const allCommonLetters = getAllCommonLetters(groups);
const totalPriorities = getTotalPriorities(allCommonLetters)
console.log('totalPriorities: ', totalPriorities)

