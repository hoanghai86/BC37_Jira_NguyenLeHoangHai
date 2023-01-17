import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";

function FormEditProject(props) {
  //   const { setFieldValue } = props;

  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  const dispatch = useDispatch();

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  // const submitForm = (e) => {
  //   e.preventDefault();
  //   alert("submit edit");
  // };

  //componentDidMount
  useEffect(() => {
    //Load api load project category
    dispatch({ type: "GET_ALL_PROJECT_CATEGORY_SAGA" });

    //Load sự kiện submit lên drawer nút submit
    dispatch({ type: "SET_SUBMIT_EDIT_PROJECT", submitFunction: handleSubmit });
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Id</p>
            <input
              value={values.id}
              disabled
              className="form-control"
              name="id"
              
            />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Name</p>
            <input
              value={values.projectName}
              className="form-control"
              name="projectName"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Category Id</p>
            <select name="categoryId" value={values.categoryId} onChange={handleChange}>
              {arrProjectCategory?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              name="description"
              // initialValue={values.description}
              value={values.description}
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

const EditProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit?.projectName,
      description: projectEdit?.description,
      categoryId: projectEdit?.categoryId,
    };
  },

  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    //Khi người dùng bấm submit => đưa dữ liệu về backend thông qua API
    // const action = {
    //   type: "UPDATE_PROJECT_SAGA",
    //   projectUpdate: values,
    // }
    //Gọi saga
    props.dispatch({
      type: "UPDATE_PROJECT_SAGA",
      projectUpdate: values,
    })
  },

  displayName: "EditProjectForm",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducer.projectEdit,
});

export default connect(mapStateToProps)(EditProjectForm);
