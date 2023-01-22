import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Radio, Select, Space, Slider } from "antd";
import { useState } from "react";

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36)}</Option>);
}

export default function FormCreateTask(props) {
  const [size, setSize] = useState("default");

  const [timeTracking, setTimetracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 10,
  });

  const {
    values,
    touched,
    errors,
    // handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  return (
    <div className="container">
      <div className="form-group">
        <p>Project</p>
        <select name="projectId" className="form-control">
          <option value="54">Project A</option>
          <option value="55">Project B</option>
        </select>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priority</p>
            <select name="priorityId" className="form-control">
              <option>High</option>
              <option>Low</option>
            </select>
          </div>
          <div className="col-6">
            <p>Task type</p>
            <select className="form-control" name="typeId">
              <option>New task</option>
              <option>Bugs</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Assignees</p>
            <Select
              mode="multiple"
              size={size}
              options={[
                { value: "a12", label: "b12" },
                { value: "a12", label: "b12" },
                { value: "a12", label: "b12" },
              ]}
              placeholder="Please select"
              defaultValue={["a10", "c12"]}
              onChange={handleChange}
              style={{
                width: "100%",
              }}
            >
              {children}
            </Select>
            <div className="row"></div>
          </div>
          <div className="col-6">
            <p>Time Tracking</p>
            <Slider
              defaultValue={30}
              value={timeTracking.timeTrackingSpent}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
              // tooltip={{
              //   open: true,
              // }}
            />
            <div className="row">
              <div className="col text-left font-semibold">{timeTracking.timeTrackingSpent}h logged</div>
              <div className="col text-right font-semibold">{timeTracking.timeTrackingRemaining}h remaining</div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Original Estimate</p>
            <input
              type="number"
              min="0"
              name="originalEstimate"
              defaultValue="0"
              className="form-control"
            />
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <p>Time spent</p>
                <input
                  type="number"
                  defaultValue="0"
                  min="0"
                  className="form-control"
                  name="timeTrackingSpent"
                  onChange={(e) => {
                    setTimetracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="col-6">
                <p>Time remaining</p>
                <input
                  type="number"
                  defaultValue="10"
                  min="0"
                  className="form-control"
                  name="timeTrackingRemaining"
                  onChange={(e) => {
                    setTimetracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
}
