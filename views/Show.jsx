const React = require('react');

class Show extends React.Component {
    render() {
        return (
            <div>
                <link rel="stylesheet" href="/css/app.css"/>
                <h1>Fruits show page</h1>
                The { this.props.fruit.name } is { this.props.fruit.color }
                <br></br>
                { this.props.fruit.readyToEat ? `It is ready to eat` : `It is not ready to eat` }
            </div>
        )
    }
}

module.exports = Show;