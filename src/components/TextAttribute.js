import React, { memo, useState, useCallback } from 'react';
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
    name: Yup.string()
        .required("Required")
        .max(255, "Name can be max 255 characters."),
    // TODO: include a character counter.
    text: Yup.string()
        .max(4096, "Text can be max 4096 characters."),
});

// function useTextEditorWithRefCallback() {
//     // const ref = useRef(null);

//     const setRef = useCallback(textEditor => {
//         console.log("====Callback: ref.current====");
//         // console.log(ref.current);
        
//         console.log("====Callback: textEditor====");
//         console.log(textEditor);

//         // ref.current = textEditor;

//     }, []);

//     return [setRef];
// }

const TextAttribute = memo((props) => {
    const [editing, setEditing] = useState(false);

    const [name, setName] = useState(props.name);
    const [text, setText] = useState(props.text);

    const [initialValues, setInitialValues] =  useState({
        id: props.attributeId,
        name: name,
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
        setName(values.name);
        setText(values.text);

        AttributeService.updateTextAttribute(values.id, values.name, values.text).then(
            (response) => {
                if(values.name !== response.data.name) {
                    setName(response.data.name);
                }
                if(values.text !== response.data.text) {
                    setText(response.data.text);
                }

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
                    <div className="attribute-name display">
                        {name}
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