import orderHistoryReducer from "./orderHistory.reducer";
import productReducer from "./product.reducer";
import categoryReducer from "./category.reducer";
import cartReducer from "./cart.reducer";
import notificationReducer from "./notification.reducer";
import { combineReducers } from "redux";
import checkoutReducer from "./checkoutReducer";
import { loadingReducer } from "./loading.reducer";

const rootReducer = combineReducers({
	cart: cartReducer,
	orderHistory: orderHistoryReducer,
	product: productReducer,
	category: categoryReducer,
	checkouts: checkoutReducer,
	notification: notificationReducer,
	loading: loadingReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

// const combineReducers = (slices) => (state, action) =>
// 	Object.keys(slices).reduce(
// 		// use for..in loop, if you prefer it
// 		(acc, prop) => ({ ...acc, [prop]: slices[prop](acc[prop], action) }),
// 		state
// 	);

// import a from "./Reducer1";
// import b from "./Reducer2";
// const initialState = { a: {}, b: {} }; // some state for props a, b
// const rootReducer = combineReducers({ a, b });
// const StoreProvider = ({ children }) => {
// 	const [state, dispatch] = useReducer(rootReducer, initialState); // Important(!): memoize array value. Else all context consumers update on *every* render
// 	const store = React.useMemo(() => [state, dispatch], [state]);
// 	return (
// 		<StoreContext.Provider value={store}> {children} </StoreContext.Provider>
// 	);
// };
