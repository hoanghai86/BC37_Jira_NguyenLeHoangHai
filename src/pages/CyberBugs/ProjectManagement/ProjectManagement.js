import React, { useState, useEffect } from "react";
import {
  Button,
  Space,
  Table,
  Tag,
  Popconfirm,
  message,
  Avatar,
  Popover,
  AutoComplete,
} from "antd";
import parse from "html-react-parser";
import { DeleteOutlined, FormOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import FormEditProject from "../../../components/Forms/FormEditProject/FormEditProject";

export default function ProjectManagement() {
  //Lấy dữ liệu từ reducer về component
  const projectList = useSelector(
    (state) => state.ProjectCyberBugsReducer.projectList
  );

  //sử dụng useDispatch để gọi action
  const dispatch = useDispatch();

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  useEffect(() => {
    dispatch({ type: "GET_LIST_PROJECT_SAGA" });
  }, []);

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
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      sortDirections: ["descend"],
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
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
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "creator",
      // dataIndex: "creator",
      key: "creator",
      render: (text, record, index) => {
        // console.log(record);
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: "members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return <Avatar key={index} src={member.avatar} />;
            })}

            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}

            <Popover
              placement="rightTop"
              title={"Add User"}
              content={()=>{
                return <AutoComplete style={{width: "100%"}} placeholder="input here"/>
              }}
              trigger="click"
            >
              <Button size="small" shape="circle">+</Button>
            </Popover>
          </div>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <button
            className="btn btn-primary"
            onClick={() => {
              const action = {
                type: "OPEN_FORM_EDIT_PROJECT",
                Component: <FormEditProject />,
              };

              //dispatch lên reducer nội dung drawer
              dispatch(action);

              //dispatch dữ liệu dòng hiện tại lên reducer
              const actionEditProject = {
                type: "EDIT_PROJECT",
                projectEditModel: record,
              };
              dispatch(actionEditProject);
            }}
          >
            <FormOutlined />
          </button>

          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this project?"
            onConfirm={() => {
              dispatch({ type: "DELETE_PROJECT_SAGA", idProject: record.id });
            }}
            okText="Yes"
            cancelText="No"
          >
            <button
              className="btn btn-danger"
              // onClick={}
            >
              <DeleteOutlined />
            </button>
          </Popconfirm>
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
