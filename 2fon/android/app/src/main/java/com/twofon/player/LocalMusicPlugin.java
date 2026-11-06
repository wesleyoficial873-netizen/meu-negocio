package com.twofon.player;

import android.app.Activity;
import android.content.ContentResolver;
import android.content.Intent;
import android.database.Cursor;
import android.media.MediaMetadataRetriever;
import android.net.Uri;
import android.provider.DocumentsContract;
import android.util.Base64;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.security.MessageDigest;
import java.util.Locale;

/** Copies a user-selected tree to private app storage; no broad storage permission is needed. */
@CapacitorPlugin(name = "LocalMusic")
public class LocalMusicPlugin extends Plugin {
    @PluginMethod public void selectFolder(PluginCall call) {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);
        startActivityForResult(call, intent, "folderSelected");
    }
    @ActivityCallback private void folderSelected(PluginCall call, ActivityResult result) {
        if (call == null) return;
        if (result.getResultCode() != Activity.RESULT_OK || result.getData() == null || result.getData().getData() == null) {
            call.resolve(); return;
        }
        Uri tree = result.getData().getData();
        new Thread(() -> {
            try {
                String rootId = DocumentsContract.getTreeDocumentId(tree);
                String folder = rootId.contains(":") ? rootId.substring(rootId.indexOf(':') + 1) : rootId;
                if (folder.isEmpty()) folder = "Músicas";
                JSArray tracks = new JSArray();
                scan(tree, rootId, folder, tracks);
                JSObject value = new JSObject(); value.put("folder", folder); value.put("tracks", tracks); call.resolve(value);
            } catch (Exception e) { call.reject("Não foi possível importar a pasta: " + e.getMessage(), e); }
        }).start();
    }
    private void scan(Uri tree, String parent, String folder, JSArray tracks) throws Exception {
        ContentResolver resolver = getContext().getContentResolver();
        Uri children = DocumentsContract.buildChildDocumentsUriUsingTree(tree, parent);
        String[] cols = {DocumentsContract.Document.COLUMN_DOCUMENT_ID, DocumentsContract.Document.COLUMN_DISPLAY_NAME, DocumentsContract.Document.COLUMN_MIME_TYPE};
        try (Cursor cursor = resolver.query(children, cols, null, null, null)) {
            if (cursor == null) return;
            while (cursor.moveToNext()) {
                String id = cursor.getString(0), name = cursor.getString(1), mime = cursor.getString(2);
                if (DocumentsContract.Document.MIME_TYPE_DIR.equals(mime)) { scan(tree, id, folder, tracks); continue; }
                if (name == null || !name.toLowerCase(Locale.ROOT).matches(".*\\.(mp3|wav|flac|aac|m4a|ogg)$")) continue;
                Uri doc = DocumentsContract.buildDocumentUriUsingTree(tree, id);
                String key = hash(tree.toString() + ":" + id);
                String extension = name.substring(name.lastIndexOf('.') + 1).toLowerCase(Locale.ROOT);
                File dir = new File(getContext().getFilesDir(), "music"); if (!dir.exists() && !dir.mkdirs()) throw new Exception("Sem espaço para criar a biblioteca");
                File file = new File(dir, key + "." + extension);
                File temp = new File(dir, key + ".tmp");
                try (InputStream input = resolver.openInputStream(doc); FileOutputStream output = new FileOutputStream(temp)) {
                    if (input == null) throw new Exception("Arquivo indisponível: " + name);
                    byte[] buffer = new byte[65536]; int n; while ((n = input.read(buffer)) != -1) output.write(buffer, 0, n);
                }
                if (file.exists() && !file.delete()) throw new Exception("Falha ao substituir arquivo");
                if (!temp.renameTo(file)) throw new Exception("Falha ao salvar arquivo");
                JSObject t = new JSObject();
                t.put("id", "android:" + key); t.put("path", file.getAbsolutePath()); t.put("folder", folder); t.put("format", extension.toUpperCase(Locale.ROOT));
                String title = name.substring(0, name.lastIndexOf('.')), artist = "Artista desconhecido", album = "Álbum desconhecido", cover = ""; double duration = 0;
                MediaMetadataRetriever meta = new MediaMetadataRetriever();
                try {
                    meta.setDataSource(file.getAbsolutePath());
                    String v = meta.extractMetadata(MediaMetadataRetriever.METADATA_KEY_TITLE); if (v != null && !v.isEmpty()) title = v;
                    v = meta.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ARTIST); if (v != null && !v.isEmpty()) artist = v;
                    v = meta.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ALBUM); if (v != null && !v.isEmpty()) album = v;
                    v = meta.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DURATION); if (v != null) duration = Double.parseDouble(v) / 1000;
                    byte[] image = meta.getEmbeddedPicture(); if (image != null && image.length < 1000000) cover = "data:image/jpeg;base64," + Base64.encodeToString(image, Base64.NO_WRAP);
                } catch (Exception ignored) {} finally { try { meta.release(); } catch (Exception ignored) {} }
                t.put("title", title); t.put("artist", artist); t.put("album", album); t.put("cover", cover); t.put("duration", duration); tracks.put(t);
            }
        }
    }
    private String hash(String text) throws Exception {
        byte[] bytes = MessageDigest.getInstance("SHA-256").digest(text.getBytes("UTF-8")); StringBuilder b = new StringBuilder();
        for (byte value : bytes) b.append(String.format(Locale.ROOT, "%02x", value & 0xff)); return b.toString();
    }
}
