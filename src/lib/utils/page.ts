import { orderMode } from "../../stores/app";
import { overlay, formProcessing } from "../../stores/dom";

export let setOrderMode = (type: string, enabled: boolean, isProductSelected: boolean=false) => {
    orderMode.set({
        type,
        enabled,
        isProductSelected
    });
}

export let setOverlay = (enabled: boolean, contentType: string, content: any=null) => {
    overlay.set({
        enabled,
        contentType,
        content
    })
}

export let setFormProcessing = (enabled: boolean, process: string) => {
    formProcessing.set({
        enabled,
        process                    
    })
}