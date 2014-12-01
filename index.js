var React = require('react');

var TangleTextCompat = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.number.isRequired,

    onFocus: React.PropTypes.func,
    format: React.PropTypes.func,

    popoverKey: React.PropTypes.string,
    className: React.PropTypes.string,

    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    metaStep: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      min: -Infinity,
      max: Infinity,
      step: 1,
      className: 'react-tangle-input',
      format: function(x) { return x; },
      onFocus: function(x) { }
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({ value: nextProps.value });
  },
  getInitialState: function() {
    return {
      value: this.props.value,
      step: this.props.step
    };
  },
  bounds: function(num) {
    num = Math.max(num, this.props.min);
    num = Math.min(num, this.props.max);
    return num;
  },
  onChange: function(e) {
    this.setState({ value: e.target.value });
    var parsed = parseFloat(e.target.value);
    if (!isNaN(parsed)) {
      this.props.onChange(parsed);
    }
  },
  onBlur: function(e) {
    var parsed = parseFloat(this.state.value);
    if (isNaN(parsed)) {
      this.setState({ value: this.props.value });
    } else {
      this.props.onChange(this.bounds(parsed));
      this.setState({ value: this.bounds(parsed) });
    }
  },
  onKeyDown: function(e) {
    if (e.which == 13) {
      // ENTER
      this.onBlur(e);
      e.target.blur();
    } else if (e.which == 16) {
      // SHIFT + arrows
      this.setState({ step: this.props.metaStep || 10 * this.props.step });
    }
  },
  onKeyUp: function(e) {
    if (e.which == 16) {
      // Reset to default step
      this.setState({ step: this.props.step });
    } else if (e.which == 38 || e.which == 40) {
      // Constrain arrow up/down to bounds
      this.onBlur();
    }
  },
  render: function() {
    /* jshint ignore:start */
    return (
      <div>
        <input
          className={this.props.className}
          disabled={this.props.disabled}
          type='number'
          step={this.state.step}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          onFocus={this.props.onFocus}
          onBlur={this.onBlur}
          data-popover={this.props.popoverKey}
          value={this.props.format(this.state.value)} />
      </div>
    );
    /* jshint ignore:end */
  }
});

module.exports = TangleTextCompat;
