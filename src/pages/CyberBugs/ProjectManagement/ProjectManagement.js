import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import parse from "html-react-parser";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const data = [
  {
    id: 10450,
    projectName: "new Project 1",
    description: "new Project 1",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "new-project-1",
    deleted: false,
  },
  {
    id: 10455,
    projectName: "new project 2",
    description: "456",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "new-project-2",
    deleted: false,
  },
  {
    id: 10456,
    projectName: "new project 3",
    description: "<p>333</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "new-project-3",
    deleted: false,
  },
  {
    id: 10457,
    projectName: "new project 4",
    description: "<p>4</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "new-project-4",
    deleted: false,
  },
];

export default function ProjectManagement() {
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

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
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      render: (text, record, index) => {
        let jsxContent = parse(text);
        return <div key={index}>{jsxContent}</div>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <a
            onClick={() => {
              //delete(record.id)
            }}
          >
            <EditOutlined />
          </a>
          <a>
            <DeleteOutlined />
          </a>
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
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={data}
        onChange={handleChange}
      />
    </div>
  );
}
