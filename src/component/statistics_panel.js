import { h } from './element';
import { cssPrefix } from '../config';

export default class StatisticsPanel {
  constructor(container) {
    this.container = container;
    this.visible = false;

    this.el = h('div', `${cssPrefix}-statistics-panel`)
      .css({
        position: 'fixed',
        bottom: '0',
        right: '0',
        background: '#f8f9fa',
        border: '1px solid #dadce0',
        'border-radius': '4px 4px 0 0',
        padding: '8px 12px',
        'font-size': '12px',
        color: '#5f6368',
        'z-index': '1000',
        display: 'none',
        'white-space': 'nowrap',
        'box-shadow': '0 -2px 10px rgba(0,0,0,0.1)'
      });

    // Добавляем панель в контейнер
    if (container) {
      container.child(this.el);
    }
  }

  /**
   * Показать панель со статистикой
   */
  show(statistics) {
    if (!statistics) return;

    this.updateContent(statistics);
    this.el.css('display', 'flex');
    this.visible = true;
  }

  /**
   * Скрыть панель
   */
  hide() {
    this.el.css('display', 'none');
    this.visible = false;
  }

  /**
   * Обновить статистику
   */
  update(range, data) {
    if (!range || !data) {
      this.hide();
      return;
    }

    const statistics = this.calculateStats(range, data);
    // Показываем панель если есть хотя бы одна непустая ячейка
    if (statistics.nonEmptyCount > 0) {
      this.show(statistics);
    } else {
      this.hide();
    }
  }

  /**
   * Вычислить статистику для диапазона ячеек
   */
  calculateStats(range, data) {
    const { sri, sci, eri, eci } = range;
    const stats = {
      count: 0,
      sum: 0,
      average: 0,
      nonEmptyCount: 0,
      totalCells: 0,
      numericCells: [],
      textCells: [],
      dateCells: [],
      hasOnlyNumbers: true
    };

    // Проходим по всем ячейкам в диапазоне
    for (let ri = sri; ri <= eri; ri++) {
      for (let ci = sci; ci <= eci; ci++) {
        stats.totalCells++;

        const cell = data.getCell(ri, ci);
        if (cell && cell.text !== undefined && cell.text !== null && cell.text !== '') {
          stats.nonEmptyCount++;

          // Простая проверка на число
          const numValue = parseFloat(String(cell.text));
          if (!isNaN(numValue) && isFinite(numValue)) {
            stats.numericCells.push(numValue);
            stats.sum += numValue;
          } else {
            stats.textCells.push(cell.text);
            stats.hasOnlyNumbers = false;
          }
        }
      }
    }

    // Вычисляем количество и среднее для числовых значений
    stats.count = stats.numericCells.length;

    // Среднее показываем только если все непустые ячейки содержат числа
    if (stats.count > 0 && stats.hasOnlyNumbers && stats.count === stats.nonEmptyCount) {
      stats.average = stats.sum / stats.count;
    } else {
      stats.average = null; // Не показываем среднее для смешанных данных
    }

    return stats;
  }



  /**
   * Обновить содержимое панели
   */
  updateContent(statistics) {
    const items = [];

    // Показываем количество выделенных ячеек
    if (statistics.totalCells > 1) {
      items.push(`${statistics.totalCells} ячеек`);
    }

    // Проверяем, смешанные ли данные
    const hasMultipleTypes = (
      (statistics.count > 0 ? 1 : 0) +
      (statistics.textCells.length > 0 ? 1 : 0) +
      (statistics.dateCells.length > 0 ? 1 : 0)
    ) > 1;

    if (hasMultipleTypes) {
      // Для смешанных данных показываем только общую статистику
      items.push(`Непустых: ${statistics.nonEmptyCount}`);
      if (statistics.totalCells > statistics.nonEmptyCount) {
        items.push(`Пустых: ${statistics.totalCells - statistics.nonEmptyCount}`);
      }
    } else {
      // Для однородных данных показываем детальную статистику
      if (statistics.count > 0 && statistics.dateCells.length === 0 && statistics.textCells.length === 0) {
        // Только числа
        items.push(`Сумма: ${this.formatNumber(statistics.sum)}`);
        if (statistics.count > 1) {
          items.push(`Среднее: ${this.formatNumber(statistics.average)}`);
        }
      } else if (statistics.dateCells.length > 0 && statistics.count === 0 && statistics.textCells.length === 0) {
        // Только даты
        items.push(`Дат: ${statistics.dateCells.length}`);
      } else if (statistics.textCells.length > 0 && statistics.count === 0 && statistics.dateCells.length === 0) {
        // Только текст
        items.push(`Непустых: ${statistics.nonEmptyCount}`);
      }
    }

    // Обновляем содержимое
    this.el.html('');
    items.forEach((item, index) => {
      if (index > 0) {
        this.el.child(h('span', '').css({
          margin: '0 8px',
          color: '#dadce0'
        }).html('|'));
      }
      this.el.child(h('span', `${cssPrefix}-stats-item`).html(item));
    });
  }

  /**
   * Форматировать число для отображения
   */
  formatNumber(num) {
    if (Math.abs(num) >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (Math.abs(num) >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else if (num % 1 === 0) {
      return num.toString();
    } else {
      return num.toFixed(2);
    }
  }

  /**
   * Проверить, видна ли панель
   */
  isVisible() {
    return this.visible;
  }
}