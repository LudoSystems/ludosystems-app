import React, { useState, memo } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
                        <div className="login-container">
                            <Form>
                                <div className="form-row">
                                    <label htmlFor="name">Name</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        id="name"
                                        className={errors.name && touched.name ? "input-error" : null}
                                    />
                                    <ErrorMessage name="name" component="span" className="error" />
                                </div>
                                <div className="form-row">
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
                                <button
                                    type="submit"
                                    className={dirty && isValid ? "" : "disabled-btn"}
                                    disabled={!(dirty && isValid)}
                                >
                                Save
                                </button>
                                <button
                                    className="node-attribute-button cancel"
                                    onClick={onCancelClick}>
                                    Cancel
                                </button>
                            </Form>
                        </div>
                    );
                }}
            </Formik>
        ) : (
            <>
                <div className="node-attribute-display">
                    <span className="node-attribute-display-name">
                        {name}
                    </span>
                    <span className="node-attribute-display-number">
                        {number}
                    </span>
                </div>
                <button 
                    className="node-attribute-button edit"
                    onClick={onEditClick}
                >
                    Edit
                </button>
            </>
        )}
    </>
    );
});

export default NumberAttribute;