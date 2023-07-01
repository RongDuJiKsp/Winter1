package com.example.black.bean;

import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.annotation.Nullable;

public class MyWebViewCliet extends WebViewClient {

    @Override
    public void onPageFinished(WebView view, String url) {
        // TODO: 2023/1/15 通知主框架已经完成
        super.onPageFinished(view, url);
    }

    @Nullable
    @Override
    public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
        // TODO: 2023/1/15 重定向接收服务器资源 ,实现资源本地化
          return super.shouldInterceptRequest(view, request);
    }
}
