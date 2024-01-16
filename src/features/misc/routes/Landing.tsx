import { Button, Title } from "@mantine/core";
import classes from "./landing.module.css";

export function Landing() {
  return (
    <div className={classes.container}>
      <Title>Eligos</Title>
      <Button radius="xl">Get Started</Button>
    </div>
  );
}
