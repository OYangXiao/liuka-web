"use strict"

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'mobx-react'

import { TheStore } from 'stores'
import { Topbar } from 'modules/topbar'
import jwt from 'libs/jwt'

function errorLoading(err: Error) {
    console.error('Dynamic page loading failed', err);
}
function loadRoute(cb: Function) {
    return (module: any) => cb(null, module.default);
}

const routes = [
    {
        path: '/postcase',
        getComponent(_: any, cb: any) {
            System.import('modules/postcase/postcase-view.tsx')
                .then(loadRoute(cb))
                .catch(errorLoading)
        },
        onEnter(_: any, replace: any) {
            if (!jwt.isLoggedIn()) {
                sessionStorage.setItem('afterLogin', '/postcase')
                replace('/account')
            }
        }
    },
    {
        path: "/case",
        getComponent(_: any, cb: any) {
            System.import('modules/case/case-view.tsx')
                .then(loadRoute(cb))
                .catch(errorLoading)
        }
    }
]

const store = new TheStore()

ReactDOM.render(
    <Provider store={store}>
        <Topbar>
            <Router history={browserHistory} routes={routes} />
        </Topbar>
    </Provider>,
    document.getElementById('A')
)