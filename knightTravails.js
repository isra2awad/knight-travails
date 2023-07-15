function buildBoard() {
  let board = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board.push([j, i]);
    }
  }
  return board;
}

function findIndex(board, target) {
  for (let i = 0; i < board.length; i++) {
    if (board[i][0] === target[0] && board[i][1] === target[1]) {
      return i;
    }
  }
  return -1; // Return -1 if target not found
}

function buildInfoArr(board, startIndex) {
  let infoArray = [];
  for (let i = 0; i < board.length; i++) {
    infoArray[i] = {
      distance: null,
      predecessor: null,
    };
  }

  infoArray[startIndex].distance = 0;
  return infoArray;
}

function containsSpot(board, item) {
  for (let i = 0; i < board.length; i++) {
    if (board[i][0] === item[0] && board[i][1] === item[1]) {
      return true;
    }
  }
  return false;
}

function findNeighbors(x, y) {
  const neighbors = [];
  neighbors.push([x + 1, y + 2]);
  neighbors.push([x + 2, y + 1]);
  neighbors.push([x + 2, y - 1]);
  neighbors.push([x + 1, y - 2]);
  neighbors.push([x - 1, y + 2]);
  neighbors.push([x - 1, y - 2]);
  neighbors.push([x - 2, y + 1]);
  neighbors.push([x - 2, y - 1]);
  return neighbors;
}

function buildAdjList(board) {
  let adjList = [];
  for (let i = 0; i < board.length; i++) {
    let neighbors = [];

    let x = board[i][0];
    let y = board[i][1];

    let neighborSpots = findNeighbors(x, y);

    for (let j = 0; j < neighborSpots.length; j++) {
      let neighbor = neighborSpots[j];
      if (containsSpot(board, neighbor)) {
        neighbors.push(findIndex(board, neighbor));
      }
    }
    adjList.push(neighbors);
  }
  return adjList;
}

function findPath(board, infoArray, startIndex, endIndex, pathArray = []) {
  if (startIndex === endIndex) {
    pathArray.push(board[startIndex]);
    return pathArray;
  }

  if (infoArray[endIndex].predecessor === null) {
    return null; // No path found
  }

  pathArray.push(board[endIndex]);
  return findPath(
    board,
    infoArray,
    startIndex,
    infoArray[endIndex].predecessor,
    pathArray
  );
}

function knight(start, end) {
  let board = buildBoard();
  let startIndex = findIndex(board, start);
  let endIndex = findIndex(board, end);

  if (startIndex === -1 || endIndex === -1) {
    console.log("Invalid start or end position.");
    return;
  }

  let infoArray = buildInfoArr(board, startIndex);
  let adjList = buildAdjList(board);
  let queue = [];
  queue.push(startIndex);

  while (queue.length > 0) {
    let u = queue.shift();

    if (u === endIndex) {
      let resultPath = findPath(board, infoArray, startIndex, endIndex);
      if (resultPath === null) {
        console.log("No path found.");
      } else {
        resultPath.reverse().unshift(start);
        console.log(
          `You made it in ${
            resultPath.length - 1
          } moves! Here's your path: ${resultPath}`
        );
      }

      return;
    }

    let neighbors = adjList[u];
    for (let i = 0; i < neighbors.length; i++) {
      let v = neighbors[i];
      if (infoArray[v].distance === null) {
        infoArray[v].distance = infoArray[u].distance + 1;
        infoArray[v].predecessor = u;
        queue.push(v);
      }
    }
  }

  console.log("No path found.");
}

knight([0, 2], [1, 5]);
