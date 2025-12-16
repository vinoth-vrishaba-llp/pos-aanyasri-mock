// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { defaultMeasurements } from "./data/mockData";
import { getAccessToken } from "./utils/authStorage";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import MainLayout from "./components/layout/MainLayout";
import TopNav from "./components/layout/TopNav";
import ProductCatalog from "./components/catalog/ProductCatalog";
import CartPanel from "./components/cart/CartPanel";
import ProductModal from "./components/modals/ProductModal";
import CustomerModal from "./components/modals/CustomerModal";
import ReceiptModal from "./components/modals/ReceiptModal";
import PrintOptionsModal from "./components/modals/PrintOptionsModal";
import PaymentMethodModal from "./components/modals/PaymentMethodModal";
import OrderListPage from "./components/orders/OrderListPage";
import OrderDetailsModal from "./components/modals/OrderDetailsModal";

import { fetchCategories } from "./api/categories.api";

/* =======================
   PROTECTED ROUTE
======================= */
function ProtectedRoute({ children }) {
  const token = getAccessToken();
  return token ? children : <Navigate to="/login" replace />;
}

/* =======================
   UTILITIES
======================= */
function getAvailableStock(product, size) {
  if (product.type !== "ready_to_wear") return Infinity;
  const sizeEntry = product.sizes?.find((s) => s.size === size);
  return sizeEntry?.stock ?? Infinity;
}

function generateOrderNumber() {
  return `POS-${new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, "")
    .slice(0, 14)}`;
}

/* =======================
   APP
======================= */
export default function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  /* =======================
     AUTH
  ======================= */
  const token = getAccessToken();

  /* =======================
     CATEGORIES
  ======================= */
  const [categories, setCategories] = useState([
    { id: "all", name: "All", slug: undefined },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    if (!token) return;

    fetchCategories()
      .then((res) => {
        const list = res?.data?.data ?? res?.data ?? [];
        const normalized = Array.isArray(list) ? list : [];
        // Filter out any "all" category from API to avoid duplication
        const filtered = normalized.filter(c => c.id !== "all");
        const all = { id: "all", name: "All", slug: undefined };
        setCategories([all, ...filtered]);
        setSelectedCategory(all);
      })
      .catch(() => {
        setCategories([{ id: "all", name: "All", slug: undefined }]);
        setSelectedCategory({ id: "all", name: "All", slug: undefined });
      });
  }, [token]);

  /* =======================
     ORDERS
  ======================= */
  const [orders, setOrders] = useState([]);
  const [lastOrderId, setLastOrderId] = useState(null);
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState(null);

  /* =======================
     POS STATE
  ======================= */
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [notes, setNotes] = useState("");
  const [measurements, setMeasurements] = useState(defaultMeasurements);

  const [alterationCharge, setAlterationCharge] = useState(0);
  const [courierCharge, setCourierCharge] = useState(0);
  const [otherCharge, setOtherCharge] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [orderType, setOrderType] = useState("sale");
  const [paymentMethod, setPaymentMethod] = useState(null);

  /* =======================
     MODALS
  ======================= */
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [printOptionsOpen, setPrintOptionsOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [receiptVariant, setReceiptVariant] = useState("customer");

  /* =======================
     TOTALS
  ======================= */
  const { subtotal, chargesTotal, grandTotal } = useMemo(() => {
    const subtotal = cart.reduce(
      (acc, i) => acc + i.product.price * i.qty,
      0
    );
    const charges =
      (alterationCharge || 0) +
      (courierCharge || 0) +
      (otherCharge || 0);

    return {
      subtotal,
      chargesTotal: charges,
      grandTotal: subtotal - discount + charges,
    };
  }, [cart, alterationCharge, courierCharge, otherCharge, discount]);

  /* =======================
     CART
  ======================= */
  function handleAddToCart(product, size) {
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) => i.product.id === product.id && i.size === size
      );

      const available = getAvailableStock(product, size);

      if (idx > -1) {
        if (prev[idx].qty + 1 > available) {
          alert(`Only ${available} available`);
          return prev;
        }
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }

      if (available < 1) {
        alert("Out of stock");
        return prev;
      }

      return [...prev, { product, size, qty: 1 }];
    });
  }

  function handleChangeQty(index, delta) {
    setCart((prev) => {
      const item = prev[index];
      if (!item) return prev;

      const newQty = item.qty + delta;
      if (delta > 0 && newQty > getAvailableStock(item.product, item.size)) {
        alert("Stock limit reached");
        return prev;
      }

      if (newQty <= 0) return prev.filter((_, i) => i !== index);

      const copy = [...prev];
      copy[index] = { ...item, qty: newQty };
      return copy;
    });
  }

  function resetSaleToNew() {
    setCart([]);
    setCurrentCustomer(null);
    setNotes("");
    setMeasurements(defaultMeasurements);
    setAlterationCharge(0);
    setCourierCharge(0);
    setOtherCharge(0);
    setDiscount(0);
    setOrderType("sale");
    setPaymentMethod(null);
    setReceiptVariant("customer");
    setLastOrderId(null);
  }

  function createOrderFromCurrentState(method) {
    if (!cart.length) return;
    const orderNumber = generateOrderNumber();

    setOrders((prev) => [
      {
        id: orderNumber,
        orderNumber,
        barcode: orderNumber,
        status: "paid",
        paymentMethod: method,
        orderType,
        totals: { subtotal, chargesTotal, grandTotal },
        customer: currentCustomer,
        notes,
        measurements,
        createdAt: new Date().toISOString(),
        items: cart.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          sku: i.product.sku,
          size: i.size,
          qty: i.qty,
          price: i.product.price,
          lineTotal: i.product.price * i.qty,
        })),
      },
      ...prev,
    ]);

    setLastOrderId(orderNumber);
  }

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      {!isAuthPage && token && <TopNav />}

      <div className="flex-1 overflow-hidden relative">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ProductCatalog
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onProductClick={(p) => {
                      setActiveProduct(p);
                      setProductModalOpen(true);
                    }}
                  />

                  <CartPanel
                    cart={cart}
                    subtotal={subtotal}
                    discount={discount}
                    chargesTotal={chargesTotal}
                    total={grandTotal}
                    currentCustomer={currentCustomer}
                    onOpenCustomerModal={() => setCustomerModalOpen(true)}
                    onRemoveItem={(i) =>
                      setCart((p) => p.filter((_, x) => x !== i))
                    }
                    onChangeQty={handleChangeQty}
                    notes={notes}
                    setNotes={setNotes}
                    measurements={measurements}
                    setMeasurements={setMeasurements}
                    alterationCharge={alterationCharge}
                    setAlterationCharge={setAlterationCharge}
                    courierCharge={courierCharge}
                    setCourierCharge={setCourierCharge}
                    otherCharge={otherCharge}
                    setOtherCharge={setOtherCharge}
                    orderType={orderType}
                    setOrderType={setOrderType}
                    paymentMethod={paymentMethod}
                    onPrintReceipt={() => setPrintOptionsOpen(true)}
                    onMarkPaid={() => setPaymentModalOpen(true)}
                    resetSaleToNew={resetSaleToNew}
                  />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderListPage
                  orders={orders}
                  onSelectOrder={setSelectedOrderForDetails}
                  onMarkCompleted={(id) =>
                    setOrders((o) =>
                      o.map((x) =>
                        x.id === id ? { ...x, status: "completed" } : x
                      )
                    )
                  }
                />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* GLOBAL MODALS */}
      <ProductModal
        isOpen={productModalOpen}
        product={activeProduct}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        onClose={() => setProductModalOpen(false)}
        onAddToCart={(size) => {
          handleAddToCart(activeProduct, size);
          setProductModalOpen(false);
        }}
      />

      <CustomerModal
        isOpen={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        onSave={(c) => {
          setCurrentCustomer(c);
          setCustomerModalOpen(false);
        }}
      />

      <PrintOptionsModal
        isOpen={printOptionsOpen}
        onClose={() => setPrintOptionsOpen(false)}
        onSelectVariant={(v) => {
          setReceiptVariant(v);
          setPrintOptionsOpen(false);
          setReceiptModalOpen(true);
        }}
      />

      <PaymentMethodModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onSelectMethod={(m) => {
          setPaymentMethod(m);
          createOrderFromCurrentState(m);
          setPaymentModalOpen(false);
          setReceiptModalOpen(true);
        }}
      />

      <ReceiptModal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        cart={cart}
        subtotal={subtotal}
        chargesTotal={chargesTotal}
        total={grandTotal}
        customer={currentCustomer}
        notes={notes}
        measurements={measurements}
        orderType={orderType}
        paymentMethod={paymentMethod}
        variant={receiptVariant}
        orderNumber={lastOrderId || "POS-DRAFT"}
        barcodeValue={lastOrderId || "POS-DRAFT"}
      />

      <OrderDetailsModal
        order={selectedOrderForDetails}
        onClose={() => setSelectedOrderForDetails(null)}
      />
    </div>
  );
}
