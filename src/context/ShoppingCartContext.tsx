import React, {createContext, ReactNode, useContext, useState} from "react";
import ShoppingCart from "../components/ShoppingCart";
import {useLocalStorage} from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
    children: ReactNode[]
}
type CartItem = {
    id: number,
    quantity: number
}
type ShoppingCartContextProps = {
    getItemQuantity: (id: number) => number,
    incItemQuantity: (id: number) => void,
    decItemQuantity: (id: number) => void,
    removeItem: (id: number) => void,
    closeCart: () => void,
    openCart: () => void,
    cartItems: CartItem[],
    cartQuantity: number,
}
const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({children}) => {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("naser-shoppingCart", []);
    const [isOpen, setIsOpen] = useState(false)

    const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0);
    const closeCart = () => setIsOpen(false);
    const openCart = () => setIsOpen(true);
    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }
    const incItemQuantity = (id: number) => {
        setCartItems((curItems) => {
            if (curItems.find(item => item.id === id) == null) {
                return [...curItems, {id: id, quantity: 1}];
            } else {
                return curItems.map((item: CartItem) => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item;
                    }
                })
            }
        })
    }
    const decItemQuantity = (id: number) => {
        setCartItems((curItems) => {
            if (curItems.find(item => item.id === id)?.quantity === 1) {
                return curItems.filter(item => item.id !== id);
            } else {
                return curItems.map((item: CartItem) => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item;
                    }
                })
            }
        })
    }
    const removeItem = (id: number) => {
        setCartItems(curItems => curItems.filter(item => item.id !== id));
    }
    return <ShoppingCartContext.Provider value={{
        getItemQuantity, incItemQuantity, decItemQuantity,
        removeItem, closeCart, openCart, cartItems, cartQuantity
    }}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
}