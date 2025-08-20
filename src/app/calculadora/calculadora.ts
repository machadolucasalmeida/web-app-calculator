import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [],
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.scss'
})
export class Calculadora {

  previousCalculation: any = ''
  currentCalculation: any = ''
  firstOperation = true

  addToScreen(input: any) {
    if (this.firstOperation) {
      if (+input >= 0 || input === ".") {
        this.addDigit(input)
      } else {
        this.processOperation(input)
      }
    } else {
      this.previousCalculation = "";
      this.currentCalculation = "";
      this.firstOperation = true
      if (+input >= 0 || input === ".") {
        this.addDigit(input)
      } else {
        this.processOperation(input)
      }
    }
  }

  addDigit(digit: any) {
    if (digit === "." && this.currentCalculation.includes(".")) {
      return
    }
    this.currentCalculation += digit;
    this.updateScreen(null, null, null, null);
  }
  processOperation(operation: any) {
    if (this.currentCalculation === "" && this.currentCalculation !== "AC") {
      if (this.previousCalculation !== "") {
        this.changeOperation(operation);
      }
      return
    }
    let operationValue: any;
    let previous = +this.previousCalculation.split(" ")[0];
    let current = +this.currentCalculation;

    switch (operation) {
      case "+": {
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      }
      case "-": {
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      }
      case "X": {
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      }
      case "/": {
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      }
      case "AC": {
        this.processDelOperation();
        break;
      }
      case "=": {
        this.processEqualOperation();
        break;
      }
      /*
      case "DEL":{
        this.processDelOperation();
        break;
      }
      */
    }
  }
  changeOperation(operation: any) {
    const mathOperations = ["+", "-", "X", "/"];
    if (!operation.includes(operation)) {
      return
    }
    this.previousCalculation = this.previousCalculation.trim().slice(0, -1) + operation;
  }
  updateScreen(operationValue = null, operation = null, current: any, previous: any) {
    if (operationValue !== null) {
      if (previous === 0) {
        operationValue = current;
      }
      this.previousCalculation = `${current} ${operation}`;
      if (previous > 0) {
        this.previousCalculation = `${previous} ${operation} ${current} =`
        this.currentCalculation = operationValue;
      } else {
        this.currentCalculation = "";
      }
    }
  }
  processDelOperation() {
    this.currentCalculation = this.currentCalculation.slice(0, -1);
  }
  processEqualOperation() {
    let operation = this.previousCalculation.split(" ")[1];
    this.firstOperation = false;
    this.processOperation(operation);
  }
  processAllClearOperation() {
    this.currentCalculation = "";
    this.previousCalculation = "";
  }
}
