package com.example.black.controller;

import android.webkit.JavascriptInterface;
public interface JsInterface {
    @JavascriptInterface
    String getVersion();
    @JavascriptInterface
    String getName();
}
