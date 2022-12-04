import {readFileSync, promises as fsPromises} from "fs";

function syncReadFile(filename: any) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

// A / X = Rock
// B / Y = Paper
// C / Z = Scissors

const shapeScoreMap = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3
}

const outcomeScoreMap = {
  Win: 6,
  Draw: 3,
  Lose: 0
}

const getTotalScore = (data: string[], shapeScoreMap: any, outcomeScoreMap: any) => {
  const myScores = data.map(x => {
    if (x === '') {
      return 0;
    }
    const myShapeScore = shapeScoreMap[x[2]]
    const roundOutcome = getRoundOutcome(x, shapeScoreMap)
    const outcomeScore = outcomeScoreMap[roundOutcome]
    return myShapeScore + outcomeScore
  })

  const totalScore = myScores.reduce((a, b) => a + b, 0)
  return totalScore
}

const getRoundOutcome = (round: string, scoreMap: any) => {
  const myShapeScore = scoreMap[round[2]]
  const oppShapeScore = scoreMap[round[0]]
  if (myShapeScore === oppShapeScore) {
    return "Draw"
  } else if (round[0] === "A" && round[2] === "Y") {
    return "Win"
  } else if (round[0] === "B" && round[2] === "Z") {
    return "Win"
  } else if (round[0] === "C" && round[2] === "X") {
    return "Win"
  } else {
    return "Lose"
  }
}

const data = syncReadFile('day_2/data.txt');
const totalScore = getTotalScore(data, shapeScoreMap, outcomeScoreMap)

console.log('totalScore', totalScore)
