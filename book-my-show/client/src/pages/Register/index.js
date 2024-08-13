import React from "react";
import { Form, Button, Input, message, Radio } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../api/users";

function Register() {
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <main className="App-header">
        <h1>Register to Book My Show</h1>
        <section className="mw-500 text-center px-3">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              htmlFor="name"
              name="name"
              className="d-block"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
              ></Input>
            </Form.Item>
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                id="email"
                type="text"
                placeholder="Enter your email"
              ></Input>
            </Form.Item>
            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              ></Input>
            </Form.Item>
            <Form.Item className="d-block">
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ fontSize: "1.5rem", fontWeight: "600" }}
              >
                Register
              </Button>
              <Form.Item
                label="Register as a Partner"
                htmlFor="role"
                name="role"
                className="d-block text-center"
                initialValue={false}
                rules={[{ required: true, message: "Please select an option" }]}
              >
                <div>
                  <Radio.Group name="radiogroup" className="flex-start">
                    <Radio value={"partner"}>Yes</Radio>
                    <Radio value={"user"}>No</Radio>
                  </Radio.Group>
                </div>
              </Form.Item>
            </Form.Item>
            <div>
              <p>
                Already a User? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </section>
      </main>
    </>
  );
}

export default Register;
