package com.example.black.bean;

import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

/**
 * 静态代理的方式调整webview的一些基础设置,但是不负责设置webclient之类的东西,解耦
 */
public class WebViewProxy implements Viewable {
    private WebView webView;

    /**
     * 带参构造器
     * @param webView 不能为空的
     * @param webViewClient 可以为空的,如果webview中没有设置,会自动生成
     * @param webChromeClient 可以为空的,如果webview中没有设置,会自动生成
     */
    public WebViewProxy(@NonNull WebView webView, @Nullable WebViewClient webViewClient, @Nullable WebChromeClient webChromeClient){
        init(webView, webViewClient, webChromeClient);
        this.webView = webView;
    }

    private void init(@NonNull WebView webView, @Nullable WebViewClient webViewClient, @Nullable WebChromeClient webChromeClient) {
        WebSettings settings = webView.getSettings();
        webView.canGoBack();
        webView.canGoForward();
        settings.setAllowFileAccess(true);
        settings.setJavaScriptEnabled(true);
        settings.setSupportZoom(false);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setDomStorageEnabled(true);
        settings.setUserAgentString("Mozilla/5.0 (Linux; Android 13; sdk_gphone64_x86_64) " +
                "AppleWebKit/537.36 (KHTML, like Gecko) " +
                "Chrome/101.0.0.0 Mobile Safari/537.36");
//        初始化Client的设置,保证设置后webview中包含webclient
        if (webViewClient == null) {
            if (webView.getWebViewClient() == null) {
                webView.setWebViewClient(new MyWebViewCliet());
            }
        }else{
            webView.setWebViewClient(webViewClient);
        }
//        初始化chrome的设置,保证设置后webview中包含chromeclient
        if (webChromeClient == null){
            if (webView.getWebChromeClient() == null){
                webView.setWebChromeClient(new MyWebChromClient());
            }
        }else{
            webView.setWebChromeClient(webChromeClient);
        }
    }

    @Override
    public WebView getWebView() {
        return webView;
    }



}
