import React from "react";
import { mount } from "enzyme";
import Task from "../index";
const mocks = {
    onCheckedHandler: jest.fn(),
    onDeleteHandler:  jest.fn(),
    onSaveHandler:    jest.fn(),
};
const baseTaskModel = {
    id:        123,
    completed: false,
    favorite:  false,
    message:   "Do test",
};
const props = {
    ...baseTaskModel,
    onCheckedHandler: mocks.onCheckedHandler,
    onDeleteHandler:  mocks.onDeleteHandler,
    onSaveHandler:    mocks.onSaveHandler,
};
const result = mount(<Task { ...props } />);
