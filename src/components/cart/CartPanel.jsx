// src/components/cart/CartPanel.jsx
import CartItems from "./CartItems";
import CustomerSection from "./CustomerSection";
import VoucherAndNotes from "./VoucherAndNotes";
import TotalsFooter from "./TotalsFooter";
import OrderMetaControls from "./OrderMetaControls";

export default function CartPanel({
  cart,
  subtotal,
  discount,
  chargesTotal,
  total,
  currentCustomer,
  onOpenCustomerModal,
  onRemoveItem,
  onChangeQty,
  notes,
  setNotes,
  measurements,
  setMeasurements,
  alterationCharge,
  setAlterationCharge,
  courierCharge,
  setCourierCharge,
  otherCharge,
  setOtherCharge,
  orderType,
  setOrderType,
  paymentMethod,
  onPrintReceipt,
  onMarkPaid,
  resetSaleToNew,
}) {
  return (
    <>
      <CustomerSection
        currentCustomer={currentCustomer}
        onOpenCustomerModal={onOpenCustomerModal}
      />

      {/* Cart items + Extras Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 no-scrollbar" id="cart-container">
        <CartItems
          cart={cart}
          onRemoveItem={onRemoveItem}
          onChangeQty={onChangeQty}
        />

        {/* Voucher + Notes/Measurements */}
        <VoucherAndNotes
          notes={notes}
          setNotes={setNotes}
          measurements={measurements}
          setMeasurements={setMeasurements}
        />

        {/* Order type + extra charges */}
        <OrderMetaControls
          alterationCharge={alterationCharge}
          setAlterationCharge={setAlterationCharge}
          courierCharge={courierCharge}
          setCourierCharge={setCourierCharge}
          otherCharge={otherCharge}
          setOtherCharge={setOtherCharge}
          orderType={orderType}
          setOrderType={setOrderType}
        />
      </div>

      {/* Totals + actions */}
      <TotalsFooter
        subtotal={subtotal}
        discount={discount}
        chargesTotal={chargesTotal}
        total={total}
        paymentMethod={paymentMethod}
        onPrint={onPrintReceipt}
        onMarkPaid={onMarkPaid}
        onResetSale={resetSaleToNew}
        cartLength={cart.length}
      />
    </>
  );
}
