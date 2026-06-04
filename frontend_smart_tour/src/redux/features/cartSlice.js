import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    cartNoOfDays: 0,
    price: 0,
    dates: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            console.log("cart: ", action.payload)
            // const existingIndex = state.cartItems.findIndex(
            //     (item) => item.id === action.payload.id
            // );

            // if (existingIndex >= 0) {
            //     state.cartItems[existingIndex] = {
            //         ...state.cartItems[existingIndex],
            //         cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
            //     };
            //     toast.info("Increased product quantity", {
            //         position: "bottom-left",
            //     });
            // } else {
            //     let tempProductItem = { ...action.payload, cartQuantity: 1 };
            //     state.cartItems.push(tempProductItem);
            //     toast.success("Product added to cart", {
            //         position: "bottom-left",
            //     });
            // }
            // state.cartItems.push(action.payload)
            localStorage.setItem("cartItems", JSON.stringify(action.payload.hotelData));
            state.cartItems = action.payload.hotelData
            state.dates = action.payload.dates
            state.cartTotalQuantity = action.payload.noOfRooms
            state.cartNoOfDays = action.payload.days
            state.cartTotalAmount = action.payload.days * action.payload.hotelData.price * action.payload.noOfRooms
            state.price = action.payload.hotelData.price;
        },

        removeFromCart(state, action) {
            state.cartItems.map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    const nextCartItems = state.cartItems.filter(
                        (item) => item.id !== cartItem.id
                    );

                    state.cartItems = nextCartItems;

                    toast.error("Product removed from cart", {
                        position: "bottom-left",
                    });
                }
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
                return state;
            });
        },
        getTotals(state, action) {
            // let { total, quantity } = state.cartItems.reduce(
            //     (cartTotal, cartItem) => {
            //         const { price, cartQuantity } = cartItem;
            //         const itemTotal = price * cartQuantity;

            //         cartTotal.total += itemTotal;
            //         cartTotal.quantity += cartQuantity;

            //         return cartTotal;
            //     },
            //     {
            //         total: 0,
            //         quantity: 0,
            //     }
            // );
            // total = parseFloat(total.toFixed(2));
            // state.cartTotalQuantity = quantity;
            // state.cartTotalAmount = total;
        },
        emptyCart: (state, action) => {
            localStorage.clear("cart");
            state.cartItems = [];
            state.cartTotalAmount = 0;
            state.cartTotalQuantity = 0;
        },
        increaseCart: (state, action) => {
            // let pricePerRoom = state.cartTotalAmount / state.cartTotalQuantity
            console.log("price/room: ", state.price);
            state.cartTotalQuantity += 1;
            state.cartTotalAmount = state.cartTotalQuantity * state.cartNoOfDays * state.price

        },
        decreaseCart(state, action) {
            state.cartTotalQuantity -= 1;
            if (state.cartTotalQuantity == 0) {
                localStorage.clear("cartItems")
                return;
            }
            state.cartTotalAmount = state.cartTotalQuantity * state.cartNoOfDays * state.price
            
        },
    },

});

export const { addToCart, decreaseCart, increaseCart, removeFromCart, getTotals, emptyCart } =
    cartSlice.actions;

export default cartSlice.reducer;