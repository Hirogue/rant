import { isArray, isObject } from 'lodash';
import Excel from 'exceljs';

export const ExcelHandleType = {
  KV: 0,
  ARRAY: 1,
};

export class ExcelHelper {
  static async loadFromFile(filePath) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(filePath);

    return await ExcelHelper.load(workbook);
  }

  static async loadFromBuffer(buffer) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.load(buffer);

    return await ExcelHelper.load(workbook);
  }

  static async load(workbook) {
    const list = [];

    workbook.eachSheet(worksheet => {
      let keys = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          const val = {};
          row.eachCell((cell, cellNumber) => {
            val[keys[cellNumber]] = cell.value;
          });
          list.push(val);
        } else {
          keys = row.values;
        }
      });
    });

    return list;
  }

  static async import(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        resolve(ExcelHelper.loadFromBuffer(reader.result));
      };
      reader.onerror = err => {
        reject(err);
      };
    });
  }

  static async export(dataSource, columns, fileName) {
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet(fileName);

    const rows = dataSource.map(item => {
      const row = {};

      columns.forEach(col => {
        const val = item[col.dataIndex];

        if (col.render) {
          const res = col.render(val, item);
          if (!isObject(res)) {
            row[col.dataIndex] = res;
          } else {
            row[col.dataIndex] = col.rawRender ? col.rawRender(val, item) : val;
          }
        } else {
          row[col.dataIndex] = val ? val : ExcelHelper.deepPropety(col.dataIndex, item);
        }
      });

      return row;
    });

    sheet.columns = columns;
    sheet.addRows(rows);

    ExcelHelper.downloadBuffer(await workbook.xlsx.writeBuffer(), fileName);
  }

  static deepPropety(path, target) {
    if (!target) return null;

    const props = path.split('.');

    for (let i = 0; i < props.length; i++) {
      target = target[props[i]];
    }

    return target;
  }

  static downloadBuffer(buffer, fileName) {
    const download = document.createElement('a');
    download.href = window.URL.createObjectURL(
      new Blob([buffer], { type: 'application/vnd.ms-excel' }),
    );
    download.download = fileName;
    download.click();
    window.URL.revokeObjectURL(download.href);
  }
}
