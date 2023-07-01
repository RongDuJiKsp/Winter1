package com.example.black.controller;

public class JSSetting implements JsInterface{
    private final static String name = "SETTINGS";
    private final static String version = "1.0";

    @Override
    public String getVersion() {
        return version;
    }

    @Override
    public String getName() {
        return name;
    }


}
