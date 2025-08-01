// import helper from '../helper';

// Было до правок ИИ: простая история без метаданных
// export default class History {
//   constructor() {
//     this.undoItems = [];
//     this.redoItems = [];
//   }
//   add(data) {
//     this.undoItems.push(JSON.stringify(data));
//     this.redoItems = [];
//   }
//   undo(data, cb) {
//     const { undoItems, redoItems } = this;
//     if (undoItems.length > 0) {
//       redoItems.push(JSON.stringify(data));
//       cb(JSON.parse(undoItems.pop()));
//     }
//   }
//   redo(data, cb) {
//     const { undoItems, redoItems } = this;
//     if (redoItems.length > 0) {
//       undoItems.push(JSON.stringify(data));
//       cb(JSON.parse(redoItems.pop()));
//     }
//   }
// }

// С правками от ИИ: история с метаданными
export default class History {
  constructor() {
    this.undoItems = [];
    this.redoItems = [];
  }

  canUndo() {
    return this.undoItems.length > 0;
  }

  canRedo() {
    return this.redoItems.length > 0;
  }

  add(data, changeRange = null) {
    // gpt fix
    const serializedData = JSON.stringify(data);

    // GPT fix: Проверяем, не добавляем ли мы одинаковое состояние
    if (this.undoItems.length > 0 && this.undoItems[this.undoItems.length - 1].data === serializedData) {
      return; // Не добавляем дублирующееся состояние
    }

    this.undoItems.push({
      data: serializedData,
      changeRange
    });
    this.redoItems = [];
  }

  undo(data, cb) {
    const { undoItems, redoItems } = this;
    if (undoItems.length > 0) {
      const undoItem = undoItems.pop();

      // Было до правок ИИ: сохраняли с changeRange: null
      // redoItems.push({
      //   data: JSON.stringify(data),
      //   changeRange: null
      // });

      // С правками от ИИ: сохраняем текущий changeRange для redo
      redoItems.push({
        data: JSON.stringify(data),
        changeRange: undoItem.changeRange
      });

      cb(JSON.parse(undoItem.data), undoItem.changeRange);
    }
  }

  redo(data, cb) {
    const { undoItems, redoItems } = this;
    if (redoItems.length > 0) {
      const redoItem = redoItems.pop();

      // Было до правок ИИ: сохраняли с changeRange: null
      // undoItems.push({
      //   data: JSON.stringify(data),
      //   changeRange: null
      // });

      // С правками от ИИ: сохраняем текущий changeRange для undo
      undoItems.push({
        data: JSON.stringify(data),
        changeRange: redoItem.changeRange
      });

      cb(JSON.parse(redoItem.data), redoItem.changeRange);
    }
  }
}
