import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CSVRecord } from './CSVModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sudoku';
  cells = [];
  boardStart;
  solution;
  game: CSVRecord;
  quizzArray: CSVRecord[] = [];
  // tslint:disable: align
  // tslint:disable: no-trailing-whitespace
  constructor(private http: HttpClient) { console.log('start'); }

  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;

  async ngOnInit(): Promise<void> {
    console.log('init');
    await this.readFile();

  }

  cellHerding() {
    this.cells = [];
    for (let i = 0; i < 9; i++) {
      for (let y = 0; y < 9; y++) {
        let id = 'c' + i + 'r' + y;
        let cell = document.getElementById(id).children.item(0);
        this.cells.push(cell);

      }

    }
  }

  selectRndPair() {
    const pairNum = this.getRandomInt(this.quizzArray.length - 1);
    this.game = this.quizzArray[pairNum];

    this.boardStart = this.game.start;
    this.solution = this.game.solution;
    console.log(this.solution);
    console.log(this.boardStart);
    this.generateBoard();

  }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  async readFile() {


    this.http.get('assets/sudoku.csv', {responseType: 'text'})
      .subscribe(
          data => {
              const csvToRowArray = data.split('\n');
              for (let index = 1; index < csvToRowArray.length - 1; index++) {
                const row = csvToRowArray[index].split(',');
                this.quizzArray.push(new CSVRecord(  row[0], row[1].trim()));
              }
          //console.log(this.quizzArray);
          this.selectRndPair();
          return true;
          },
          error => {
            console.log(error);
            throw error;
          }
      );


  }


  generateBoard() {
    const board = document.getElementById('board');

    for (let i = 0; i < 9; i++) {
      const tr = document.createElement('tr');
      tr.id = 'row' + i;

        for (let y = 0; y < 9; y++) {
          const td = document.createElement('td');
          td.id = 'c' + y + 'r' + i;
          let input = document.createElement('input');

          input = this.fillboard(input, i ,y);
          //console.log(input);


          td.appendChild(input);
          tr.appendChild(td);
      }

      board.appendChild(tr);
    }
    //console.log(this.cells);

  }

  fillboard(input, row , col) {
    let id = row + (col*9);
    const symbol = this.boardStart.charAt(id);
    //console.log(symbol);
    if (symbol == 0) {

    input.id = 'input' + 'c' + col + 'r' + row + '|' + id;
    input.type = 'text';
      input.pattern = '[0-9]{5}';
      input.maxLength = 1;
    input.style = 'width: 30px; text-align: center;';
    if (row == 2 || row == 5) {
      input.style = 'border-bottom: 4px solid black; width: 30px; text-align: center;';
    } else if (row == 3 || row == 6) {
      input.style = 'border-top: 4px solid black; width: 30px; text-align: center;';
    } else if (col == 2 || col == 5) {
      input.style = 'border-right: 4px solid black; width: 30px; text-align: center;';
    } else if (col == 3 || col == 6) {
      input.style = 'border-left: 4px solid black; width: 30px; text-align: center;';
    }

    if (id == 20 || id == 23 || id == 47 || id == 50) {
      input.style = 'border-right: 4px solid black; border-bottom: 4px solid black; width: 30px; text-align: center;'
    }
    if (id == 21 || id == 24 || id == 48 || id == 51) {
      input.style = 'border-right: 4px solid black; border-top: 4px solid black; width: 30px; text-align: center;'
     }
    if (id == 29 || id == 56 || id == 32 || id == 59 ) {
      input.style = 'border-left: 4px solid black; border-bottom: 4px solid black; width: 30px; text-align: center;'
     }
    if (id == 30 || id == 33 || id == 57 || id == 60) {
      input.style = 'border-left: 4px solid black; border-top: 4px solid black; width: 30px; text-align: center;'
    }





      return input;

    } else {
      input.style = 'width: 30px; text-align: center; background-color: lightgray;';
      if (row == 2 || row == 5) {
        input.style = 'border-bottom: 4px solid black; width: 30px; text-align: center; background-color: lightgray;';
      } else if (row == 3 || row == 6) {
        input.style = 'border-top: 4px solid black; width: 30px; text-align: center; background-color: lightgray;';
      } else if (col == 2 || col == 5) {
        input.style = 'border-right: 4px solid black; width: 30px; text-align: center; background-color: lightgray;';
      } else if (col == 3 || col == 6) {
        input.style = 'border-left: 4px solid black; width: 30px; text-align: center; background-color: lightgray;';
      }

      if (id == 20 || id == 23 || id == 47 || id == 50) {
        input.style = 'border-right: 4px solid black; border-bottom: 4px solid black; width: 30px; text-align: center; background-color: lightgray;'
      }
      if (id == 21 || id == 24 || id == 48 || id == 51) {
        input.style = 'border-right: 4px solid black; border-top: 4px solid black; width: 30px; text-align: center; background-color: lightgray;'
       }
      if (id == 29 || id == 56 || id == 32 || id == 59 ) {
        input.style = 'border-left: 4px solid black; border-bottom: 4px solid black; width: 30px; text-align: center; background-color: lightgray;'
       }
      if (id == 30 || id == 33 || id == 57 || id == 60) {
        input.style = 'border-left: 4px solid black; border-top: 4px solid black; width: 30px; text-align: center; background-color: lightgray;'
      }

      input.value = symbol;

      input.readOnly = true;
      return input;
    }




  }
  idk(index, what) {
    if (what == 'solution') {
      return this.solution.charAt(index);
    } else if (what == 'start') {
      return this.boardStart.charAt(index);
    } else {
      return null;
    }

  }
  check() {
    this.cellHerding();
    console.log('start');
    let game = '';
    let i = 0;
    for (const cell of this.cells) {
      game += cell.value;
      if (cell.value != this.idk(i, 'solution')) {


        let style = cell.style.cssText;
        style += ' color: red;';
        cell.style = style;
      } else {
        let style = cell.style.cssText;
        style += ' color: green;';
        cell.style = style;
      }
      i++;
    }
    let state = document.getElementById('state');
    if (game == this.solution) {
      console.log('WON');
      state.innerText = "WON";
    } else {
      console.log('try again');
      console.log(state);
      state.innerText = "Try again...";
    }


    }




  autoSolve() {
    this.cellHerding();
    console.log('start');

    let i = 0;
    for (const cell of this.cells) {


      cell.value = this.idk(i, 'solution');
      i++;
    }
  }
}
