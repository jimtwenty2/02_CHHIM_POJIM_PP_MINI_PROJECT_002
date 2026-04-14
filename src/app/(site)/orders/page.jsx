import { getAllOrdersService } from "@/service/order.service";

export default async function OrderedProductsPage() {
  let orders = [];

  try {
    const data = await getAllOrdersService();
    orders = data?.payload || [];
  } catch (error) {
    console.error("Orders Page Error:", error);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 font-sans bg-[#fcfcfc] min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Ordered products
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          {orders.length} {orders.length === 1 ? "order" : "orders"} from your
          account.
        </p>
      </header>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white border border-gray-100 rounded-[1.5rem] p-8 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                  Order
                </span>
                <h2 className="text-lg font-bold text-gray-900 break-all leading-tight">
                  #{order.orderId}
                </h2>
              </div>
              <div className="text-right space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                  Total
                </span>
                <p className="text-2xl font-black text-gray-900 leading-none">
                  ${order.totalAmount?.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                  User ID
                </span>
                <p className="text-sm font-semibold text-gray-600 break-all">
                  {order.appUserId}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                  Order date
                </span>
                <p className="text-sm font-semibold text-gray-600">
                  {order.orderDate
                    ? new Date(order.orderDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Date N/A"}
                </p>
              </div>
            </div>

            {/* Line Items Count */}
            <div className="mb-8 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                Line items
              </span>
              <p className="text-sm font-black text-gray-900">
                {order.orderDetailsResponse?.length || 0}
              </p>
            </div>

            <div className="bg-[#f8f9fa] rounded-2xl p-6 border border-gray-50">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] block mb-5">
                Order details
              </span>

              <div className="space-y-5">
                {order.orderDetailsResponse?.map((item, index) => (
                  <div
                    key={item.productId + index}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm gap-3"
                  >
                    <div className="flex gap-2 items-center">
                      <span className="text-gray-400 font-medium">Product</span>
                      <span className="font-bold text-gray-800">
                        {item.productName}
                      </span>
                    </div>

                    <div className="flex w-full sm:w-auto justify-between sm:gap-16 items-center">
                      <div className="flex gap-2">
                        <span className="text-gray-400 font-medium">Qty</span>
                        <span className="font-bold text-gray-800">
                          {item.orderQty}
                        </span>
                      </div>
                      <span className="font-black text-gray-900">
                        ${item.orderTotal?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
          <p className="text-gray-400 font-bold tracking-tight">
            No orders found.
          </p>
        </div>
      )}
    </div>
  );
}
