import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector, useDispatch } from "react-redux";

function CreateProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  const dispatch = useDispatch();


  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    props;


  useEffect(() => {
    //Gọi api để lấy dữ liệu thẻ select
    dispatch({ type: "GET_ALL_PROJECT_CATEGORY_SAGA" });
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue('description', content)
  };

  return (
    <div className="container mt-4">
      <h3>Create Project</h3>
      <form className="container" onSubmit={handleSubmit} onChange={handleChange}>
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName" />
        </div>
        <div className="form-group">
          <p>Description</p>
          <>
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
          </>
        </div>
        <div className="form-group">
          <select name="categoryId" className="form-control" onChange={handleChange}>
            {/* <option>Software</option>
            <option>Web</option>
            <option>App</option> */}
            {arrProjectCategory.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Create Project
        </button>
      </form>
    </div>
  );
}

const createProjectForm = withFormik({
  enableReinitialize:true,
  mapPropsToValues: (props) => {

    // console.log("props value",props);

    return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id
    };
  },

  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: "CREATE_PROJECT_SAGA",
      newProject: values
    })
  },

  displayName: "CreateProjectFormik",
})(CreateProject);

const mapStateToProps = (state) => ({

  arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,

});

export default connect(mapStateToProps)(createProjectForm);
