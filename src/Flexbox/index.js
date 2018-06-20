import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIFlexbox')

const Flexbox = ({
  alignItems,
  children,
  className,
  direction,
  justifyContent,
  theme,
}) => (
  <div className={classNames(theme.flexbox, className, {
      [theme.around]: justifyContent === 'space-around',
      [theme.baseline]: alignItems === 'baseline',
      [theme.between]: justifyContent === 'space-between',
      [theme.bottom]: alignItems === 'flex-end',
      [theme.center]: justifyContent === 'center',
      [theme.column]: direction === 'column',
      [theme.columnReverse]: direction === 'column-reverse',
      [theme.end]: justifyContent === 'flex-end',
      [theme.evenly]: justifyContent === 'space-evenly',
      [theme.middle]: alignItems === 'center',
      [theme.row]: direction === 'row',
      [theme.rowReverse]: direction === 'row-reverse',
      [theme.start]: justifyContent === 'flex-start',
      [theme.stretch]: alignItems === 'stretch',
      [theme.top]: alignItems === 'flex-start',
    })}
  >
    {children}
  </div>
)

Flexbox.propTypes = {
  /**
   * The align-items props
   */
  alignItems: PropTypes.oneOf([
    'baseline',
    'center',
    'flex-end',
    'flex-start',
    'stretch',
  ]),
  /**
   * Children can be any html node.
   */
  children: PropTypes.node.isRequired,
  /**
   * ClassName can be used to attach your own styles.
   */
  className: PropTypes.string,
  /**
   * Control how elements will be rendered by Flexbox.
   */
  direction: PropTypes.oneOf([
    'column-reverse',
    'column',
    'row-reverse',
    'row',
  ]),
  /**
   * How childrens will be distribuited.
   */
  justifyContent: PropTypes.oneOf([
    'center',
    'flex-end',
    'flex-start',
    'space-around',
    'space-between',
    'space-evenly',
  ]),
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    around: PropTypes.string,
    baseline: PropTypes.string,
    between: PropTypes.string,
    bottom: PropTypes.string,
    center: PropTypes.string,
    column: PropTypes.string,
    columnReverse: PropTypes.string,
    end: PropTypes.string,
    evenly: PropTypes.string,
    flexbox: PropTypes.string,
    middle: PropTypes.string,
    row: PropTypes.string,
    rowReverse: PropTypes.string,
    start: PropTypes.string,
    stretch: PropTypes.string,
    top: PropTypes.string,
  }),
}

Flexbox.defaultProps = {
  alignItems: 'flex-start',
  className: null,
  direction: 'row',
  justifyContent: 'flex-start',
  theme: {},
}

export default consumeTheme(Flexbox)
