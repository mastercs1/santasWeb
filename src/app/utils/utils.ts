import { ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NameDescription } from '../interface/nameDescription';


export class Utils {
  static getDateStr(date: Date): string {
    const d = new Date(date);
    var year = d.getFullYear();
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  

  static getNumberSuffixFrom_(versionStr: string | undefined): number | null {
    if (!versionStr) {
      return null;
    }

    const arr = versionStr.split('_');
    if (arr?.length > 1) {
      return Number(arr[1]);
    }
    return null;
  }

  static pad(num: number) {
    var s = '0000' + num;
    return s.slice(-2);
  }

  static sortObjArr(data: any[], sortByAttr: string) {
    data.sort((a: any, b: any) => {
      return a[sortByAttr] > b[sortByAttr] ? 1 : -1;
    });
  }

  static getIndexDifference(
    list: string[],
    item1: string,
    item2: string,
  ): number {
    var item1Index = list.findIndex(
      (item) => item.toLowerCase() === item1.toLowerCase(),
    );
    var item2Index = list.findIndex(
      (item) => item.toLowerCase() === item2.toLocaleLowerCase(),
    );

    item1Index = item1Index == -1 ? Number.MAX_SAFE_INTEGER : item1Index; // if not found we want to put them bottom-most
    item2Index = item2Index == -1 ? Number.MAX_SAFE_INTEGER : item2Index; // if not found we want to put them bottom-most

    return item1Index - item2Index;
  }

  static getSortDescription(col: string) {
    return `Sort by ${col}`;
  }

  static scrollIntoView(elem: ElementRef) {
    setTimeout(() => {
      elem.nativeElement.scrollIntoView({
        behavior: 'smooth',
      });
    });
  }

  

  static getNullOrValue(val: string) {
    return val === 'null' ? '' : val;
  }

  static formatDate(inputDt: string) {
    const pattern = /(\d{4})(\d{2})(\d{2}).*/;
    const dt = new Date(inputDt.replace(pattern, '$1-$2-$3'));

    return dt.toLocaleString('default', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  static pushToArray(
    arr: NameDescription[],
    label: string,
    data: string,
    extra: string | undefined = undefined,
  ) {
    if (!arr) {
      arr = [];
    }

    if (Utils.getNullOrValue(data)) {
      arr.push({ name: label, description: data, extra });
    }
  }

  static getSequenceNumbers(
    firstNumber: number = 0,
    lastNumber: number,
  ): number[] {
    const numList = [];
    for (let i = firstNumber; i <= lastNumber; i++) {
      numList.push(i);
    }

    return numList;
  }

  static resetValueAndValidation(control: AbstractControl) {
    control.reset();
    control.setErrors(null);
  }



  //Creates Unique Id - Used for Id generation
  static createUniqueId() {
    return Math.floor(Date.now() * Math.random());
  }


  static getYearString(year: number) {
    return year > 1 ? `${year} Years` : `${year} Year`;
  }

  static getMonthString(month: number, suppressZero = false) {
    if (suppressZero && month == 0) return '';
    return month > 1 ? `${month} Months` : `${month} Month`;
  }

  static getSpacedCamelCaseWord(value: string) {
    if (value) {
      return value.replace(/([A-Z])/g, ' $1').trim();
    }

    return null;
  }

  static getPercentage(completed: number, total: number) {
    return (completed / total) * 100;
  }

  static canAccessIframe(elem: ElementRef) {
    try {
      return !!elem.nativeElement.contentDocument;
    } catch (e) {
      return false;
    }
  }

  static inIframe() {
    return window.top !== window.self;
  }

  static isUppercaseAndDigits(input: string): boolean {
    return Utils.regexTest(/^[A-Z0-9]+$/, input);
  }

  static regexTest(regex: RegExp, str: string | null) {
    return regex.test(str || '');
  }

  static verifyUsi(key: string): boolean {
    if (key.length != 10 || !Utils.isUppercaseAndDigits(key)) {
      return false;
    }
    const checkDigit = this.generateCheckCharacter(
      key.toUpperCase().substring(0, 9),
    );
    return key[9] == checkDigit;
  }

  // Implementation of Luhn Mod N algorithm for check digit.
  static generateCheckCharacter(input: string) {
    const validChars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

    var factor = 2;
    var sum = 0;
    var n = validChars.length;
    // Starting from the right and working leftwards is easier since
    // the initial "factor" will always be "2"
    for (var i = input.length - 1; i >= 0; i--) {
      const codePoint = validChars.indexOf(input[i]);
      var addend = factor * codePoint;
      // Alternate the "factor" that each "codePoint" is multiplied by
      factor = factor == 2 ? 1 : 2;

      addend = Math.floor(addend / n) + (addend % n);
      sum += addend;
    }
    // Calculate the number that must be added to the "sum"
    // to make it divisible by "n"

    const remainder = sum % n;
    const checkCodePoint = (n - remainder) % n;

    return validChars.charAt(checkCodePoint);
  }

 

  static toBoolean(val: string) {
    if (!val) {
      return false;
    }

    return Boolean(JSON.parse(val.toLocaleLowerCase()));
  }



  static download(
    body: ArrayBuffer,
    fileName: string,
    type: string | undefined,
  ) {
    const downloadLink = document.createElement('a');
    const blob = new Blob([body], {
      type,
    });

    downloadLink.href = URL.createObjectURL(blob);

    downloadLink.download = fileName;
    downloadLink.click();
  }

  static getWordCount(text: string | undefined | null) {
    return text?.match(/\S+/g)?.length ?? 0;
  }

}
