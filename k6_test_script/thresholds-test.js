import http from "k6/http";
import {check} from "k6";
import {Rate} from 'k6/metrics';

/**
 * 动态配置
 * @type {{rps: number, stages: [{duration: string, target: number},{duration: string, target: number},{duration: string, target: number},{duration: string, target: number},{duration: string, target: number}]}}
 */
export let options = {

    //1. 定义Vus变更趋势
    stages: [
        {target: 10, duration: '1s'},
        {target: 25, duration: '1s'},
        {target: 50, duration: '1s'},
        {target: 100, duration: '1s'},
        {target: 0, duration: '1s'},
    ],

    //2.定义每秒并发数
    rps: 100,

    //3.定义阈值
    thresholds: {
        'request_success_rate': ['rate>0.99'],
        http_req_failed: ['rate<0.01'],
        iteration_duration: [
            {
                threshold: 'p(90)<400',
                abortOnFail: true,
                delayAbortEval: '10s'
            },
        ],
    }
};

/**
 * 自定义指标
 */
const requestSuccessRate = new Rate('request_success_rate');

/**
 * 默认入口函数
 */
export default function () {

    //1.测试Get请求 Url拼接参数
    getTestParam();
}

/**
 * 测试GET请求 URL拼接参数
 */
export let getTestParam = function () {

    //1.发送请求
    let res = http.get("http://192.168.43.66:6666/api/v1/rest/k6tests?param=1");

    //2.校验结果
    check(res, {
        "status is ok": (r) => r.status === 200,
        "data is ok": (r) => r.json().result === "1",
    });

    //3.处理百分率自定义指标
    requestSuccessRate.add(res.status === 200)
}