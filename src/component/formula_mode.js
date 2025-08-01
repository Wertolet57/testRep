import { h } from './element';
import { cssPrefix } from '../config';
import { xy2expr } from '../core/alphabet';

// Цвета для выделения ячеек в режиме формул
const HIGHLIGHT_COLORS = [
  '#4285f4', // синий
  '#ea4335', // красный  
  '#34a853', // зеленый
  '#fbbc04', // желтый
  '#9c27b0', // фиолетовый
  '#ff9800', // оранжевый
  '#795548', // коричневый
  '#607d8b'  // серо-синий
];

export default class FormulaMode {
  constructor(sheet, editor, selector) {
    this.sheet = sheet;
    this.editor = editor;
    this.selector = selector;
    this.data = sheet.data;
    
    // Состояние режима формул
    this.active = false;
    this.currentFormula = '';
    this.highlightedCells = [];
    this.colorIndex = 0;
    
    // Элементы для визуального выделения
    this.highlightElements = [];
    this.containerEl = h('div', `${cssPrefix}-formula-highlights`);
    
    // Добавляем контейнер для выделений в sheet
    // Контейнер будет добавлен позже в Sheet после создания overlayerCEl
  }

  /**
   * Активировать режим ввода формул
   */
  activate() {
    if (this.active) return;
    
    this.active = true;
    this.currentFormula = '=';
    this.highlightedCells = [];
    this.colorIndex = 0;
    
    // Показываем контейнер для выделений
    this.containerEl.show();
    
    console.log('Formula mode activated');
  }

  /**
   * Деактивировать режим ввода формул
   */
  deactivate() {
    if (!this.active) return;
    
    this.active = false;
    this.currentFormula = '';
    this.clearHighlights();
    
    // Скрываем контейнер для выделений
    this.containerEl.hide();
    
    console.log('Formula mode deactivated');
  }

  /**
   * Проверить активность режима
   */
  isActive() {
    return this.active;
  }

  /**
   * Добавить ссылку на ячейку в формулу
   */
  addCellReference(ri, ci) {
    if (!this.active) return;
    
    const cellRef = xy2expr(ci, ri);
    const color = HIGHLIGHT_COLORS[this.colorIndex % HIGHLIGHT_COLORS.length];
    
    // Добавляем ссылку в формулу
    this.currentFormula += cellRef;
    
    // Выделяем ячейку
    this.highlightCell(ri, ci, color);
    
    // Обновляем текст в редакторе
    this.editor.setText(this.currentFormula);
    
    // Переходим к следующему цвету
    this.colorIndex++;
    
    console.log(`Added cell reference: ${cellRef}, formula: ${this.currentFormula}`);
  }

  /**
   * Добавить ссылку на диапазон ячеек в формулу
   */
  addRangeReference(range) {
    if (!this.active) return;
    
    const { sri, sci, eri, eci } = range;
    const startRef = xy2expr(sci, sri);
    const endRef = xy2expr(eci, eri);
    const rangeRef = `${startRef}:${endRef}`;
    const color = HIGHLIGHT_COLORS[this.colorIndex % HIGHLIGHT_COLORS.length];
    
    // Добавляем ссылку в формулу
    this.currentFormula += rangeRef;
    
    // Выделяем диапазон
    this.highlightRange(range, color);
    
    // Обновляем текст в редакторе
    this.editor.setText(this.currentFormula);
    
    // Переходим к следующему цвету
    this.colorIndex++;
    
    console.log(`Added range reference: ${rangeRef}, formula: ${this.currentFormula}`);
  }

  /**
   * Выделить ячейку цветной рамкой
   */
  highlightCell(ri, ci, color) {
    // Используем правильный метод для получения координат ячейки
    const cellRect = this.data.getRect({
      sri: ri, sci: ci, eri: ri, eci: ci
    });
    
    this.createHighlightElement(cellRect, color, `${ri}_${ci}`);
  }

  /**
   * Выделить диапазон ячеек цветной рамкой
   */
  highlightRange(range, color) {
    const rect = this.data.getRect(range);
    const rangeId = `${range.sri}_${range.sci}_${range.eri}_${range.eci}`;
    
    this.createHighlightElement(rect, color, rangeId);
  }

  /**
   * Создать элемент выделения
   */
  createHighlightElement(rect, color, id) {
    const highlightEl = h('div', `${cssPrefix}-formula-highlight`)
      .css({
        position: 'absolute',
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width - 2}px`,
        height: `${rect.height - 2}px`,
        border: `2px solid ${color}`,
        'pointer-events': 'none',
        'z-index': '1000',
        'box-sizing': 'border-box'
      });
    
    this.containerEl.child(highlightEl);
    this.highlightElements.push({ el: highlightEl, id, color });
    
    // Сохраняем информацию о выделенной ячейке/диапазоне
    this.highlightedCells.push({ id, color, rect });
  }

  /**
   * Очистить все выделения
   */
  clearHighlights() {
    this.highlightElements.forEach(({ el }) => {
      el.remove();
    });
    
    this.highlightElements = [];
    this.highlightedCells = [];
    this.containerEl.html('');
  }

  /**
   * Обновить позиции выделений при скролле
   */
  updateHighlights() {
    if (!this.active || this.highlightedCells.length === 0) return;
    
    // Пересчитываем позиции всех выделений
    this.highlightElements.forEach(({ el, id }, index) => {
      const highlightInfo = this.highlightedCells[index];
      if (highlightInfo) {
        // Здесь можно добавить логику пересчета позиций при скролле
        // Пока оставляем как есть
      }
    });
  }

  /**
   * Обработать ввод символа в формулу
   */
  handleInput(char) {
    if (!this.active) return;
    
    this.currentFormula += char;
    console.log(`Formula input: ${this.currentFormula}`);
  }

  /**
   * Получить текущую формулу
   */
  getCurrentFormula() {
    return this.currentFormula;
  }

  /**
   * Установить текущую формулу
   */
  setCurrentFormula(formula) {
    this.currentFormula = formula;
  }
}