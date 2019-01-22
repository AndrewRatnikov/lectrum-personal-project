import React from "react";
import { mount } from "enzyme";

import Task from "../index";

const mocks = {
    onCheckedHandler: jest.fn(),
    onDeleteHandler:  jest.fn(),
    onSaveHandler:    jest.fn(),
};

const baseTaskModel = {
    id:        "123",
    completed: false,
    favorite:  false,
    message:   "Write test",
};

const updatedTaskModel = {
    id:        "456",
    completed: true,
    favorite:  true,
    message:   "Write updated test",
};

const props = {
    ...baseTaskModel,
    onCheckedHandler: mocks.onCheckedHandler,
    onDeleteHandler:  mocks.onDeleteHandler,
    onSaveHandler:    mocks.onSaveHandler,
};

const result = mount(<Task { ...props } />);

const spies = {
    _getTaskShapeSpy:      jest.spyOn(result.instance(), "_getTaskShape"),
    _updateTaskSpy:        jest.spyOn(result.instance(), "_updateTask"),
    _cancelEditingTaskSpy: jest.spyOn(result.instance(), "_cancelEditingTask"),
};

afterEach(() => {
    result.setState(baseTaskModel);
});

describe("Component Task", () => {
    describe("JSX", () => {
        test("to match snapshot", () => {
            expect(result).toMatchSnapshot();
        });
        describe("have ref input element", () => {
            test("ref element called 'taskRef'", () => {
                expect(result.instance().taskRef).toBeDefined();
            });
            test("ref element created with createRef", () => {
                expect(result.instance().taskRef.current).toBeDefined();
            });
            test("ref element is input", () => {
                expect(result.instance().taskRef.current).toBeInstanceOf(
                    HTMLInputElement
                );
            });
        });
    });
    describe("have init state", () => {
        describe("to have 'editing' property", () => {
            test("to be defined", () => {
                expect(result.state("editing")).toBeDefined();
            });
            test("to be falsy", () => {
                expect(result.state("editing")).toBeFalsy();
            });
        });
        describe("to have 'message' property", () => {
            test("to be defined", () => {
                expect(result.state("message")).toBeDefined();
            });
            test("to be string", () => {
                expect(typeof result.state("message")).toBe("string");
            });
        });
        describe("to have 'completed' property", () => {
            test("to be defined", () => {
                expect(result.state("completed")).toBeDefined();
            });
            test("to be falsy", () => {
                expect(result.state("completed")).toBeFalsy();
            });
        });
        describe("to have 'favorite' property", () => {
            test("to be defined", () => {
                expect(result.state("favorite")).toBeDefined();
            });
            test("to be falsy", () => {
                expect(result.state("favorite")).toBeFalsy();
            });
        });
    });
    describe("have methods", () => {
        describe("_getTaskShape", () => {
            test("to be defined", () => {
                expect(typeof result.instance()._getTaskShape).toBe("function");
            });
            test("return base model", () => {
                result.instance()._getTaskShape({});
                expect(spies._getTaskShapeSpy).toReturnWith(baseTaskModel);
            });
            test("must receive model", () => {
                result.instance()._getTaskShape(updatedTaskModel);
                expect(spies._getTaskShapeSpy).toHaveBeenCalledWith(
                    updatedTaskModel
                );
            });
            test("must return model", () => {
                result.instance()._getTaskShape(updatedTaskModel);
                expect(spies._getTaskShapeSpy).toReturnWith(updatedTaskModel);
            });
        });
        describe("_cancelEditingTask", () => {
            test("to be defined", () => {
                expect(typeof result.instance()._cancelEditingTask).toBe(
                    "function"
                );
            });
            test("must set state editing in false", () => {
                result.setState({ editing: true });
                expect(result.state("editing")).toBeTruthy();
                result.instance()._cancelEditingTask();
                expect(result.state("editing")).toBeFalsy();
            });
            test("must set message from props", () => {
                const newMessage = "some another string";

                result.setState({ message: newMessage });
                expect(result.state("message")).toBe(newMessage);
                result.instance()._cancelEditingTask();
                expect(result.state("message")).toBe(baseTaskModel.message);
            });
        });
        describe("_updateTask", () => {
            test("to be defined", () => {
                expect(typeof result.instance()._updateTask).toBe("function");
            });
            test("must set state editing in false", () => {
                result.setState({ editing: true });
                expect(result.state("editing")).toBeTruthy();
                result.instance()._updateTask();
                expect(result.state("editing")).toBeFalsy();
            });
            test("must call props method onSaveHandler", () => {
                result.instance()._updateTask();
                expect(mocks.onSaveHandler).toHaveBeenCalled();
            });
        });
        describe("_updateTaskHandler", () => {
            test("to be defined", () => {
                expect(typeof result.instance()._updateTaskHandler).toBe(
                    "function"
                );
            });
            test("must stoped when message is empty", () => {
                result.setState({ message: "" });
                expect(result.instance()._updateTaskHandler()).toBeUndefined();
            });
            test("must call _updateTask after enter", () => {
                result.instance()._updateTaskHandler({ key: "Enter" });
                expect(spies._updateTaskSpy).toBeCalled();
            });
            test("must call _cancelEditingTask after escape", () => {
                result.instance()._updateTaskHandler({ key: "Escape" });
                expect(spies._cancelEditingTaskSpy).toBeCalled();
            });
            test("must do nothing when athers keys are pressed", () => {
                expect(
                    result.instance()._updateTaskHandler({ key: "d" })
                ).toBeUndefined();
            });
        });
        describe("_toggleEditCreatedTask", () => {
            test("to be defined", () => {
                expect(typeof result.instance()._toggleEditCreatedTask).toBe(
                    "function"
                );
            });
        });
    });
});
