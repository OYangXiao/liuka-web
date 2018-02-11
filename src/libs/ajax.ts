import * as Rx from 'rxjs';

import jwt from './jwt';
import gotologin from './goto-address'

const saveJwt = (res: Rx.AjaxResponse) => {
    const newJwt = res.xhr.getResponseHeader('x-jwt');
    const newExpire = res.xhr.getResponseHeader('x-jwt-expire');
    jwt.update(newJwt, newExpire);
};

const onError = (err: Rx.AjaxError) => {
    if (err.status === 401 && err.response && err.response.redirect) {
        gotologin()
    }
    return Rx.Observable.throw(err);
};

export default {
    get: (url: string) => {
        return Rx.Observable.ajax
            .get(url, { 'x-jwt': jwt.getJwt() })
            .do(saveJwt)
            .catch(onError);
    },
    delete: (url: string) => {
        return Rx.Observable.ajax
            .delete(url, { 'x-jwt': jwt.getJwt() })
            .do(saveJwt)
            .catch(onError);
    },
    post: (url: string, body?: any) => {
        return Rx.Observable.ajax
            .post(url, body, { 'Content-Type': 'application/json', 'x-jwt': jwt.getJwt() })
            .do(saveJwt)
            .catch(onError);
    },
    put: (url: string, body?: any) => {
        return Rx.Observable.ajax
            .put(url, body, { 'Content-Type': 'application/json', 'x-jwt': jwt.getJwt() })
            .do(saveJwt)
            .catch(onError);
    }
};
