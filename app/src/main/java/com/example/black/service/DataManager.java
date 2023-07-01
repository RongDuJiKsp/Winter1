package com.example.black.service;

import android.content.Context;

import com.example.black.MainActivity;
import com.example.black.dao.data.DM;
import com.example.black.dao.data.Datas;

import java.util.HashMap;

public class DataManager{
    private static DataManager defaultDataManager = null;
    private HashMap<String , DM> datasMap = new HashMap<>();
    private Context defaultContext = null;

    public static DataManager getInstance(){
        if (defaultDataManager==null) {
            Context context = new MainActivity();
            defaultDataManager = new DataManager(context);
        }
        return defaultDataManager;
    }

    public DataManager(Context defaultContext){
        this.defaultContext = defaultContext;
        defaultDataManager = this;
    }

    public DM getDatas(String name){
        if (this.datasMap.get(name) != null) {
            return this.datasMap.get(name);
        }else if (defaultContext == null) {
            return null;
        }
        return getDatas(defaultContext,name);
    }

    public DM getDatas(Context context,String name){
        if (context == null) {
            return getDatas(name);
        }else{
            DM dm = this.datasMap.get(name);
            if (dm==null) {//如果获取为空,就返回一个新建的值,并且将这个值保存在这里
                dm = new Datas(context,name);
                datasMap.put(name,dm);
            }
            return dm;
        }
    }

}
