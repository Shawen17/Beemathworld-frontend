import MultiCounter from "./Multicounter";

export const Variant = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        marginLeft: 5,
      }}
    >
      <button className="wrapper-button">{props.item.variant}</button>
      <MultiCounter
        cartItems={props.cartItems}
        pickedProducts={props.pickedProducts}
        item={props.item}
        count={props.count}
        quantity={props.quantity}
        multiIncrement={props.multiIncrement}
        multiDecrement={props.multiDecrement}
      />
    </div>
  );
};
