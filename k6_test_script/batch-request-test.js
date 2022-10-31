import http from "k6/http";
import {check, group} from "k6";

/**
 * 固定配置
 * @type {{duration: string, rps: number, vus: number}}
 */
export let options = {

    //1.测试持续时间
    duration: '5s',

    //2.并发数
    vus: 100,

    //3.每秒并发数
    rps: 100
}

/**
 * 默认入口函数
 */
export default function () {

    //1.测试批处理请求
    group("batchRequest", function () {
        batchRequest();
    })
}

/**
 * 测试批处理请求
 */
export let batchRequest = function () {

    //1.定义POST请求
    const postRequest = {
        method: 'POST',
        url: 'http://localhost:6666/api/v1/rest/k6tests',
        body: JSON.stringify({
            'method': 'post'
        }),
        params: {
            headers: {
                'Content-Type': 'application/json',
                'header-param': 'post'
            }
        },
    };

    //2.定义DELETE请求
    const deleteRequest = {
        method: 'DELETE',
        url: 'http://localhost:6666/api/v1/rest/k6tests',
        body: JSON.stringify({
            'method': 'delete'
        }),
        params: {
            headers: {
                'Content-Type': 'application/json',
                'header-param': 'delete'
            }
        },
    };

    //3.定义PUT请求
    const putRequest = {
        method: 'PUT',
        url: 'http://localhost:6666/api/v1/rest/k6tests',
        body: JSON.stringify({
            'method': 'put'
        }),
        params: {
            headers: {
                'Content-Type': 'application/json',
                'header-param': 'put'
            }
        },
    };

    //4.定义PUT请求
    const patchRequest = {
        method: 'PATCH',
        url: 'http://localhost:6666/api/v1/rest/k6tests',
        body: JSON.stringify({
            'method': 'patch'
        }),
        params: {
            headers: {
                'Content-Type': 'application/json',
                'header-param': 'patch'
            }
        },
    };

    //5.定义URL参数GET请求
    const getUrlParamRequest = {
        method: 'GET',
        url: 'http://localhost:6666/api/v1/rest/k6tests?param=1',
    };

    //6.定义路径参数GET请求
    const getPathParamRequest = {
        method: 'GET',
        url: 'http://localhost:6666/api/v1/rest/k6tests/2',
    };

    //7.批处理发送请求
    const responses = http.batch([
        postRequest,
        deleteRequest,
        putRequest,
        patchRequest,
        getUrlParamRequest,
        getPathParamRequest
    ]);

    //8.校验响应结果
    checkResponses(responses);
}

/**
 * 校验响应结果
 * @param responses 响应结果集合
 */
function checkResponses(responses) {
    //8.校验POST请求
    check(responses[0], {
        "status is ok": (r) => r.status === 200,
        "payload is ok": (r) => r.json().method === "post",
        "header is ok": (r) => r.json().result === "post",
    });

    //9.校验POST请求
    check(responses[1], {
        "status is ok": (r) => r.status === 200,
        "payload is ok": (r) => r.json().method === "delete",
        "header is ok": (r) => r.json().result === "delete",
    });

    //10.校验POST请求
    check(responses[2], {
        "status is ok": (r) => r.status === 200,
        "payload is ok": (r) => r.json().method === "put",
        "header is ok": (r) => r.json().result === "put",
    });

    //11.校验POST请求
    check(responses[3], {
        "status is ok": (r) => r.status === 200,
        "payload is ok": (r) => r.json().method === "patch",
        "header is ok": (r) => r.json().result === "patch",
    });

    //12.校验POST请求
    check(responses[4], {
        "status is ok": (r) => r.status === 200,
        "data is ok": (r) => r.json().result === "1",
    });

    //13.校验POST请求
    check(responses[5], {
        "status is ok": (r) => r.status === 200,
        "data is ok": (r) => r.json().result === "2",
    });
}