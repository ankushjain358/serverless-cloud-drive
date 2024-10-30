import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

// Define types for the dialog props
interface DialogProps {
    title: ReactNode | string;
    description: ReactNode | string;
    cancelText?: string;
    actionText?: string;
    onCancel?: () => void;
    onAction: () => Promise<void> | void;
}

// Define the shape of the context
interface DialogContextType {
    showDialog: (props: DialogProps) => void;
    hideDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dialogProps, setDialogProps] = useState<DialogProps | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const showDialog = (props: DialogProps) => {
        setDialogProps(props);
        setIsOpen(true);
    };

    const hideDialog = () => {
        setIsOpen(false);
        setDialogProps(null);
        setIsLoading(false);
    };

    const handleAction = async () => {
        if (dialogProps?.onAction) {
            setIsLoading(true);
            try {
                await dialogProps.onAction();
            } finally {
                setIsLoading(false);
                hideDialog();
            }
        }
    };

    return (
        <DialogContext.Provider value={{ showDialog, hideDialog }}>
            {children}
            {dialogProps && (
                <Dialog open={isOpen} onOpenChange={hideDialog}>
                    <DialogContent>
                        <DialogTitle>{dialogProps.title}</DialogTitle>
                        <DialogDescription>{dialogProps.description}</DialogDescription>
                        <DialogFooter>
                            <Button variant="destructive" onClick={dialogProps.onCancel || hideDialog}>
                                {dialogProps.cancelText || "Cancel"}
                            </Button>
                            <Button
                                variant="default"
                                onClick={handleAction}
                                disabled={isLoading}>
                                {!isLoading && (dialogProps.actionText || "Confirm")}
                                {isLoading && (<>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing..
                                </>)}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </DialogContext.Provider>
    );
};

// Custom hook to use the dialog context
export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider");
    }
    return context;
};
