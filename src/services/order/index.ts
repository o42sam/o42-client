import { orders } from "$lib/consts/app";
import { modals, modalViews } from "$lib/consts/dom";
import { createSaleOrderModal } from "../../stores/dom";
import { orderMode } from "../../stores/order";
import { setModal } from "../dom";

export const setOrderMode = (type: string, enabled: boolean, isProductSelected: boolean=false) => {
    orderMode.set({
        type,
        enabled,
        isProductSelected
    });

    if (!enabled) return;
    
    let saleOrderModal;
    createSaleOrderModal.subscribe(value => {
        saleOrderModal = value
    });

    if (type === orders.PURCHASE) {
        setModal(true, modals.SEARCH)
    }
    else if (type === orders.SALE) {
        setModal(true, modals.DYNAMIC, saleOrderModal);
    }
};