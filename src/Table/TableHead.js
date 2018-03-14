import React, { Component } from 'react'
import {
  arrayOf,
  bool,
  element,
  func,
  number,
  oneOf,
  oneOfType,
  shape,
  string,
} from 'prop-types'
import {
  equals,
  isNil,
  not,
} from 'ramda'
import classNames from 'classnames'
import shortid from 'shortid'
import Checkbox from '../Checkbox'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UITable')
const isAscending = equals('ascending')

class TableHead extends Component {
  constructor (props) {
    super(props)

    this.checkboxId = shortid.generate()
    this.getOrderIcon = this.getOrderIcon.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.renderColumn = this.renderColumn.bind(this)
    this.validateSelectedColumn = this.validateSelectedColumn.bind(this)
  }

  getOrderIcon (order) {
    const { ascending, descending } = this.props.icons

    if (isAscending(order)) {
      return ascending
    }

    return descending
  }

  handleOrderChange (index) {
    this.props.onOrderChange(index)
  }

  validateSelectedColumn (columnIndex) {
    const {
      onOrderChange,
      orderColumn,
    } = this.props

    return (orderColumn === columnIndex) && not(isNil(onOrderChange))
  }

  renderColumn ({
    orderable,
    isAction,
    title,
  },
  index
  ) {
    const {
      theme,
      order,
      icons,
      disabled,
      onOrderChange,
    } = this.props
    const selected = this.validateSelectedColumn(index)
    const columnClasses = classNames({
      [theme.active]: selected,
      [theme.orderable]: orderable,
      [theme.unselectable]: isAction,
      [theme.disabled]: disabled && orderable,
    })

    if (!orderable || not(onOrderChange)) {
      return (
        <th
          key={`header_column_${index + 1}`}
          className={columnClasses}
        >
          <div className={theme.tableHeadItem}>
            {title}
          </div>
        </th>
      )
    }

    const thProps = disabled || not(onOrderChange) ? {} :
      {
        onClick: () => this.handleOrderChange(index),
      }

    return (
      <th
        key={`column_${index + 1}`}
        className={columnClasses}
        {...thProps}
      >
        <div className={theme.tableHeadItem}>
          <span> {title} </span>
          <span className={theme.unselectable}>
            {
              selected &&
              this.getOrderIcon(order)
            }
            {
              !selected &&
              icons.orderable
            }
          </span>
        </div>
      </th>
    )
  }

  render () {
    const {
      columns,
      disabled,
      expandable,
      onSelect,
      selectable,
      selected,
      theme,
    } = this.props

    return (
      <thead className={theme.tableHead}>
        <tr>
          {
            selectable &&
            <th className={theme.check}>
              <Checkbox
                checked={selected}
                disabled={disabled}
                id={this.checkboxId}
                label=""
                name="all"
                onChange={onSelect}
                value="all"
              />
            </th>
          }
          {columns.map(this.renderColumn)}
          {
            expandable &&
            <th className={theme.open} />
          }
        </tr>
      </thead>
    )
  }
}

TableHead.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    tableHead: string,
    ascending: string,
    descending: string,
    open: string,
    tableHeadItem: string,
    unselectable: string,
    disabled: string,
  }),
  /**
   * Columns which will name the reader cells.
   */
  columns: arrayOf(shape({
    /**
     * It's the path for the cell value in the row object,
     * it's required for orderable columns.
     */
    accessor: oneOfType([
      string,
      arrayOf(string),
    ]),
    /**
     * Identify if it's an action column.
     */
    isAction: bool,
    /**
     * A custom function which will receive the row data object and should return
     * a React element to be rendered in each cell bind to this column.
     */
    renderer: func,
    /**
     * This title is used to identify the column in the header and to identify the
     * column data in the expandable rows.
     */
    title: string.isRequired,
  })).isRequired,
  /**
   * Add an expandable column in the header.
   */
  expandable: bool,
  /**
   * Default icons which illustrate the order.
   */
  icons: shape({
    ascending: element,
    descending: element,
    orderable: element,
  }),
  /**
   * It's called when a orderable column in the header is clicked.
   * @param {int} index - order column index.
   */
  onOrderChange: func,
  /**
   * It's called when the checkbox from the selectable column is checked.
   */
  onSelect: func,
  /**
   * Rows order sequence.
   */
  order: oneOf(['ascending', 'descending']),
  /**
   * Default order column index.
   */
  orderColumn: number.isRequired,
  /**
   * Enables the selectable column.
   */
  selectable: bool,
  /**
   * Selectable column checkbox state.
   */
  selected: bool,
  /**
   * Disablez the click on orderable columns
   */
  disabled: bool,
}

TableHead.defaultProps = {
  expandable: false,
  icons: {},
  onOrderChange: null,
  onSelect: null,
  order: 'ascending',
  selectable: false,
  selected: false,
  theme: {},
  disabled: false,
}

export default consumeTheme(TableHead)
