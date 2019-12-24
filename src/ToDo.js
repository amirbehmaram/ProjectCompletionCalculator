import React from 'react';

class ToDo extends React.Component {

    render() {
        // OR return <h1 className="todo-title">Todo List</h1>
        
        // The middle argument `null` corresponds to any props we would want to pass to this
        return React.createElement('h1', null, 'Todo List')
    }
}

export default ToDo;