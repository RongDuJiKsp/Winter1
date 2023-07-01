package com.example.black.dao.file;

import android.content.Context;
import android.content.res.AssetManager;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class AssetFile implements FileCopyer {

    private AssetManager assetManager;

    public AssetFile(AssetManager assetManager){
        this.assetManager = assetManager;
    }

    /**
     *
     * 复制assert下的文件到指定文件夹下
     * @param resource 指定名字,
     * @param target 指定目录
     * @return 返回指定目录
     * @throws Exception 目标目录不存在的情况
     */
    @Override
    public File doWith(String resource, String target) throws IOException {
        copyAssertDirToData(resource, target);
        return new File(target);
    }

    private void copyAssertDirToData(String assetDir, String dir) {
        String[] files;
        try {
            files = assetManager.list(assetDir);
        } catch (IOException e1) {
            e1.printStackTrace();
            return;
        }
        File mWorkingPath = new File(dir);
        if (!mWorkingPath.exists()) {
            mWorkingPath.mkdirs();
        }
        for (int i = 0; i < files.length; i++) {
            try {
                String fileName = files[i];
                if (!fileName.contains(".")) {
                    if (0 == assetDir.length()) {
                        copyAssertDirToData( fileName, dir + fileName + "/");
                    } else {
                        copyAssertDirToData( assetDir + "/" + fileName, dir +"/"+fileName);
                    }
                    continue;
                }
                File outFile = new File(mWorkingPath, fileName);
                if (outFile.exists()) {
                    outFile.delete();
                }
                InputStream in = null;
                if (0 != assetDir.length()){
                    in = assetManager.open(assetDir + "/" + fileName);
                }else{
                    in = assetManager.open(fileName);
                }
                OutputStream out = new FileOutputStream(outFile);
                byte[] buf = new byte[1024];
                int len;
                while ((len = in.read(buf)) > 0) {
                    out.write(buf, 0, len);
                }
                in.close();
                out.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
