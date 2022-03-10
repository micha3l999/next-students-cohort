import { type } from "os";
import { useEffect, useState } from "react";

interface FileUpload {
  picture: string;
  onChangePicture64(picture: any): void;
}

const FileUpload = (props: FileUpload) => {
  let imageUrl = props?.picture;
  useEffect(() => {
    imageUrl = props?.picture;
  }, [props.picture]);
  const [pictureUploaded, setPictureUploaded] = useState<any>();
  let currentdate = new Date();

  const onChangePicture = (fileInput: any) => {
    let reader = new FileReader();
    reader.addEventListener("load", function (evt) {
      setPictureUploaded(reader.result);
      props.onChangePicture64(reader.result);
    });
    reader.readAsDataURL(fileInput.target.files[0]);
  };

  return (
    <>
      <label className="label">Student picture</label>
      <div className="columns">
        <div className="column" />
        <div className="column has-text-centered">
          <figure
            className={`image is-256x256 is-inline-block ${
              imageUrl || pictureUploaded ? "" : "is-hidden"
            }`}
          >
            <img
              className=""
              src={
                pictureUploaded
                  ? pictureUploaded
                  : imageUrl + "?" + currentdate.toISOString()
              }
            />
          </figure>
        </div>
        <div className="column" />
      </div>
      <div className="file">
        <label className="file-label">
          <input
            className="file-input"
            type="file"
            accept="image/*"
            name="file_input"
            onChange={onChangePicture}
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">Choose a file…</span>
          </span>
        </label>
      </div>
    </>
  );
};

export default FileUpload;
