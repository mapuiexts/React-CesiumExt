import { defined } from 'cesium';

export const isString = (value) => {
    if(defined(value) && (typeof value === 'string' || value instanceof String))
        return true;
    else
        return false;
};

export const isArray = (value) => {
    if(defined(value) && value.constructor === Array) {
        return true;
    }
    else {
        return false;
    }
}

export const isObject = (value) => {
    return defined(value) && value.constructor === ({}).constructor;
};