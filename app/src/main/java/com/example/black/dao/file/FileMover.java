package com.example.black.dao.file;

import java.io.File;

public interface FileMover {
    File doWith(String resource, String target);
}
