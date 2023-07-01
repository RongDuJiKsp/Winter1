package com.example.black.service;

import android.content.Context;
import android.content.Intent;
import android.view.KeyEvent;
import android.widget.Toast;

import com.example.black.bean.Viewable;
import com.example.black.controller.JSDatas;
import com.example.black.controller.JSSetting;
import com.example.black.controller.JsInterface;
import com.example.black.dao.file.AssetFile;
import com.example.black.dao.file.FileCopyer;

import java.io.File;
import java.io.IOException;
import java.util.logging.ConsoleHandler;
import java.util.logging.Handler;
import java.util.logging.LogRecord;

/**
 * 我的框架
 * @author Leo
 */
public class MyFrame implements Runnable{
    private Context context;
//    显示接口
    private Viewable view;

    private DataManager dataManager;
//    带参构造器
    public MyFrame(Viewable view,Context context){
        this.view = view;
        this.context = context;
        dataManager = new DataManager(context);
    }

    private void initJsInterface() {
        addJSInterface(new JSSetting());
        addJSInterface(new JSDatas());
    }
    private String addJSInterface(JsInterface jsInterface){
        view.getWebView().addJavascriptInterface(jsInterface,jsInterface.getName());
        return jsInterface.getName()+"_v"+jsInterface.getVersion();
    }

    private void initFile() {
        if (dataManager.getDatas("BOOT").getString("assetFile").equals("T")){
            return;
        }
        FileCopyer assetFile = new AssetFile(context.getAssets());
        String target = context.getFilesDir().getAbsolutePath();
        Toast.makeText(context, target, Toast.LENGTH_SHORT).show();
        String resource = "testUnion";
        try {
            assetFile.doWith(resource, target+ File.separator +resource);
        } catch (IOException e) {
            e.printStackTrace();
        }
        dataManager.getDatas("BOOT").setString("assetFile","T");
    }

    //    可展示展示界面接口
    public void setView(Viewable view) {
        this.view = view;
    }


    @Override
    public void run() {
        initFile();//将文件向外抽出
        initJsInterface();//添加JS接口
    }

    public void notifyKB(int keyCode, KeyEvent event){
        if (keyCode == KeyEvent.KEYCODE_BACK){
            goBack();
        }
    }

    public void goBack(){
        if (view.getWebView().getUrl().contains("index.")){
//            这里只是返回桌面，但是后台保活
            Intent home=new Intent(Intent.ACTION_MAIN);
            home.addCategory(Intent.CATEGORY_HOME);
            context.startActivity(home);
        }else{
            view.getWebView().goBack();
        }
    }
}
