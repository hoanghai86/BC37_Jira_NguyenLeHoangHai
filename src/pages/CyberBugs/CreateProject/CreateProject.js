import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function CreateProject() {
  const handleEditorChange = (content, editor) => {
    console.log("Content", content);
    console.log("Content", editor);
  };

  return (
    <div className="container m-5">
      <h3>Create Project</h3>
      <form className="container">
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName" />
        </div>
        <div className="form-group">
          <p>Description</p>
          <>
            <Editor
              initialValue=""
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
              }}
              onEditorChange={handleEditorChange}
            />
          </>
        </div>
        <div className="form-group">
          <select name="categoryId" className="form-control">
            <option>Software</option>
            <option>Web</option>
            <option>App</option>
          </select>
        </div>
        <button className="btn btn-outline-primary" type="submit">
          Create Project
        </button>
      </form>
    </div>
  );
}
