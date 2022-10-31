import http from "k6/http";
import {check} from "k6";

/**
 * 动态配置
 * @type {{rps: number, stages: [{duration: string, target: number},{duration: string, target: number},{duration: string, target: number},{duration: string, target: number},{duration: string, target: number}]}}
 */
export let options = {
    stages: [
        {target: 10, duration: '5s'},
        {target: 25, duration: '5s'},
        {target: 50, duration: '5s'},
        {target: 100, duration: '5s'},
        {target: 0, duration: '10s'},
    ],
    rps: 100
};

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
}