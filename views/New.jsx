const React = require('react');

class New extends React.Component {
    render() {
        return (
            <div>
                <link rel="stylesheet" href="/css/app.css"/>
                <h1>New Fruit Page</h1>
                <form action='/fruits' method='POST'>
                    Name: <input type='text' name='name' />
                    <br></br>
                    Color: <input type='text' name='color' />
                    <br></br>
                    Is Ready To Eat: <input type='checkbox' name='readyToEat' />
                    <br></br>
                    <input type='submit' name='' value='Create Fruit' />
                </form>
            </div>
        )
    }
}

module.exports = New;