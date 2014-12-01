/** @jsx React.DOM */
var TangleText = require('../'),
  React = require('react');

var Example = React.createClass({
  getInitialState: function() {
    return { value1: 0, value2: 0 };
  },
  onChange1: function(value) {
      console.log(value);
    this.setState({ value1: value });
  },
  onChange2: function(value) {
    this.setState({ value2: value });
  },
  render: function() {
    /* jshint ignore:start */
    return (
      <div>
        <div className='clearfix pad1 keyline-bottom'>
          <div className='col4'>
            <TangleText value={this.state.value1} onChange={this.onChange1} />
            <TangleText value={this.state.value2} onChange={this.onChange2}
              min={0} max={1} step={0.02} />
          </div>
          <div className='col8'>
            Default settings, no minimum, maximum, or step.
          </div>
        </div>
      </div>
    );
    /* jshint ignore:end */
  }
});

React.renderComponent(<Example />, document.getElementById('app'));
