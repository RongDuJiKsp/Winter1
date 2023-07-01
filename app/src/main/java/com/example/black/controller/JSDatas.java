package com.example.black.controller;

import android.webkit.JavascriptInterface;

import com.example.black.service.DataManager;

public class JSDatas implements JsInterface{
    private final static String version = "1.0";
    private final static String name = "DATA";

    public String getVersion() {
        return version;
    }

    public String getName() {
        return name;
    }

    @JavascriptInterface
    public String setData(String key,String value){
        return DataManager.getInstance().getDatas(name).setString(key, value);
    }

    @JavascriptInterface
    public String getData(String key){
        return DataManager.getInstance().getDatas(name).getString(key);
    }
}
