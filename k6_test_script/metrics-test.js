import http from "k6/http";
import {check} from "k6";
import {Counter, Gauge, Rate, Trend} from 'k6/metrics';

/**
 * 固定配置
 * @type {{duration: string, rps: number, vus: number}}
 */
export let options = {

    //1.测试持续时间
    duration: '2s',

    //2.并发数
    vus: 100,

    //3.每秒并发数
    rps: 100
}

/**
 * 自定义指标
 */
const dataOkTime = new Counter("dataOkTime");
const requestTimeDuration = new Gauge('request_time_duration_gauge');
const requestSuccessRate = new Rate('request_success_rate');
const requestTimeTrend = new Trend('request_time_trend');

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
    let res = http.get("http://localhost:6666/api/v1/rest/k6tests?param=1");

    //2.校验结果
    check(res, {
        "status is ok": (r) => r.status === 200,
        "data is ok": (r) => r.json().result === "1",
    });

    //3.处理计数器自定义指标
    if (res.json().result === "1")
        dataOkTime.add(1)

    //4.处理测量值自定义指标
    requestTimeDuration.add(res.timings.duration)

    //5.处理百分率自定义指标
    requestSuccessRate.add(res.status === 200)

    //6.处理趋势自定义指标
    requestTimeTrend.add(res.timings.duration)
}