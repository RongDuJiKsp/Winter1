package com.example.black;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.os.StrictMode;
import android.view.KeyEvent;
import android.webkit.WebView;
import android.widget.Toast;

import com.example.black.bean.WebViewProxy;
import com.example.black.service.MyFrame;

public class MainActivity extends Activity {
    public final boolean isDebuging = true;
    private WebView webView;
    private MyFrame myFrame;

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        myFrame.notifyKB(keyCode, event);
        return true;
    }

    public WebView getWebView() {
        return webView;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
        StrictMode.setVmPolicy(builder.build());
        builder.detectFileUriExposure();
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        bindComponent();//程序运行初始化绑定组件
        myFrame = new MyFrame(new WebViewProxy(webView,null,null),MainActivity.this);//静态代理
        myFrame.run();
        if (isDebuging) {
            // TODO: 2023/1/15 测试方法,记得删
            test();
        }
    }

    private void test() {
        webView.loadUrl("file:///data/user/0/com.example.black/files/testUnion/demo/htmls/index.html");
/*
        webView.loadUrl("https://www.baidu.com/");
        webView.loadUrl("javascript:DATA.setData(\"name\",\"Leo\");");
        webView.loadUrl("javascript:alert(\"aaa\")");
        webView.loadUrl("javascript:alert(DATA.getData(\"name\"));");
*/

    }

    //    绑定组件
    private void bindComponent() {
        this.webView = findViewById(R.id.webView);

    }
}