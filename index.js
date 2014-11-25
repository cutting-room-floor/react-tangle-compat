var React = require('react');

var TangleTextCompat = React.createClass({
  propTypes: {
    value: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    metaStep: React.PropTypes.number,
    className: React.PropTypes.string,
    onInput: React.PropTypes.func,
    format: React.PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      min: -Infinity,
      max: Infinity,
      step: 1,
      metaStep: 10,
      className: 'react-tangle-input',
      format: function(x) { return x; },
      onInput: function() { }
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
    this.props.onInput(e.target.value);
    this.setState({ value: e.target.value });
  },
  onInput: function(e) {
    this.props.onInput(e.target.value);
    this.setState({ value: e.target.value });
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
      e.target.setAttribute("value", this.state.value);
      this.setState({ step: this.props.metaStep })
    }
  },
  onKeyUp: function(e) {
    if (e.which == 16) {
      e.target.setAttribute("value", this.state.value);
      this.setState({ step: this.props.step });
    } else if (e.which == 38 || e.which == 40) {
      this.onBlur();
    }
  },
  step: function() {
    return this.state.step;
  },
  render: function() {
    /* jshint ignore:start */
    return (
      <div>
        <input
          className={this.props.className}
          disabled={this.props.disabled}
          type='number'
          step={this.step()}
          ref='input'
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          onInput={this.onInput}
          onBlur={this.onBlur}
          value={this.props.format(this.state.value)} />
      </div>
    );
    /* jshint ignore:end */
  }
});

module.exports = TangleTextCompat;
