import { modals } from "$lib/consts/dom";
import { modal, formProcessing, isSearchEnabled } from "../stores/dom";

export const setModal = (enabled: boolean, contentType: string, content: any=null) => {
    modal.set({
        enabled,
        contentType,
        content
    })
}

export const setFormProcessing = (enabled: boolean, process: string) => {
    formProcessing.set({
        enabled,
        process                    
    })
}

export const setSearch = (value: boolean) => {
    isSearchEnabled.set(value);

    if (value) {
        setModal(true, modals.SEARCH, null);
    }
    else {
       setModal(false, "", null);
    }
}