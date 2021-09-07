import React from "react";
import { Title } from "../../components/template";
import { Page } from "../../interfaces";

export function Profile(props: Page) {
  return <Title title={props.title} />
}
