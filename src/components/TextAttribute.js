import React, { useState, memo } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { ReactComponent as EditButton } from '../svg/button-edit.svg';
import { ReactComponent as DragButton } from '../svg/button-drag.svg';
import { ReactComponent as DeleteButton } from '../svg/button-delete.svg';
import { ReactComponent as CancelButton } from '../svg/button-cancel.svg';
import { ReactComponent as ConfirmButton } from '../svg/button-confirm.svg';
import { ReactComponent as AddButton } from '../svg/button-add.svg';
import { ReactComponent as AddTextButton } from '../svg/button-add-text.svg';
import { ReactComponent as AddNumberButton } from '../svg/button-add-number.svg';
import { ReactComponent as AddListButton } from '../svg/button-add-list.svg';
import { ReactComponent as AddNodeButton } from '../svg/button-add-node.svg';

import AttributeService from "../services/AttributeService";

const textAttributeSchema = Yup.object().shape({
    // TODO: include a character counter.
    name: Yup.string()
        .required("Required")
        .max(255, "Name can be max 255 characters."),
    // TODO: include a character counter.
    text: Yup.string()
        .max(4096, "Text can be max 4096 characters."),
});

const TextAttribute = memo((props) => {
    const [editing, setEditing] = useState(false);

    const [name, setName] = useState(props.name);
    const [text, setText] = useState(props.text);

    const [initialValues, setInitialValues] =  useState({
        id: props.attributeId,
        name: name,
        text: text,
    });

    const submitForm = (values) => {
        setEditing(false);

        AttributeService.updateTextAttribute(values.id, values.name, values.text).then(
            (response) => {
                console.log(response);

                setName(response.data.name);
                setText(response.data.text);
                setInitialValues(prevValue => ({
                    id: prevValue.id,
                    name: response.data.name,
                    text: response.data.text,
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
                validationSchema={textAttributeSchema}
                onSubmit={submitForm}
            >
                {(formik) => {
                    const { errors, touched, isValid, dirty } = formik;
    
                    return (
                        <div className="node-attribute-display">
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
                                    <label htmlFor="text">Text</label>
                                    <Field
                                        as="textarea"
                                        name="text"
                                        id="text"
                                        className={errors.text && touched.text ? "input-error" : null}
                                    />
                                    <ErrorMessage name="text" component="span" className="error" />
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
                    <div className="node-attribute-display-name">
                        {name}
                    </div>
                    <div className="node-attribute-display-text">
                        {text}
                    </div>
                    <button 
                        className="node-attribute-button edit"
                        onClick={onEditClick}
                    >
                    Edit
                    </button>
                </div>
                <div style={{display:"flex"}}>
                    <EditButton />
                    <DragButton />
                    <DeleteButton />
                    <CancelButton />
                    <ConfirmButton />
                    <AddButton />
                    <AddTextButton />
                    <AddNumberButton />
                    <AddListButton />
                    <AddNodeButton />
                </div>

            </>
        )}
    </>
    );
});

export default TextAttribute;