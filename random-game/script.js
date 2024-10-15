const SIZE = 9;
const BOX_SIZE = 3;
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const LEVEL = {easy: 36, middle: 50, hard: 61};
let countStorageKeys = 0;

const cells = document.querySelectorAll('.cell');
const renderTable = document.querySelector('.table');
const buttons = document.querySelector('.number');
const START = document.querySelector('.btn_start');
const USER_NAME = document.querySelector('.name input[type="text"');

let timer = undefined;
let userLevel = undefined;
let userTime = 0;

const TABLE = createTable();
fillInTable(TABLE);
const COPY_TABLE = copyTable(TABLE);


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
      if (table[i][j] === value && i !== cell.row && j !== cell.column){
        return false;
      }
    }
  }
  return true;
}

//Нахождение совпадающего числа в столбце
function matchesInColumn(value, cell, table){
  let match = undefined;
  for (let i = 0; i < SIZE; i++) {
    if (table[i][cell.column] === value && i !== cell.row){
      match = {row: i, column: cell.column};
    }
  }
  return match;
}

//Нахождение совпадающего числа в строке
function matchesInRow(value, cell, table){
  let match = undefined;
  for (let i = 0; i < SIZE; i++) {
    if (table[cell.row][i] === value && i !== cell.column){
      match = {row: cell.row, column: i};
    }
  }
  return match;
}

//Нахождение совпадающего числа в ячейке 3*3
function matchesInBox(value, cell, table){
  let match = undefined;
  let startRow = cell.row - (cell.row % BOX_SIZE);
  let startColumn = cell.column - (cell.column % BOX_SIZE);

  for (let i = startRow; i < (startRow + BOX_SIZE); i++) {
    for (let j = startColumn; j < (startColumn + BOX_SIZE); j++){
      if (table[i][j] === value && i !== cell.row && j !== cell.column){
        match = {row: i, column: j};
      }
    }
  }
  return match;
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
function renderShowTable(level) {
  // let copy = copyTable(TABLE);
  let readyTable = deleteRandomValues(level, COPY_TABLE).flat();

  [...cells].forEach((item, index) => {
    if (readyTable[index] !== 0){
      item.innerHTML = readyTable[index];
      item.classList.add('filled');
    }
  })

}

//При нажатии на ячейку со значение подсвечивает все одинаковые значения
function getClue(event) {
  if (event.target.classList.contains('cell')){
    removeHighlight(renderTable);
    let value = parseInt(event.target.textContent);
    addHighlightEquals(renderTable, value);
  }
}

//Поиск в таблице одинаковых значений и их подсвечивание
function addHighlightEquals(table, value) {
  for (let cell of table.children) {
    let item = parseInt(cell.textContent);
    if (item === value) {
      cell.classList.add('match');
    }
  }
}

//Удаление подсвеченных значений
function removeHighlight(table) {
  for (let cell of table.children){
    cell.classList.remove('match', 'selected');
  }
}

//Выделение одной из незаполненных ячеек
function selectCell(event) {
  if (!(event.target.classList.contains('filled'))){
    removeHighlight(renderTable);
    removeError(renderTable);
    if (event.target.classList.contains('cell')){
      event.target.classList.add('selected');
    }
  }
}

function removeError(table){
  for (let cell of table.children){
    cell.classList.remove('error');
  }
}

//Добавляет/удаляет значение в выбранную ячейку
// в соответсвии с выбранным значением
// и каждый раз проверяем заполнена ли она
function addNumberToTable(event) {
  if (event.target.classList.contains('number__btn')){
    let value = parseInt(event.target.textContent);
    removeError(renderTable);

    [...cells].forEach((cell, index) => {
      if (cell.classList.contains('selected')) {

        if (!isNaN( value ) && checkError(value, index, COPY_TABLE)){
          cell.innerHTML = '';
        }

        if (value && !checkError(value, index, COPY_TABLE)){
          cell.innerHTML = value;
          addNumber(value, index);
          if (checkSolve(TABLE, COPY_TABLE)){
            setTimeout(() => winAnimation(), 200);
            stopClock();
            saveResult(userLevel, USER_NAME.value, userTime);
            // localStorage.clear();
            setTimeout(showSaveResults, 11000);
          }
        }

        if (isNaN( value )){
          cell.innerHTML = '';
          removeNumber(index);
        }
      }
    });
  }
}

function addNumber(value, index){
  const row = Math.floor(index / SIZE);
  const column = index % SIZE;
  COPY_TABLE[row][column] = value;
}

function removeNumber(index){
  const row = Math.floor(index / SIZE);
  const column = index % SIZE;
  COPY_TABLE[row][column] = 0;
}

function checkError(value, index, table){
  const row = Math.floor(index / SIZE);
  const column = index % SIZE;
  const cell = {row, column};
  const valid = (isValidColumn(value, cell, table)) &&
                  (isValidRow(value, cell, table)) &&
                  (isValidBox(value, cell, table));

  if (!valid){
    let errors = findError(value, cell, table);
    errors.forEach(item => cells[item - 1].classList.add('error'));
    return true;
  }
  return false;
}

function findError(value, cell, table){
  let indexes = [];
  const column = matchesInColumn(value, cell, table);
  const row = matchesInRow(value, cell, table);
  const box = matchesInBox(value, cell, table);
  if (column !== undefined){
    indexes.push(column);
  }
  if (row !== undefined){
    indexes.push(row);
  }
  if (box !== undefined){
    indexes.push(box);
  }
  return convertToCell(indexes);
}

//Конвертиртация индекса ячейки
//например: из {row: 2, col: 3} в число 22
function convertToCell(indexes){
  return indexes.map(item => (item.row + 1) * 9 - (9 - (item.column + 1)));
}

//Проверка на правильность решения судоку
function checkSolve(tableOne, tableTwo){
  for (let row = 0; row < SIZE; row++){
    for (let col = 0; col < SIZE; col++){
      if (tableOne[row][col] != tableTwo[row][col]){
        return false
      }
    }
  }

  return true;
}

function winAnimation(){
  cells.forEach(cell => cell.classList.remove('error', 'selected', 'filled', 'match'));
  cells.forEach(cell => cell.classList.add('filled'));

  for (let i = 0; i < cells.length; i++ ){
    setTimeout(() => cells[i].classList.add('win'),
    500 + cells.length * 15 + 100 * i);
    setTimeout(() => cells[i].classList.add('boom'),
    500 + cells.length * 15 + 100 * cells.length);
  }
}

function initClock(){
  let seconds = 0;
  let minutes = 0;
  const time = document.querySelector('.setting__time');

  timer = setInterval(() =>{
    seconds++;
    if (seconds === 60){
      seconds = 0;
      minutes++;
    }
    if (minutes < 10 && seconds < 10){
      time.innerHTML = `Time  0${minutes} : 0${seconds}`;
    }
    if (minutes < 10 && seconds > 10){
      time.innerHTML = `Time  0${minutes} : ${seconds}`;
    }
    if (minutes > 10 && seconds < 10){
      time.innerHTML = `Time  ${minutes} : 0${seconds}`;
    }
    if (minutes > 10 && seconds > 10){
      time.innerHTML = `Time  ${minutes} : ${seconds}`;
    }

    userTime = minutes * 60 + seconds;
  }, 1000);
}

function stopClock(){
  clearInterval(timer);
}

function startGame(){
  const fieldName = document.querySelector('.name');
  const levelShow = document.querySelector('.setting__level');
  const popup = document.querySelector('.popup');

  if (!USER_NAME.value){
    fieldName.classList.add('name-error');
  } else {
    chooseLevel();
    initClock(timer);
    levelShow.innerHTML = `Level: ${userLevel}`;
    popup.classList.add('popup-unvisible');
  }
}

function chooseLevel(){
  let radios = document.querySelectorAll('input[type="radio"]');

  for (let radio of radios){
    if (radio.checked){
      let choice = 0;
      for (let [key, value] of Object.entries(LEVEL)){
        if (key === radio.value) {
          userLevel = key;
          choice = value;
        }
      }
        renderShowTable(choice);
      };
  }
}

function removeNameError(event){
  event.target.parentElement.classList.remove('name-error');
}

//Сохранение последних 10 реезультатов игры
function saveResult(level, name, time){

  //Считаем количество ключей с именем от "0" до "9"
  //не включая ключи с другими именами
  for(let key in localStorage) {
    if (typeof(+key) === 'number'){
      if (+key >= 0 && +key <= 9){
        countStorageKeys++;
      }
    }
  }

  let results = [];

  if (countStorageKeys < 10){
    localStorage.setItem(countStorageKeys, JSON.stringify({level, name, time}));
  } else {
    for (let i = 1; i < 10; i++){
      results.push(JSON.parse(localStorage.getItem(i)));
    }

    localStorage.clear();
    results.shift();

    for (let i = 1; i < 9; i++){
      localStorage.setItem(i, JSON.stringify(results[i]));
    }

    localStorage.setItem(9, JSON.stringify({level, name, time}));
  }
}

function showSaveResults(){
  const popup = document.querySelector('.popup');
  buildPopupResult();
  popup.classList.remove('popup-unvisible');
  const again = document.querySelector('.btn_again');
  again.addEventListener('click', () => location.reload());
}

function buildPopupResult(){
  const popupContent = document.querySelector('.popup__content');

  let fragment = new DocumentFragment();
  for (let i = countStorageKeys; i >= 0; i--){
    let result = JSON.parse(localStorage.getItem(i));
    let row = document.createElement('tr');
    let tdLevel = document.createElement('th');
    let tdName = document.createElement('th');
    let tdTime = document.createElement('th');
    if (localStorage.length !== 0){
      tdLevel.innerHTML = result.level;
      tdName.innerHTML = result.name;
      tdTime.innerHTML = result.time;
    }
    row.append(tdLevel);
    row.append(tdName);
    row.append(tdTime);
    fragment.append(row);
  }

  popupContent.innerHTML = `<p class="headline">Your result</p>
        <div class="result">
          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody class="user-result">
              <tr class="row">
                <td>${userLevel}</td>
                <td>${USER_NAME.value}</td>
                <td>${userTime}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="headline">Last ${countStorageKeys + 1} game results</p>
        <div class="result">
          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody class="last-results">

            </tbody>
          </table>
        </div>
        <button class="btn_again">Again</button>`;

        const lastResults = document.querySelector('.last-results');
        lastResults.append(fragment);
}

renderTable.addEventListener('click', getClue);
renderTable.addEventListener('click', selectCell);
buttons.addEventListener('click', addNumberToTable);
START.addEventListener('click', startGame);
USER_NAME.addEventListener('click', removeNameError);