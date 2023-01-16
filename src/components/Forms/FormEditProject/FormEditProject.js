import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";

export default function FormEditProject(props) {
  //   const { setFieldValue } = props;
  const dispatch = useDispatch();
  const submitForm = (e) => {
    e.preventDefault();
    alert("submit edit");
  };

  useEffect(() => {
    dispatch({ type: "SET_SUBMIT_EDIT_PROJECT", submitFunction: submitForm });
  }, []);

  const handleEditorChange = (content, editor) => {
    // setFieldValue("description", content);
  };

  return (
    <form className="container-fluid" onSubmit={submitForm}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Id</p>
            <input disabled className="form-control" name="id" />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Name</p>
            <input className="form-control" name="projectName" />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Category Id</p>
            <input className="form-control" name="categoryId" />
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              name="description"
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
          </div>
        </div>
      </div>
    </form>
  );
}
