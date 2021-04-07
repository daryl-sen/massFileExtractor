# Mass File Extractor

Extracts multiple files from multiple folders and move them all into one folder.

For example, if you download all your photos from Instagram using the "Download Data" function, Instagram will package all your photos into individual folders named after the year and month they were uploaded. You end up with folders with many subfolders each containing some photos. If you want all the photos in a single folder, massFileExtractor will come to the rescue!

## Warning

This action is NOT REVERSIBLE! Once you have extracted all the files from the directory, you cannot undo it! If you prefer to keep the file structure, copy your folder into the `target` folder instead of moving it. 

## Instructions

1. Locate the directory (folder) you want to extract from. Move or copy the directory into the "target folder". (Optional: alternatively, modify `SOURCE_DIR` inside mover.js).
