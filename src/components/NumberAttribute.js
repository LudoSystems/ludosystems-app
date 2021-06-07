import React, { useState, memo } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { ReactComponent as EditButton } from '../svg/button-edit.svg';
import { ReactComponent as DragButton } from '../svg/button-drag.svg';
import { ReactComponent as DeleteButton } from '../svg/button-delete.svg';
import { ReactComponent as CancelButton } from '../svg/button-cancel.svg';
import { ReactComponent as ConfirmButton } from '../svg/button-confirm.svg';

import AttributeService from "../services/AttributeService";

const numberAttributeSchema = Yup.object().shape({
    // TODO: include a character counter.
    title: Yup.string()
        .required("Required")
        .max(255, "Title can be max 255 characters"),
    number: Yup.number()
        .integer("Must be an integer")
        .lessThan(2147483647, "Must be below 2,147,483,647")
        .moreThan(-2147483647, "Must be above -2,147,483,647")
        .nullable(true),
});

const NumberAttribute = memo((props) => {
    const [editing, setEditing] = useState(false);

    const [title, setTitle] = useState(props.title);
    const [number, setNumber] = useState(props.number);

    const [initialValues, setInitialValues] =  useState({
        id: props.attributeId,
        title: title,
        number: number,
    });

    const onNumberEditorInitialize = (numberEditor) => {
        if(numberEditor !== null) {
            numberEditor.focus();
        }
    };

    const submitForm = (values) => {
        setEditing(false);

        setTitle(values.title);
        setNumber(values.number);

        AttributeService.updateNumberAttribute(values.id, values.title, values.number).then(
            (response) => {
                if(values.title !== response.data.title) {
                    setTitle(response.data.title);
                }

                if(values.number !== response.data.number) {
                    setNumber(response.data.number);
                }

                setInitialValues(prevValue => ({
                    id: prevValue.id,
                    title: response.data.title,
                    number: response.data.number,
                }));
            },
            (error) => {
                props.handleError(error);
            }
        );
    };
    
    const onEditClick = (e) => {
        setEditing(true);
    };

    const onCancelClick = (e) => {
        setEditing(false);
    }


    const onDeleteClick = (e) => {
        AttributeService.deleteNumberAttribute(props.attributeId).then(
            (response) => {
                props.deleteAttribute(props.attributeId);
            },
            (error) => {
                props.handleError(error);
            }
        );
    }

    return (
        <>
        {editing ? (
            <Formik
                initialValues={initialValues}
                validationSchema={numberAttributeSchema}
                onSubmit={submitForm}
            >
                {(formik) => {
                    const { errors, touched, isValid, dirty, setFieldValue } = formik;
    
                    return (
                        <div className="node-attribute editor number-attribute">
                            <Form>
                                <div className="attribute-title editor">
                                    <label htmlFor="title">Title</label>
                                    <Field
                                        type="text"
                                        name="title"
                                        id="title"
                                        className={errors.title && touched.title ? "input-error" : null}
                                    />
                                    <ErrorMessage name="title" component="span" className="error" />
                                </div>
                                <div className="attribute-number editor">
                                    <label htmlFor="number">Number</label>
                                    <Field
                                        type="number"
                                        name="number"
                                        id="number"
                                        innerRef={onNumberEditorInitialize}
                                        onChange={e => {
                                            e.preventDefault();
                                            const { value } = e.target;
                                            const regex = /^[-+]?\d+$/;
                                            if (regex.test(value.toString())) {
                                              setFieldValue("number", value);
                                            }
                                        }}
                                        className={errors.number && touched.number ? "input-error" : null}
                                    />
                                    <ErrorMessage name="number" component="span" className="error" />
                                </div>
                                <Field type="hidden" name="id" id="id" /> 
                                <div className="button-panel editing">
                                    <button
                                        title="Confirm"
                                        type="submit"
                                        className={"node-attribute-button confirm" + (dirty && isValid ? "" : " disabled")}
                                        disabled={!(dirty && isValid)}
                                    >
                                        <ConfirmButton />
                                    </button>
                                    <button
                                        title="Cancel"
                                        type="reset"
                                        className="node-attribute-button cancel"
                                        onClick={onCancelClick}>
                                        <CancelButton />
                                    </button>
                                    <button 
                                        title="Delete"
                                        type="button"
                                        className="node-attribute-button delete"
                                        onClick={onDeleteClick}
                                        >
                                        <DeleteButton />
                                    </button>
                                </div>
                            </Form>
                        </div>
                    );
                }}
            </Formik>
        ) : (
            <>
                <div className="node-attribute display">
                    <div className="attribute-title display">
                        {title}
                    </div>
                    <div className="attribute-number display">
                        {number}
                    </div>
                    <div className="button-panel viewing">
                        <button 
                            title="Edit"
                            className="node-attribute-button edit"
                            onClick={onEditClick}
                        >
                            <EditButton />
                        </button>
                        <button 
                            title="Coming soon!"
                            className="node-attribute-button drag disabled"
                        >
                            <DragButton />
                        </button>
                    </div>
                </div>
            </>
        )}
    </>
    );
});

export default NumberAttribute;