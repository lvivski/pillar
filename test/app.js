var App = function (props) {
		var index = 0
    return (
				React.createElement('div', null, [
					React.createElement(Pillar.Input),
					React.createElement('br'),
					React.createElement(Pillar.Checkbox),
					React.createElement('br'),
					React.createElement(Pillar.Radio, {name: 'name'}),
					React.createElement(Pillar.Radio, {name: 'name'}),
					React.createElement(Pillar.Checkbox, {toggle: true}),
					React.createElement('br'),
					React.createElement(Pillar.Range),
					React.createElement('br'),
					React.createElement(Pillar.Search),
					React.createElement('br')
				])

    );
};

ReactDOM.render(
	React.createElement(App),
	document.body.appendChild(document.createElement('div'))
);
