package com.ftc.testk6.controller;

import cn.hutool.json.JSONObject;
import org.springframework.web.bind.annotation.*;

/**
 * @author: 冯铁城 [17615007230@163.com]
 * @date: 2022-10-25 17:26:22
 * @describe: K6测试接口类
 */
@RestController
@RequestMapping("/api/v1/rest/k6tests")
public class K6TestController {

    @PostMapping
    public JSONObject post(@RequestBody JSONObject param, @RequestHeader("header-param") String headerParam) {
        System.out.println("post");

        //1.封装返回结构
        JSONObject result = param;
        result.set("result", headerParam);

        //2.返回
        return result;
    }

    @DeleteMapping
    public JSONObject delete(@RequestBody JSONObject param, @RequestHeader("header-param") String headerParam) {
        System.out.println("delete");

        //1.封装返回结构
        JSONObject result = param;
        result.set("result", headerParam);

        //2.返回
        return result;
    }

    @PutMapping
    public JSONObject put(@RequestBody JSONObject param, @RequestHeader("header-param") String headerParam) {
        System.out.println("put");

        //1.封装返回结构
        JSONObject result = param;
        result.set("result", headerParam);

        //2.返回
        return result;
    }

    @PatchMapping
    public JSONObject patch(@RequestBody JSONObject param, @RequestHeader("header-param") String headerParam) {
        System.out.println("patch");

        //1.封装返回结构
        JSONObject result = param;
        result.set("result", headerParam);

        //2.返回
        return result;
    }

    @GetMapping
    public JSONObject get(@RequestParam String param) {
        System.out.println("getUrlParam");

        //1.封装返回结构
        JSONObject result = new JSONObject();
        result.set("result", param);

        //2.返回
        return result;
    }

    @GetMapping("{pathParam}")
    public JSONObject getPathParam(@PathVariable String pathParam) {
        System.out.println("getPathParam");

        //1.封装返回结构
        JSONObject result = new JSONObject();
        result.set("result", pathParam);

        //2.返回
        return result;
    }
}
