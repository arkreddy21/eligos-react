import { Button, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import classes from "./landing.module.css";

export function Landing() {
  return (
    <div className={classes.container}>
      <Title>Eligos</Title>
      <Button component={Link} to="/auth" radius="xl">
        Get Started
      </Button>
    </div>
  );
}
