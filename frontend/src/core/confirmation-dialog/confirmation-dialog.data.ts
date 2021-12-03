export interface ConfirmationDialogData {
    /**
     * Title of the confirmation dialog
     */
    title?: string;
    /**
     * Message of the confirmation dialog
     */
    message: string;
    /**
     * Affirmative action
     */
    affirmative: {
        label: string;
        handler: () => void;
    };
    /**
     * Dismissive action
     */
    dismissive?: {
        label: string;
        handler?: () => void;
    };
}
