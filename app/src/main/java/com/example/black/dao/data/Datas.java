package com.example.black.dao.data;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;

import androidx.annotation.NonNull;

public class Datas implements DM {
    private SharedPreferences sharedPreferences;

    public Datas(@NonNull Context context, String name){
        this.sharedPreferences = context.getSharedPreferences(name,Context.MODE_PRIVATE);
    }


    @Override
    public String getString(String key) {
        return sharedPreferences.getString(key,"");
    }


    @SuppressLint("CommitPrefEdits")
    @Override
    public String setString(String key, String value) {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(key, value);
        editor.apply();
        return getString(key);
    }
}
