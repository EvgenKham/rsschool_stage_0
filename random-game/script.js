const SIZE = 9;
const BOX_SIZE = 3;
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const TABLE = createTable();
const LEVEL = {easy: 36, middle: 50, hard: 63};
const cells = document.querySelectorAll('.cell');
const renderTable = document.querySelector('.table');

//Создание пустой таблицы 9*9
function createTable() {
  return new Array(SIZE)
        .fill(0)
        .map(item => item = new Array(SIZE)
            .fill(0));
};

//Получение перешанного массива чисел от 1 до 9
function getShuffleNumbers () {
  //Копируем массив с числами
  let shuffled = NUMBERS.map(item => item);
  //Перемешиваем скопированый массив
  shuffled.sort(() => Math.random() - 0.5);
  // console.log(shuffled);
  return shuffled;
}

//Проверка числа в колонке
function isValidColumn(value, cell, table) {
  for (let i = 0; i < SIZE; i++) {
    if (table[i][cell.column] === value && i !== cell.row){
      return false;
    }
  }
  return true;
}

//Проверка числа в строке
function isValidRow(value, cell, table) {
  for (let i = 0; i < SIZE; i++) {
    if (table[cell.row][i] === value && i !== cell.column){
      return false;
    }
  }
  return true;
}

//Проверка числа в ячейке 3*3
function isValidBox(value, cell, table) {
  //Поиск начала ячейке 3*3
  let startRow = cell.row - (cell.row % BOX_SIZE);
  let startColumn = cell.column - (cell.column % BOX_SIZE);

  for (let i = startRow; i < (startRow + BOX_SIZE); i++) {
    for (let j = startColumn; j < (startColumn + BOX_SIZE); j++){
      if ((table[i][j] === value) && (i !== cell.row) && (j !== cell.column)){
        return false;
      }
    }
  }
  return true;
}

//Поиск пустой ячейки
function isEmpty(table) {
  for(let row = 0; row < SIZE; row++){
    for(let column = 0; column < SIZE; column++){
      if(table[row][column] === 0){
        return {row, column};
      }
    }
  }
  return false;
}

//Заполняем таблицу числами от 1 до 9
//без повторений в строке, ряду и ячейке 3*3
function fillInTable(table) {
  let emptyCell = isEmpty(table);
  let randoms = getShuffleNumbers();
  let { row, column: col } = emptyCell;

  //Если нет пустых ячеек, значит таблица заполнена
  if (emptyCell === false){
    return true;
  }

  //Проход по каждому числу перемешанного массива и проверка валидации
  for (let i = 0; i < SIZE; i++ ){
    let value = randoms[i];
    const valid = (isValidColumn(value, emptyCell, table)) &&
                  (isValidRow(value, emptyCell, table)) &&
                  (isValidBox(value, emptyCell, table));

    if (valid === false){
      continue;
    }

    table[row][col] = value;

    //Рекурсивно заполняем все ячейки таблицы
    if (fillInTable(table)){
      return true;
    }

    table[row][col] = 0;
  }

  return false;
}


fillInTable(TABLE);
// console.table(TABLE);

//Глубокое копирование заполненной таблицы,
//для сохраненния исходной таблицы с верно заполненными числами
function copyTable(table) {
  return JSON.parse(JSON.stringify(table));
}

//Удаление переданного количесво чисел таблицы в случайном порядке
function deleteRandomValues(count, table) {

  for (let i = 0; i < count; i++){

    let randomRow = Math.floor(Math.random() * SIZE);
    let randomCol = Math.floor(Math.random() * SIZE);

    if(table[randomRow][randomCol] === 0){
      i--;
      continue;
    }
    table[randomRow][randomCol] = 0;
  }

  return table;
}

//Заполнение и вывод таблицы с недостающими цифрами
// в зависимости от уровня сложности
function renderShowTable() {
  let copy = copyTable(TABLE);
  let readyTable = deleteRandomValues(LEVEL.easy, copy).flat();

  [...cells].forEach((item, index) => {
    if (readyTable[index] !== 0){
      item.innerHTML = readyTable[index];
      item.classList.add('filled');
    }
  })

}

renderShowTable();

function activeCell(event) {
  if (event.target.classList.contains('cell')){
    removeClue(renderTable);
    let value = parseInt(event.target.textContent);
    getClue(renderTable, value);
  }
}

//Поиск в таблице одинаковых значений и их подсвечивание
function getClue(table, value) {
  for (let cell of table.children) {
    if (cell.classList.contains('filled')){
      let item = parseInt(cell.textContent);
      if (item === value) {
        cell.classList.add('match');
      }
    }
  }
}

//Подсвечивание предыдущих значений удаляется
function removeClue(table) {
  for (let cell of table.children){
    cell.classList.remove('match');
  }
}

renderTable.addEventListener('click', activeCell);