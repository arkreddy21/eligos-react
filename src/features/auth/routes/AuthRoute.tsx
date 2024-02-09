import {
  Button,
  PasswordInput,
  TextInput,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import { useToggle, useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { login, register } from "../api/auth";
import classes from "./auth.module.css";

export function AuthRoute() {
  const [type, toggle] = useToggle(["Login", "Register"]);
  const [loading, loader] = useDisclosure(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate({ from: "/auth" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loader.open();
    if (type === "Login") {
      try {
        await login({ email, password });
        navigate({ to: "/spaces" });
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        loader.close();
      }
    } else {
      try {
        await register({ name, email, password });
        await login({ email, password });
        navigate({ to: "/spaces" });
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        loader.close();
      }
    }
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Title order={2}>{type}</Title>
        {type === "Register" && (
          <TextInput
            id="username"
            label="Name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        )}
        <TextInput
          id="email"
          label="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordInput
          id="password"
          label="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {error !== "" && <Text c="red">{error}</Text>}
        <Button type="submit" loading={loading}>
          {type}
        </Button>
        <Anchor
          component="button"
          type="button"
          onClick={() => toggle()}
          size="xs"
        >
          {type === "Register"
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </Anchor>
      </form>
    </div>
  );
}
