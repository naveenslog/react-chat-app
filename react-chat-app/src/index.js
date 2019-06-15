import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './components/Widget';
// ReactDOM.render(<Widget />, document.getElementById('root'));

function initialize(){

    var widget = document.getElementById("widget")

    if(!widget){
        console.log("No widget")
        widget = document.createElement("div")
        widget.id = "widget"
        document.body.appendChild(widget);
    }
    ReactDOM.render(
			<Widget />,
		widget
	);
	return false
}

window.onload = initialize;