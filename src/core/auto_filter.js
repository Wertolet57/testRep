import { CellRange } from './cell_range';
// operator: all|eq|neq|gt|gte|lt|lte|in|be
// value:
//   in => []
//   be => [min, max]
const column = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ', 'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BK', 'BL', 'BM', 'BN', 'BO', 'BP', 'BQ', 'BR', 'BS', 'BT', 'BU', 'BV', 'BW', 'BX', 'BY', 'BZ', 'CA', 'CB', 'CC', 'CD', 'CE', 'CF', 'CG', 'CH', 'CI', 'CJ', 'CK', 'CL', 'CM', 'CN', 'CO', 'CP', 'CQ', 'CR', 'CS', 'CT', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DA', 'DB', 'DC', 'DD', 'DE', 'DF', 'DG', 'DH', 'DI', 'DJ', 'DK', 'DL', 'DM', 'DN', 'DO', 'DP', 'DQ', 'DR', 'DS', 'DT', 'DU', 'DV', 'DW', 'DX', 'DY', 'DZ', 'EA', 'EB', 'EC', 'ED', 'EE', 'EF', 'EG', 'EH', 'EI', 'EJ', 'EK', 'EL', 'EM', 'EN', 'EO', 'EP', 'EQ', 'ER', 'ES', 'ET', 'EU', 'EV', 'EW', 'EX', 'EY', 'EZ', 'FA', 'FB', 'FC', 'FD', 'FE', 'FF', 'FG', 'FH', 'FI', 'FJ', 'FK', 'FL', 'FM', 'FN', 'FO', 'FP', 'FQ', 'FR', 'FS', 'FT', 'FU', 'FV', 'FW', 'FX', 'FY', 'FZ', 'GA', 'GB', 'GC', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GJ', 'GK', 'GL', 'GM', 'GN', 'GO', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GV', 'GW', 'GX', 'GY', 'GZ', 'HA', 'HB', 'HC', 'HD', 'HE', 'HF', 'HG', 'HH', 'HI', 'HJ', 'HK', 'HL', 'HM', 'HN', 'HO', 'HP', 'HQ', 'HR', 'HS', 'HT', 'HU', 'HV', 'HW', 'HX', 'HY', 'HZ', 'IA', 'IB', 'IC', 'ID', 'IE', 'IF', 'IG', 'IH', 'II', 'IJ', 'IK', 'IL', 'IM', 'IN', 'IO', 'IP', 'IQ', 'IR', 'IS', 'IT', 'IU', 'IV', 'IW', 'IX', 'IY', 'IZ', 'JA', 'JB', 'JC', 'JD', 'JE', 'JF', 'JG', 'JH', 'JI', 'JJ', 'JK', 'JL', 'JM', 'JN', 'JO', 'JP', 'JQ', 'JR', 'JS', 'JT', 'JU', 'JV', 'JW', 'JX', 'JY', 'JZ', 'KA', 'KB', 'KC', 'KD', 'KE', 'KF', 'KG', 'KH', 'KI', 'KJ', 'KK', 'KL', 'KM', 'KN', 'KO', 'KP', 'KQ', 'KR', 'KS', 'KT', 'KU', 'KV', 'KW', 'KX', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LD', 'LE', 'LF', 'LG', 'LH', 'LI', 'LJ', 'LK', 'LL', 'LM', 'LN', 'LO', 'LP', 'LQ', 'LR', 'LS', 'LT', 'LU', 'LV', 'LW', 'LX', 'LY', 'LZ', 'MA', 'MB', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MI', 'MJ', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NB', 'NC', 'ND', 'NE', 'NF', 'NG', 'NH', 'NI', 'NJ', 'NK', 'NL', 'NM', 'NN', 'NO', 'NP', 'NQ', 'NR', 'NS', 'NT', 'NU', 'NV', 'NW', 'NX', 'NY', 'NZ', 'OA', 'OB', 'OC', 'OD', 'OE', 'OF', 'OG', 'OH', 'OI', 'OJ', 'OK', 'OL', 'OM', 'ON', 'OO', 'OP', 'OQ', 'OR', 'OS', 'OT', 'OU', 'OV', 'OW', 'OX', 'OY', 'OZ', 'PA', 'PB', 'PC', 'PD', 'PE', 'PF', 'PG', 'PH', 'PI', 'PJ', 'PK', 'PL', 'PM', 'PN', 'PO', 'PP', 'PQ', 'PR', 'PS', 'PT', 'PU', 'PV', 'PW', 'PX', 'PY', 'PZ', 'QA', 'QB', 'QC', 'QD', 'QE', 'QF', 'QG', 'QH', 'QI', 'QJ', 'QK', 'QL', 'QM', 'QN', 'QO', 'QP', 'QQ', 'QR', 'QS', 'QT', 'QU', 'QV', 'QW', 'QX', 'QY', 'QZ', 'RA', 'RB', 'RC', 'RD', 'RE', 'RF', 'RG', 'RH', 'RI', 'RJ', 'RK', 'RL', 'RM', 'RN', 'RO', 'RP', 'RQ', 'RR', 'RS', 'RT', 'RU', 'RV', 'RW', 'RX', 'RY', 'RZ', 'SA', 'SB', 'SC', 'SD', 'SE', 'SF', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SP', 'SQ', 'SR', 'SS', 'ST', 'SU', 'SV', 'SW', 'SX', 'SY', 'SZ', 'TA', 'TB', 'TC', 'TD', 'TE', 'TF', 'TG', 'TH', 'TI', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TP', 'TQ', 'TR', 'TS', 'TT', 'TU', 'TV', 'TW', 'TX', 'TY', 'TZ', 'UA', 'UB', 'UC', 'UD', 'UE', 'UF', 'UG', 'UH', 'UI', 'UJ', 'UK', 'UL', 'UM', 'UN', 'UO', 'UP', 'UQ', 'UR', 'US', 'UT', 'UU', 'UV', 'UW', 'UX', 'UY', 'UZ', 'VA', 'VB', 'VC', 'VD', 'VE', 'VF', 'VG', 'VH', 'VI', 'VJ', 'VK', 'VL', 'VM', 'VN', 'VO', 'VP', 'VQ', 'VR', 'VS', 'VT', 'VU', 'VV', 'VW', 'VX', 'VY', 'VZ', 'WA', 'WB', 'WC', 'WD', 'WE', 'WF', 'WG', 'WH', 'WI', 'WJ', 'WK', 'WL', 'WM', 'WN', 'WO', 'WP', 'WQ'];


class Filter {
    constructor(ci, operator, value) {
        this.ci = ci;
        this.operator = operator;
        this.value = value;
    }

    set(operator, value) {
        this.operator = operator;
        this.value = value;
    }

    includes(v) {
        const { operator, value } = this;
        if (operator === 'all') {
            return true;
        }
        if (operator === 'in') {
            return value.includes(v);
        }
        // For all other operators, empty cells don't match.
        // v is a string from cell.text
        if (v === '' || v === null) {
            return false;
        }

        const vNum = Number(v);

        // Numeric operators (gt, lt, etc.)
        if (['gt', 'gte', 'lt', 'lte', 'be'].includes(operator)) {
            if (Number.isNaN(vNum)) return false; // Non-numeric cells can't match
            if (operator === 'gt') return vNum > Number(value);
            if (operator === 'gte') return vNum >= Number(value);
            if (operator === 'lt') return vNum < Number(value);
            if (operator === 'lte') return vNum <= Number(value);
            if (operator === 'be') { // between
                const [min, max] = value;
                return vNum >= Number(min) && vNum <= Number(max);
            }
        }

        // Equality operators (eq, neq)
        if (operator === 'eq' || operator === 'neq') {
            const valueNum = Number(value);
            const result = !Number.isNaN(vNum) && !Number.isNaN(valueNum) ? (vNum === valueNum) : (v === String(value));
            return operator === 'neq' ? !result : result;
        }
        return false;
    }

    vlength() {
        const { operator, value } = this;
        if (operator === 'in') {
            return value.length;
        }
        return 0;
    }

    getData() {
        const { ci, operator, value } = this;
        return { ci, operator, value };
    }
}

class Sort {
    constructor(ci, order) {
        this.ci = ci;
        this.order = order;
    }

    asc() {
        return this.order === 'asc';
    }

    desc() {
        return this.order === 'desc';
    }
}

export default class AutoFilter {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.ref = null;
        this.filters = [];
        this.sort = null;
        this.filterHistory = []; // Stack to store filter history for undo functionality
    }

    setData({ ref, filters, sort }) {
        if (ref != null) {
            this.ref = ref;
            this.filters = filters.map(it => new Filter(it.ci, it.operator, it.value));
            if (sort) {
                this.sort = new Sort(sort.ci, sort.order);
            }
        }
    }

    getData() {
        if (this.active()) {
            this.ref = "A1:" + column[this.cols - 1] + (this.rows - 1);
            let { ref, filters, sort } = this;
            return { ref, filters: filters.map(it => it.getData()), sort };
        }
        return {};
    }

    addFilter(ci, operator, value) {
        // Save current state to history before making changes
        this.saveToHistory();
        
        const idx = this.filters.findIndex(it => it.ci === ci);
        // The condition for removing a filter is that it is an 'in' type filter with an empty value array
        const toRemove = operator === 'in' && Array.isArray(value) && value.length === 0;

        if (idx > -1) {
            if (toRemove) {
                this.filters.splice(idx, 1);
            } else {
                this.filters[idx].set(operator, value);
            }
        } else if (!toRemove) {
            this.filters.push(new Filter(ci, operator, value));
        }
    }

    // Save current filter state to history
    saveToHistory() {
        const currentState = {
            filters: this.filters.map(f => ({ ci: f.ci, operator: f.operator, value: [...f.value] })),
            sort: this.sort ? { ci: this.sort.ci, order: this.sort.order } : null,
            timestamp: Date.now()
        };
        this.filterHistory.push(currentState);
        
        // Limit history to last 10 states to prevent memory issues
        if (this.filterHistory.length > 10) {
            this.filterHistory.shift();
        }
    }

    // Undo last filter change
    undoLastFilter() {
        if (this.filterHistory.length === 0) {
            return false; // No history to undo
        }
        
        const previousState = this.filterHistory.pop();
        
        // Restore previous state without saving to history (to avoid infinite loop)
        this.filters = previousState.filters.map(f => new Filter(f.ci, f.operator, f.value));
        this.sort = previousState.sort ? new Sort(previousState.sort.ci, previousState.sort.order) : null;
        
        return true; // Successfully undone
    }

    // Reset all filters to initial state
    resetAllFilters() {
        // Save current state before reset
        this.saveToHistory();
        
        this.filters = [];
        this.sort = null;
        return true;
    }

    // Check if there's history to undo
    canUndo() {
        return this.filterHistory.length > 0;
    }

    // Get history info for UI
    getHistoryInfo() {
        return {
            canUndo: this.canUndo(),
            historyLength: this.filterHistory.length,
            lastAction: this.filterHistory.length > 0 ? this.filterHistory[this.filterHistory.length - 1] : null
        };
    }

    setSort(ci, order) {
        this.sort = order ? new Sort(ci, order) : null;
    }

    includes(ri, ci) {
        if (this.active()) {
            return this.hrange().includes(ri, ci);
        }
        return false;
    }

    getSort(ci) {
        const { sort } = this;
        if (sort && sort.ci === ci) {
            return sort;
        }
        return null;
    }

    getFilter(ci) {
        const { filters } = this;
        for (let i = 0; i < filters.length; i += 1) {
            if (filters[i].ci === ci) {
                return filters[i];
            }
        }
        return null;
    }

    filteredRows(getCell) {
        const rset = new Set();
        const fset = new Set();

        if (this.active()) {
            // Don't rely on this.range() as it may be limited by initial rows/cols values
            // Start from row 1 (first data row after header row 0)
            const sri = 0; // Header row is 0, so data starts from 1
            const { filters } = this;

            // Scan complete data range instead of just filter reference range
            // Start from sri + 1 (first data row after header) and scan until we find actual data end
            // Use a reasonable upper limit to avoid infinite loops
            const maxRows = 50000; // Scan up to 50000 rows to find all data
            let emptyRowCount = 0;
            const maxEmptyRows = 5000; // Stop after 5000 consecutive empty rows

            for (let ri = sri + 1; ri < maxRows; ri += 1) {
                // Check if this row has any data by sampling a few columns
                let rowHasData = false;
                for (let checkCi = 0; checkCi < Math.min(this.cols, 10); checkCi++) {
                    const checkCell = getCell(ri, checkCi);
                    if (checkCell && checkCell.text && !/^\s*$/.test(checkCell.text)) {
                        rowHasData = true;
                        break;
                    }
                }

                // If row is completely empty, increment empty counter
                if (!rowHasData) {
                    emptyRowCount++;
                    if (emptyRowCount >= maxEmptyRows) {
                        break; // Stop scanning after many consecutive empty rows
                    }
                    continue;
                } else {
                    emptyRowCount = 0; // Reset counter when we find data
                }

                let passed = true;
                for (const filter of filters) {
                    const cell = getCell(ri, filter.ci);
                    const cellText = (cell && cell.text) ? cell.text : '';
                    if (!filter.includes(cellText)) {
                        passed = false;
                        break;
                    }
                }

                if (passed) {
                    fset.add(ri);
                } else {
                    rset.add(ri);
                }
            }
        }
        return { rset, fset };
    }

    items(ci, getCell, exceptRowSet = new Set()) {
        const m = {};

        if (this.active()) {
            // Don't rely on this.range() as it may be limited by initial rows/cols values
            // Start from row 1 (first data row after header row 0) and scan until we find actual data end
            // Don't use otherFilters - we want ALL possible values for this column

            // Use a reasonable upper limit to avoid infinite loops
            const maxRows = 50000; // Scan up to 50000 rows to find all data
            let emptyRowCount = 0;
            const maxEmptyRows = 100; // Stop after 100 consecutive empty rows

            for (let ri = 1; ri < maxRows; ri += 1) {
                // Skip rows that are already filtered out
                if (exceptRowSet.has(ri)) continue;

                // Check if this row has any data in the target column
                const cell = getCell(ri, ci);
                const hasData = cell !== null && cell.text && !/^\s*$/.test(cell.text);

                // If no data in target column, check if row is completely empty
                if (!hasData) {
                    // Check if entire row is empty by sampling a few columns
                    let rowIsEmpty = true;
                    for (let checkCi = 0; checkCi < Math.min(this.cols, 10); checkCi++) {
                        const checkCell = getCell(ri, checkCi);
                        if (checkCell && checkCell.text && !/^\s*$/.test(checkCell.text)) {
                            rowIsEmpty = false;
                            break;
                        }
                    }

                    if (rowIsEmpty) {
                        emptyRowCount++;
                        if (emptyRowCount >= maxEmptyRows) {
                            break; // Stop scanning after many consecutive empty rows
                        }
                        continue;
                    } else {
                        emptyRowCount = 0; // Reset counter if row has data in other columns
                        // Add empty value to filter options if row has data in other columns but not in this column
                        m[''] = (m[''] || 0) + 1;
                    }
                } else {
                    // Add non-empty values to filter dropdown
                    const key = cell.text;
                    m[key] = (m[key] || 0) + 1;
                    emptyRowCount = 0; // Reset counter when we find data
                }
            }
        }
        return m;
    }

    range() {
        return CellRange.valueOf(this.ref);
    }

    hrange() {
        const r = this.range();
        r.eri = r.sri;
        return r;
    }

    clear() {
        this.ref = null;
        this.filters = [];
        this.sort = null;
    }

    active() {
        return this.ref !== null;
    }
}
