import React, { useState, useEffect } from "react";
import { Button, Space, Table, Tag } from "antd";
import parse from "html-react-parser";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

export default function ProjectManagement() {
  //Lấy dữ liệu từ reducer về component
  const projectList = useSelector(
    (state) => state.ProjectCyberBugsReducer.projectList
  );

  //sử dụng useDispatch để gọi action
  const dispath = useDispatch();

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  useEffect(() => {
    dispath({ type: "GET_LIST_PROJECT_SAGA" });
  },[]);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({
      filteredInfo: null,
    });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      setSortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  //   sortedInfo = sortedInfo || {};
  //   filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
    },
    // {
    //   title: "description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text, record, index) => {
    //     let jsxContent = parse(text);
    //     return <div key={index}>{jsxContent}</div>;
    //   },
    // },
    {
      title: "category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "creator",
      // dataIndex: "creator",
      key: "creator",
      render:(text,record,index)=>{
        // console.log(record);
        return <Tag color="green">{record.creator?.name}</Tag>
      }
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <button
            className="btn btn-primary"
            onClick={() => {
              //delete(record.id)
            }}
          >
            <FormOutlined />
          </button>

          <button className="btn btn-danger"
            onClick={() => {
              //delete(record.id)
            }}>
            <DeleteOutlined />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h3>Project Management</h3>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort} type="primary">
          Sort age
        </Button>
        <Button onClick={clearFilters} type="primary">
          Clear filters
        </Button>
        <Button onClick={clearAll} type="primary">
          Clear filters and sorters
        </Button>
      </Space>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}
