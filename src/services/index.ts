import axios, { AxiosRequestConfig as _AxiosRequestConfig, Method } from 'axios';
import qs from 'qs';
import { message } from 'antd';
import { COOKIE_KEYS } from '@constants/index';
import { getCookie } from '@utils/index';

export interface AxiosRequestConfig extends _AxiosRequestConfig {
    startTime?: Date;
}

export interface HttpResquest {
    get?(url: string, data: object, baseUrl?: string): Promise<any>;
    post?(url: string, data: object, baseUrl?: string): Promise<any>;
    delete?(url: string, data: object, baseUrl?: string): Promise<any>;
    put?(url: string, data: object, baseUrl?: string): Promise<any>;
}

enum HTTPERROR {
    LOGICERROR,
    TIMEOUTERROR,
    NETWORKERROR,
}

const TOKENERROR = [401, 402, 403];

const DEFAULTCONFIG = {
    baseURL: '/api',
};

const http: HttpResquest = {};
const methods: Method[] = ['get', 'post', 'put', 'delete'];

let authTimer: any = null;

const isSuccess = (res) => res.code === 'CODE_0000';
const resFormat = (res) => res.response || res.data || {};

methods.forEach((v: Method) => {
    http[v] = (url: string, data: object, baseUrl?: string) => {
        const axiosConfig: AxiosRequestConfig = {
            method: v,
            url,
            baseURL: baseUrl || DEFAULTCONFIG.baseURL,
            headers: { Authorization: `Bearer ${getCookie(COOKIE_KEYS.LOGIN_AUTHORIZATION)}` },
        };
        console.log(getCookie(COOKIE_KEYS.LOGIN_AUTHORIZATION));
        const instance = axios.create(DEFAULTCONFIG);
        //对请求数据做处理
        instance.interceptors.request.use(
            (cfg) => {
                cfg.params = {
                    ...cfg.params,
                    ts: Date.now() / 1000,
                };
                return cfg;
            },
            (error) => Promise.reject(error)
        );
        //对响应数据做处理
        instance.interceptors.response.use(
            (response: any) => {
                const rdata = response.data;
                //处理登录接口
                if (response.config.url === '/oauth/token') {
                    return rdata;
                }
                if (!isSuccess(rdata)) {
                    return Promise.reject({
                        msg: rdata.msg,
                        errCode: rdata.code,
                        type: HTTPERROR[HTTPERROR.LOGICERROR],
                        config: response.config,
                    });
                }
                return resFormat(rdata);
            },
            (error) => {
                if (error.response.config.url === '/oauth/token') {
                    message.destroy();
                    message.error(error.response.data.msg);
                    return;
                }
                if (TOKENERROR.includes(error.response.status)) {
                    message.destroy();
                    message.error('Authentication failure, Please relogin!');
                    clearTimeout(authTimer);
                    authTimer = setTimeout(() => {
                        location.replace('/#/login');
                    }, 300);
                    return;
                }
                return Promise.reject({
                    msg: error.response.statusText || 'network error',
                    type: /^timeout of/.test(error.message)
                        ? HTTPERROR[HTTPERROR.TIMEOUTERROR]
                        : HTTPERROR[HTTPERROR.NETWORKERROR],
                    config: error.config,
                });
            }
        );
        if (v === 'get') {
            axiosConfig.params = data;
        } else if (data instanceof FormData) {
            axiosConfig.data = data;
        } else {
            axiosConfig.data = qs.stringify(data);
        }
        axiosConfig.startTime = new Date();
        return instance
            .request(axiosConfig)
            .then((res) => res)
            .catch((err) => {
                console.log('catch error----', err);
                message.destroy();
                message.error(err.response || err.msg || err.stack || 'unknown error');
                return Promise.reject({ err });
            });
    };
});

export default http;
