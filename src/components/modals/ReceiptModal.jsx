// src/components/modals/ReceiptModal.jsx
import { X, Printer } from "lucide-react";
import Barcode from "react-barcode";

export default function ReceiptModal({
  isOpen,
  onClose,
  cart,
  subtotal,
  discount,
  chargesTotal,
  total,
  customer,
  notes,
  measurements,
  orderType,
  paymentMethod,
  variant,      // "customer" | "store" | "alteration_slip"
  orderNumber,  // e.g. "POS-20251210-153045"
  barcodeValue, // e.g. same as orderNumber
  alterationCharge = 0,
  courierCharge = 0,
  otherCharge = 0,
}) {
  if (!isOpen) return null;

  const now = new Date();
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const paymentLabel =
    paymentMethod === "cash"
      ? "Payment: Cash"
      : paymentMethod === "upi_card"
        ? "Payment: UPI / Card"
        : "Payment: Not recorded";

  const baseTitle =
    orderType === "advanced_booking"
      ? "Advanced Booking Bill"
      : orderType === "alteration"
        ? "Alteration Bill"
        : "Sales Bill";

  const isStoreCopy = variant === "store";
  const isCustomerCopy = variant === "customer";
  const isAlterationSlip = variant === "alteration_slip";

  const headingTitle = isAlterationSlip
    ? "Alteration Slip"
    : baseTitle + (isStoreCopy ? " (Store Copy)" : " (Customer Copy)");

  // Rules from spec
  // Rules from spec
  // Show measurements if they exist, for ALL copies (request: "measurements ... should be there if provided")
  const showMeasurements = !!measurements?.trim() && measurements !== "Standard Size";

  // Show notes if they exist, for ALL copies
  const showNotes = !!notes?.trim();

  // Show full breakdown (prices) only on Store Copy
  const showFullBreakdown = isStoreCopy;

  // Show minimal (qty only) on Customer Copy
  const showCustomerMinimal = isCustomerCopy;

  // Show totals section on ALL copies (request: "include ... total amount" even for alteration)
  const showTotalsSection = true;

  const handlePrint = () => {
    // Clone the printable area into a top-level container and print it.
    // This avoids ancestor elements being hidden by print CSS which can
    // prevent the receipt from being visible in print preview.
    const el = document.getElementById("print-area");
    if (!el) return;

    const clone = el.cloneNode(true);
    const wrapper = document.createElement("div");
    wrapper.id = "print-area-clone";
    wrapper.style.width = "80mm";
    wrapper.style.margin = "0 auto";
    wrapper.style.background = "white";
    wrapper.style.padding = "6mm";
    wrapper.appendChild(clone);

    document.body.appendChild(wrapper);

    const cleanup = () => {
      try {
        window.removeEventListener("afterprint", cleanup);
        if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
      } catch (e) { }
    };

    window.addEventListener("afterprint", cleanup);

    // Small delay to allow browser to render the appended node
    setTimeout(() => {
      window.print();
      // Fallback cleanup in case afterprint isn't supported
      setTimeout(cleanup, 1000);
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 overflow-y-auto py-10 modal-base active">
      <div className="bg-white shadow-2xl w-full max-w-[380px] mx-auto min-h-[500px] flex flex-col relative my-auto">
        {/* Close Button (screen only) */}
        <button
          onClick={onClose}
          className="no-print absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Printable Area */}
        <div
          id="print-area"
          className="receipt-font p-6 text-xs text-black leading-relaxed"
        >
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold uppercase tracking-wider mb-1">
              Aanyasri POS
            </h1>
            <p className="mb-1">
              Plot No 68, Municipal Employees Colony,
              <br />
              Vijayawada, Andhra Pradesh
            </p>
            <p>Phone: +91 8977945675</p>
            <p>GST: 37CBTPK1800J1ZG</p>
          </div>

          {/* Bill Title */}
          <div className="text-center mb-2">
            <span className="font-bold text-[11px] uppercase">
              {headingTitle}
            </span>
          </div>

          {/* Barcode */}
          <div className="flex justify-center mb-2">
            <div className="flex flex-col items-center">
              <Barcode
                value={barcodeValue}
                height={40}
                width={1}
                displayValue={false}
              />
              <div className="font-mono text-[10px] mt-1">{orderNumber}</div>
            </div>
          </div>

          <div className="border-b-2 border-dashed border-black my-2" />

          {/* Invoice meta */}
          <div className="flex justify-between mb-1">
            <span>Invoice No:</span>
            <span className="font-bold">{orderNumber}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Date:</span>
            <span>{dateStr}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Time:</span>
            <span>{timeStr}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span>Payment:</span>
            <span>{paymentLabel.replace("Payment: ", "")}</span>
          </div>

          {/* Customer */}
          <div className="mb-3">
            <span className="font-bold underline">Customer:</span>
            <br />
            <span>{customer?.name || "Walk-in Customer"}</span>
            <br />
            <span>{customer?.phone || ""}</span>
          </div>

          <div className="border-b-2 border-dashed border-black my-2" />

          {/* ========== ITEMS SECTION ========== */}

          {/* 1) Store copy: full item table with prices */}
          {showFullBreakdown && !isAlterationSlip && (
            <table className="w-full text-left mb-4">
              <thead>
                <tr className="border-b border-black">
                  <th className="py-1">Item</th>
                  <th className="py-1 text-right">Qty</th>
                  <th className="py-1 text-right">Price</th>
                  <th className="py-1 text-right">Amt</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr
                    key={`${item.product.id}-${item.size}`}
                    className="border-b border-dashed border-gray-300"
                  >
                    <td className="py-2 pr-1">
                      <div className="font-bold">{item.product.name}</div>
                      <div className="text-[10px] text-gray-500">
                        SKU: {item.product.sku}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        Sz: {item.size}
                      </div>
                    </td>
                    <td className="py-2 text-right align-top">{item.qty}</td>
                    <td className="py-2 text-right align-top">
                      {item.product.price}
                    </td>
                    <td className="py-2 text-right align-top font-bold">
                      {item.product.price * item.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 2) Customer copy: only dress name + qty (no prices) */}
          {showCustomerMinimal && !isAlterationSlip && (
            <table className="w-full text-left mb-4">
              <thead>
                <tr className="border-b border-black">
                  <th className="py-1">Item</th>
                  <th className="py-1 text-right">Qty</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr
                    key={`${item.product.id}-${item.size}`}
                    className="border-b border-dashed border-gray-300"
                  >
                    <td className="py-2 pr-1">
                      <div className="font-bold">{item.product.name}</div>
                      <div className="text-[10px] text-gray-500">
                        Sz: {item.size}
                      </div>
                    </td>
                    <td className="py-2 text-right align-top">{item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 3) Alteration slip: minimal info, no prices */}
          {isAlterationSlip && (
            <div className="mb-4">
              <p className="font-bold mb-2">Items for Alteration:</p>
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex justify-between border-b border-dashed border-gray-300 py-1"
                >
                  <div className="pr-2">
                    <div className="font-bold text-[11px]">
                      {item.product.name}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      Sz: {item.size} • Qty: {item.qty}
                    </div>
                  </div>
                  <div className="text-right text-[10px]">
                    <div>Token: {orderNumber}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ========== TOTALS SECTION ========== */}

          {showTotalsSection && (
            <>
              <div className="border-b-2 border-dashed border-black my-2" />

              {/* Store copy: full breakdown */}
              {showFullBreakdown && (
                <>
                  <div className="flex justify-between mb-1">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between mb-1">
                      <span>Discount:</span>
                      <span>₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                </>
              )}

              {/* Detailed breakdown of additional charges */}
              {alterationCharge > 0 && (
                <div className="flex justify-between mb-1">
                  <span>Alteration Chg:</span>
                  <span>₹{alterationCharge.toLocaleString()}</span>
                </div>
              )}
              {courierCharge > 0 && (
                <div className="flex justify-between mb-1">
                  <span>Courier Chg:</span>
                  <span>₹{courierCharge.toLocaleString()}</span>
                </div>
              )}
              {otherCharge > 0 && (
                <div className="flex justify-between mb-1">
                  <span>Other Chg:</span>
                  <span>₹{otherCharge.toLocaleString()}</span>
                </div>
              )}

              {/* Customer copy: only ONE total row */}
              <div className="flex justify-between text-sm font-bold mt-2">
                <span>TOTAL:</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </>
          )}

          {/* ========== NOTES & MEASUREMENTS ========== */}

          {showNotes && (
            <div className="mt-3">
              <span className="font-bold underline">Notes:</span>
              <p className="whitespace-pre-wrap mt-1 border-l-2 border-gray-300 pl-2 italic">
                {notes}
              </p>
            </div>
          )}

          {showMeasurements && (
            <div className="mt-3">
              <span className="font-bold underline">Measurements:</span>
              <div className="whitespace-pre-wrap font-mono text-[10px] mt-1 border border-black p-2 rounded-sm bg-gray-50">
                {measurements}
              </div>
            </div>
          )}

          {/* ========== FOOTER ========== */}

          {/* T&C only for store & customer copies */}
          {!isAlterationSlip && (
            <>
              <div className="border-b-2 border-dashed border-black my-4" />
              <div className="text-[10px] leading-tight text-gray-800">
                <p className="font-bold mb-1">Terms and Conditions:</p>
                <ul className="list-disc pl-3 space-y-1">
                  <li>No Exchange, No Returns / Refunds</li>
                  <li>Damages are to be checked while billing</li>
                  <li>
                    Physical bill must be carried for alteration or advance
                    booking pickup
                  </li>
                  <li>Fixed prices, No bargaining</li>
                  <li>First wash, Dry wash only</li>
                </ul>
              </div>
              <div className="text-center mt-6 font-bold">
                *** Thank You! Visit Again ***
              </div>
            </>
          )}

          {/* Alteration slip footer */}
          {isAlterationSlip && (
            <div className="mt-4 text-[10px] text-center">
              Please bring this slip during pickup.
            </div>
          )}
        </div>

        {/* Print Actions (screen only) */}
        <div className="no-print p-4 bg-gray-50 border-t flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 flex items-center justify-center gap-2 transition active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Print Now
          </button>
        </div>
      </div>
    </div>
  );
}
