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
    name: Yup.string()
        .required("Required")
        .max(255, "Name can be max 255 characters."),
    number: Yup.number()
        .integer()
        .nullable(true),
});

const NumberAttribute = memo((props) => {
    const [editing, setEditing] = useState(false);

    const [name, setName] = useState(props.name);
    const [number, setNumber] = useState(props.number);

    const [initialValues, setInitialValues] =  useState({
        id: props.attributeId,
        name: name,
        number: number,
    });

    const submitForm = (values) => {
        setEditing(false);

        AttributeService.updateNumberAttribute(values.id, values.name, values.number).then(
            (response) => {
                console.log(response);

                setName(response.data.name);
                setNumber(response.data.number);
                setInitialValues(prevValue => ({
                    id: prevValue.id,
                    name: response.data.name,
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
                    const { errors, touched, isValid, dirty } = formik;
    
                    return (
                        <div className="node-attribute editor number-attribute">
                            <Form>
                                <div className="attribute-name editor">
                                    <label htmlFor="name">Name</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        id="name"
                                        className={errors.name && touched.name ? "input-error" : null}
                                    />
                                    <ErrorMessage name="name" component="span" className="error" />
                                </div>
                                <div className="attribute-number editor">
                                    <label htmlFor="number">Number</label>
                                    <Field
                                        type="number"
                                        name="number"
                                        id="number"
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
                    <div className="attribute-name display">
                        {name}
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
                            // no on Click, this should be a drag handle
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