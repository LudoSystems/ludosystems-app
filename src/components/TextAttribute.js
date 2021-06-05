import React, { memo, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { ReactComponent as EditButton } from '../svg/button-edit.svg';
import { ReactComponent as DragButton } from '../svg/button-drag.svg';
import { ReactComponent as DeleteButton } from '../svg/button-delete.svg';
import { ReactComponent as CancelButton } from '../svg/button-cancel.svg';
import { ReactComponent as ConfirmButton } from '../svg/button-confirm.svg';

import AttributeService from "../services/AttributeService";

const textAttributeSchema = Yup.object().shape({
    // TODO: include a character counter.
    title: Yup.string()
        .required("Required")
        .max(255, "Title can be max 255 characters."),
    // TODO: include a character counter.
    text: Yup.string()
        .max(4096, "Text can be max 4096 characters."),
});

const TextAttribute = memo((props) => {
    const [editing, setEditing] = useState(false);

    const [title, setTitle] = useState(props.title);
    const [text, setText] = useState(props.text);

    const [initialValues, setInitialValues] =  useState({
        id: props.attributeId,
        title: title,
        text: text,
    });

    const onTextEditorChange = (textEditor) => {
        if(textEditor != null) {
            textEditor.style.height = "";
            textEditor.style.height = textEditor.scrollHeight + "px";
        }
    };

    const submitForm = (values) => {
        setEditing(false);
        setTitle(values.title);
        setText(values.text);

        AttributeService.updateTextAttribute(values.id, values.title, values.text).then(
            (response) => {
                if(values.title !== response.data.title) {
                    setTitle(response.data.title);
                }
                if(values.text !== response.data.text) {
                    setText(response.data.text);
                }

                setInitialValues(prevValue => ({
                    id: prevValue.id,
                    title: response.data.title,
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
    };

    const onDeleteClick = (e) => {
        AttributeService.deleteTextAttribute(props.attributeId).then(
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
                validationSchema={textAttributeSchema}
                onSubmit={submitForm}
            >
                {(formik) => {
                    const { errors, touched, isValid, dirty } = formik;
    
                    return (
                        <div className="node-attribute editor text-attribute-editor">
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
                                <div className="attribute-text editor">
                                    <label htmlFor="text">Text</label>
                                    <Field
                                        as="textarea"
                                        name="text"
                                        id="text"
                                        innerRef={onTextEditorChange}
                                        className={errors.text && touched.text ? "input-error" : null}
                                    />
                                    <ErrorMessage name="text" component="span" className="error" />
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
                    <div className="attribute-text display">
                        {text}
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
                            // TODO no on Click, this should be a drag handle
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

export default TextAttribute;