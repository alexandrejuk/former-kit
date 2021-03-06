import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const ConsumeTheme = ThemeConsumer('UITooltip')

class Tooltip extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: props.visible,
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  componentWillReceiveProps ({ visible }) {
    this.setState({
      visible,
    })
  }

  handleMouseEnter () {
    if (!this.props.onMouseEnter) {
      this.setState({
        visible: true,
      })
    }

    this.props.onMouseEnter()
  }

  handleMouseLeave () {
    if (!this.props.onMouseLeave) {
      this.setState({
        visible: false,
      })
    }

    this.props.onMouseLeave()
  }

  render () {
    const {
      children,
      content,
      placement,
      theme,
    } = this.props

    const { visible } = this.state

    return (
      <div
        className={theme.target}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        { children }

        {visible &&
          <div
            className={classNames(theme.tooltip, theme[placement])}
            role="tooltip"
          >
            {content}
          </div>
        }
      </div>
    )
  }
}

Tooltip.propTypes = {
  /**
   * The children can be any kind of component.
   */
  children: PropTypes.node.isRequired,
  /**
   * The content is used to tooltip and can be any kind of component.
   */
  content: PropTypes.node.isRequired,
  /**
   * onMouseEnter callback.
   */
  onMouseEnter: PropTypes.func,
  /**
   * onMouseLeave callback.
   */
  onMouseLeave: PropTypes.func,
  /**
   * The position you want to render the tooltip when it's visible.
   */
  placement: PropTypes.string,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    bottomCenter: PropTypes.string,
    bottomEnd: PropTypes.string,
    bottomStart: PropTypes.string,
    leftEnd: PropTypes.string,
    leftMiddle: PropTypes.string,
    leftStart: PropTypes.string,
    rightEnd: PropTypes.string,
    rightMiddle: PropTypes.string,
    rightStart: PropTypes.string,
    target: PropTypes.string,
    tooltip: PropTypes.string,
    topCenter: PropTypes.string,
    topEnd: PropTypes.string,
    topStart: PropTypes.string,
  }),
  /**
   * This props mean the tooltip is visible.
   */
  visible: PropTypes.bool,
}

Tooltip.defaultProps = {
  onMouseEnter: null,
  onMouseLeave: null,
  placement: 'leftMiddle',
  theme: {},
  visible: false,
}

export default ConsumeTheme(Tooltip)
