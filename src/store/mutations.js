import {set} from 'vue';
import * as types from './mutation-types';

function setState(state, id, object) {
    set(state, id, Object.assign({}, object));
}

export default {
    [types.LOGIN](state){
        state.authenticated = true;
    },
    [types.LOGOUT](state){
        state.authenticated = false;
    },
    [types.SET_PASSWORD](state, {password}){
        state.lastUse = new Date().getTime();
        setState(state, 'password', password);
    },
    [types.SET_DEFAULT_PASSWORD](state, {password}){
        setState(state, 'defaultPassword', password);
    },
    [types.SET_PASSWORDS](state, {passwords}){
        state.passwords = passwords;
    },
    [types.DELETE_PASSWORD](state, {id}){
        state.passwords = state.passwords.filter(password => {
            return password.id !== id;
        });
        if (state.password && state.password.id === id) {
            state.password = Object.assign({}, state.defaultPassword);
        }
    },
    [types.SET_BASE_URL](state, {baseURL}){
        state.baseURL = baseURL;
    },
    [types.SET_VERSION](state, {version}){
        if (state.password === null) {
            state.password = {version};
        } else {
            state.password.version = version;
        }
    },
    [types.LOAD_PASSWORD_FIRST_TIME](state){
        const tenMinutesAgo = new Date().getTime() - 10 * 60 * 1000;

        if (state.lastUse < tenMinutesAgo) {
            setState(state, 'password', state.defaultPassword);
        }
    }
};
