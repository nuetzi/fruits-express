const React = require('react');

class Index extends React.Component {
  render() {
    return (
        <div>
            <link rel="stylesheet" href="/css/app.css"/>
            <h1>Fruits Index Page</h1>
            <ul>
                {
                    this.props.fruits.map((fruit, i) => {
                        return <li key={i}>
                            The <a href={`/fruits/${fruit.id}`}>{fruit.name}</a> is {fruit.color}.
                            <br/>
                            { fruit.readyToEat? <span>It is ready to eat.</span>: <span> It is not ready to eat.</span>}
                            <br/>
                            <a href={`/fruits/${fruit.id}/edit`}>Edit This Fruit</a>
                            {/* Your Delete Form Goes Here  It's incomplete we will fix below*/}
                            <form action={`/fruits/${fruit._id}?_method=DELETE`} method="POST">
                                <input type="submit" value="DELETE"/>
                            </form>
                            <br/>
                            <br/>
                        </li>
                    })
                }
            </ul>
            <nav>
                <a href="/fruits/new">Create a New Fruit</a>
            </nav>
        </div>
    );
  }
}

module.exports = Index;