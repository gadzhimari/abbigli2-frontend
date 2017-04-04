import strings from './en_US';

export function __t(str){
    return strings[str] || str;
}