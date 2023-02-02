import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Popconfirm, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import {
  deleteUserAction,
  getUserAction,
  updateUserAction,
} from "../../../redux/actions/UserAction";

export default function User() {
  //Table's variants
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  //Component's variants
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.userListReducer);
  const handleSubmit = (value) => {
    dispatch(updateUserAction(value));
  };

  const columns = [
    {
      title: "No.",
      key: "userId",
      render: (item) => {
        return <div>{userList.indexOf(item) + 1}</div>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
      ...getColumnSearchProps("userId"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "userId",
      render: (dataIndex, userInfo) => (
        <div>
          <EditOutlined
            className="btn btn-primary mr-2"
            onClick={() => {
              console.log("userInfo: ", userInfo);
              setUser(userInfo);
              setOpen(true);
            }}
          />

          <Popconfirm
            title="Delete user"
            description="Are you sure to delete this user?"
            onConfirm={() => {
              dispatch(deleteUserAction(dataIndex));
            }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="btn btn-danger"></DeleteOutlined>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // useEffect(() => {
  //   form.setFieldsValue({
  //     id: user?.userId,
  //     email: user?.email,
  //     name: user?.name,
  //     phoneNumber: user?.phoneNumber,
  //   });
  // }, [user]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        id: user.userId,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user]);


  useEffect(() => {
    dispatch(getUserAction);
  }, []);

  return (
    <div className="mx-2 w-3/4 mt-4">
      <Table columns={columns} rowKey={"userId"} dataSource={userList} />
      <Modal
        forceRender //Force render Modal
        title={
          <h5 className="ant-typography text-base mb-3">
            Edit User
            <hr />
          </h5>
        }
        width={600}
        centered
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={[]}
        open={open}
      >
        <Form     
          form={form}
          layout="vertical"
          name="edit-user"
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="id"
            label={<span className="font-semibold">Id</span>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span className="font-semibold">Email</span>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="name"
            label={<span className="font-semibold">Name</span>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label={<span className="font-semibold">Phone Number</span>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            type="password"
            name="passWord"
            label={<span className="font-semibold">Password</span>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>

          <Space className="d-flex justify-end mt-2">
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                Update
              </Button>
            </Form.Item>

            <Form.Item>
              <Button onClick={() => setOpen(false)} size="large">Cancel</Button>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </div>
  );
}
