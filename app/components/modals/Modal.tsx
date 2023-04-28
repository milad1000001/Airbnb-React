'use client';

import { useCallback, useEffect, useState } from "react";
import { MdClose } from 'react-icons/md'
import Button from "../button/Button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled: boolean;
    secondaryAction?: () => void;
    secondaryLabelAction?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryLabelAction,
}) => {

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit()
    }, [disabled, onSubmit])

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction()
    }, [disabled, secondaryAction])

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="flex justify-center items-center inset-0 bg-neutral-800/70 w-full fixed z-50 outline-none focus:outline-none">
                <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto lg:h-auto">
                    {/* Content */}
                    <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                        <div className="translte h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* Header */}
                            <div className="flex items-center justify-center p-6 rounded-t relative border-b">
                                <button className="p-1 border-0 hover:opacity-70 transition absolute left-9" onClick={handleClose}>
                                    <MdClose />
                                </button>
                                <div>
                                    {title}
                                </div>
                            </div>
                            {/* Body */}
                            <div className="relative p-6 flex-auto">
                                {body}
                            </div>
                            {/* Footer */}
                            <div className="flex flex-col p-6 gap-2">
                                <div className="flex flex-row items-center gap-4 w-full">
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={onSubmit}
                                    />
                                    {secondaryAction && secondaryLabelAction && (
                                        <Button
                                            outline
                                            disabled={disabled}
                                            label={secondaryLabelAction}
                                            onClick={secondaryAction}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;