import * as CryptoJS from 'crypto-js';
import { COOKIE_KEYS } from '@constants/index';

/**
 * setCookie
 *
 * @export
 * @param {string} name
 * @param {string} value
 * @param {number} [expiredays=365]
 */
function setCookie(name: string, value: string, expiredays = 365) {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = `${name}=${escape(value)};expires=${exdate.toUTCString()}`;
}

/**
 * getCookie
 *
 * @export
 * @param {string} name
 * @returns
 */
function getCookie(name: string) {
    if (document.cookie.length > 0) {
        let cStart = document.cookie.indexOf(name + '=');
        if (cStart !== -1) {
            cStart = cStart + name.length + 1;
            let cEnd = document.cookie.indexOf(';', cStart);
            if (cEnd === -1) {
                cEnd = document.cookie.length;
            }
            return unescape(document.cookie.substring(cStart, cEnd));
        } else {
            return '';
        }
    }
    return '';
}

/**
 * clearCookie
 *
 * @export
 * @param {string} name
 */
function clearCookie(name: string) {
    setCookie(name, '');
}

/**
 * 从url获取参数
 *
 * @export
 * @param {string} name
 * @returns {string}
 */
function queryURL(name: string): string {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    const result = window.location.search.substr(1).match(reg);
    if (result !== null) {
        return decodeURI(result[2]);
    }
    return null;
}

const AuthTokenKey = 'summitsummitsumm'; // AES密钥
const AuthTokenIv = 'summitsummitsumm'; // AES向量
/**
 * 加密方法
 * padding：填充
 * mode: 加密模式
 * 注意：加密时对格式要求异常严格，必须一模一样才能保证加密之后code一致
 *
 * @export
 * @param {*} password
 * @returns
 */
function Encrypt(password) {
    const encrypted = CryptoJS.AES.encrypt(password, CryptoJS.enc.Latin1.parse(AuthTokenKey), {
        iv: CryptoJS.enc.Latin1.parse(AuthTokenIv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
    });
    return encrypted.toString();
}

/* 
    验证当前用户是否登录
*/
function getLoginStatus() {
    return getCookie(COOKIE_KEYS.LOGIN_AUTHORIZATION) !== '';
}

/* 退出登录 */
function loginOut() {
    clearCookie(COOKIE_KEYS.LOGIN_AUTHORIZATION);
}

export { setCookie, getCookie, clearCookie, queryURL, Encrypt, getLoginStatus, loginOut };
