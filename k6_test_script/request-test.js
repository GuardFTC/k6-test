import http from "k6/http";
import {check, group} from "k6";

/**
 * 固定配置
 * @type {{duration: string, rps: number, vus: number}}
 */
export let options = {

    //1.定义环境配置
    ext: {
        loadimpact: {
            projectID: 3606595
        }
    },

    //2.测试持续时间
    duration: '5s',

    //3.每秒并发数
    rps: 100,

    //4.并发数
    vus: 100,
}

/**
 * 默认入口函数
 */
export default function () {

    //1.测试POST请求
    group("post", function () {
        postTest();
    })

    //2.测试DELETE请求
    group("delete", function () {
        deleteTest();
    })

    //3.测试PUT请求
    group("put", function () {
        putTest();
    })

    //4.测试PATCH请求
    group("patch", function () {
        patchTest();
    })

    group("get", function () {

        //5.测试Get请求 Url拼接参数
        getTestParam();

        //6.测试Get请求 路径参数
        getPathParamTest();
    })
}

/**
 * 测试POST请求
 */
export let postTest = function () {

    //1.定义URL以及请求参数
    let url = 'http://localhost:6666/api/v1/rest/k6tests';
    let payload = JSON.stringify({
        'method': 'post'
    });

    //2.定义请求头
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'header-param': 'post'
        },
    };

    //3.发送请求
    let res = http.post(url, payload, params);

    //4.校验结果
    check(res, {
        "status is ok": (r) => r.status === 200,
        "payload is ok": (r) => r.json().method === "post",
        "header is ok": (r) => r.json().result === "post",
    });
}

/**
 * 测试DELETE请求
 */
export let deleteTest = function () {

    //1.定义URL以及请求参数
    let url = 'http://localhost:6666/api/v1/rest/k6tests';
    let payload = JSON.stringify({
        'method': 'delete'
    });

    //2.定义请求头
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'header-param': 'delete'
        },
    };

    //3.发送请求
    let res = http.del(url, payload, params);

    //4.校验结果
    check(res, {
        "status is ok": (r) => r.status === 200,
        "payload is ok": (r) => r.json().method === "delete",
        "header is ok": (r) => r.json().result === "delete",
    });
}

/**
 * 测试PUT请求
 */
export let putTest = function () {

    //1.定义URL以及请求参数
    let url = 'http://localhost:6666/api/v1/rest/k6tests';
    let payload = JSON.stringify({
        'method': 'put'
    });

    //2.定义请求头
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'header-param': 'put'
        },
    };

    //3.发送请求
    let res = http.put(url, payload, params);

    //4.校验结果
    check(res, {
        "status is ok": (r) => r.status === 200,
        "payload is ok": (r) => r.json().method === "put",
        "header is ok": (r) => r.json().result === "put",
    });
}

/**
 * 测试PATCH请求
 */
export let patchTest = function () {

    //1.定义URL以及请求参数
    let url = 'http://localhost:6666/api/v1/rest/k6tests';
    let payload = JSON.stringify({
        'method': 'patch'
    });

    //2.定义请求头
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'header-param': 'patch'
        },
    };

    //3.发送请求
    let res = http.patch(url, payload, params);

    //4.校验结果
    check(res, {
        "status is ok": (r) => r.status === 200,
        "payload is ok": (r) => r.json().method === "patch",
        "header is ok": (r) => r.json().result === "patch",
    });
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

/**
 * 测试GET请求 路径参数
 */
export let getPathParamTest = function () {

    //1.发送请求
    let res = http.get("http://localhost:6666/api/v1/rest/k6tests/2");

    //2.校验结果
    check(res, {
        "status is ok": (r) => r.status === 200,
        "data is ok": (r) => r.json().result === "2",
    });
}