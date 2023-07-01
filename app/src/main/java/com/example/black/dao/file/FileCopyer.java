package com.example.black.dao.file;

import java.io.File;
import java.io.IOException;

public interface FileCopyer {
    File doWith(String resource, String target) throws IOException;
}
