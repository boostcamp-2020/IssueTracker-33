import Basic from './basic'
import React, {Fragment} from 'react';
import ReactDOM, {render}from 'react-dom';


render(
    <Fragment>
        <h1>Hello, world!</h1>
        <h1 className="isit">이건 되냔말이야</h1>
        <Basic />
    </Fragment>,
    document.getElementById('root')
)

console.log(process.env.NODE_ENV)
alert('aaa')
console.log('asdad')