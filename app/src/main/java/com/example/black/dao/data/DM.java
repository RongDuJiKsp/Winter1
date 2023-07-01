package com.example.black.dao.data;

public interface DM {
    //datamanager
    /**
     * 键值对查询
     * @param key 键值对中的键
     * @return 键值对中的值,如果没有查到,默认返回空字符串
     */
    String getString(String key);
    /**
     * 设置键值对
     * @param key 键
     * @param value 值
     * @return 返回设置完后键所对的值
     */
    String setString(String key,String value);
}
