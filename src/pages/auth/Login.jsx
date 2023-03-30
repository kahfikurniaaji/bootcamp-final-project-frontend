import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { login } from "@/api/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useID } from "@/context";
import jwt_decode from "jwt-decode";

function Login() {
  const { id, setId } = useID();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard/home");
    }
    return () => {};
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("click");
    const response = await login({ username, password })
      .then((response) => {
        navigate("/dashboard/home");
        return response;
      })
      .catch((error) => {
        navigate("/");
      });
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-gray-200">
      <Card className="bg-white p-4" color="transparent" shadow={true}>
        <Typography variant="h4" color="blue-gray" className="text-center">
          Login
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-6">
            <Input
              size="lg"
              label="Username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
