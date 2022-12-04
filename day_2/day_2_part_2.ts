import {readFileSync, promises as fsPromises} from "fs";

function syncReadFile(filename: any) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

// A = Rock
// B = Paper
// C = Scissors

// X = Lose
// Y = Draw
// Z = Win

const shapeScoreMap: any = {
  A: 1,
  B: 2,
  C: 3
}

const outcomeScoreMap: any = {
  Win: 6,
  Draw: 3,
  Lose: 0
}

const outcomeMap: any = {
  X: "Lose",
  Y: "Draw",
  Z: "Win"
}

const winningComboMap: any = {
  A: "B",
  B: "C",
  C: "A"
}

const losingComboMap: any = {
  A: "C",
  B: "A",
  C: "B"
}

const getTotalScore = (data: string[]) => {
  const myScores: number[] = data.map(x => {
    if (x === '') {
      return 0;
    }
    const myOutcome = outcomeMap[x[2]]
    const myOutcomeScore = outcomeScoreMap[myOutcome]
    const myShape = getMyShape(myOutcome, x[0])
    const myShapeScore = shapeScoreMap[myShape]
    return myOutcomeScore + myShapeScore
  })

  const totalScore = myScores.reduce((a, b) => a + b, 0)
  return totalScore
}

const getMyShape = (outcome: string, oppShape: string) => {
  if (outcome === "Draw") {
    return oppShape;
  } else if (outcome === "Win") {
    return winningComboMap[oppShape]
  } else {
    return losingComboMap[oppShape]
  }
}

const data = syncReadFile('day_2/data.txt');
const totalScore = getTotalScore(data)

console.log('totalScore', totalScore)
