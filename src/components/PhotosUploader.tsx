import { useState } from "react";
import { Label } from "./Label";
import ImageUploading, { ImageListType } from "react-images-uploading";

export function PhotosUploader({
  label,
  onChange,
  max = 5,
}: {
  label: string;
  max?: number;
  onChange: (imageList: ImageListType) => void;
}) {
  const [images, setImages] = useState<ImageListType>([]);

  const handleChange = (
    imageList: ImageListType,
    addUpdateIndex?: Array<number>
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    onChange(imageList);
  };

  return (
    <div className="form-group">
      <Label label={label} />

      <ImageUploading
        multiple
        value={images}
        onChange={handleChange}
        maxNumber={max}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper grid grid-cols-4 max-w-[24rem] items-center gap-2">
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.map((image, index) => (
              <div
                key={index}
                className="group relative image-item rounded-md overflow-clip"
              >
                <img
                  src={image["data_url"]}
                  width={96}
                  className="object-cover max-w-24 aspect-square"
                />
                <button
                  className="absolute inset-0 w-full h-full bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onImageRemove(index)}
                >
                  <i className="fi fi-rr-trash text-3xl %translate-y-1" />
                </button>
              </div>
            ))}

            <button
              onClick={onImageUpload}
              className={`group grid place-content-center p-6 max-w-24 w-full aspect-square border rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors`}
              {...dragProps}
              >
              <i
                className={`fi fi-rr-add-image text-3xl translate-y-1 text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors ${
                  isDragging && "scale-75"
                }`}
              />
            </button>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
