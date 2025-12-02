import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);

  const adminEmail = process.env.ADMIN_EMAIL;

  if (!session || !session.user || !session.user.email || !adminEmail) {
    redirect("/");
  }

  if (session.user.email !== adminEmail) {
    redirect("/");
  }

  const orders = await prisma.order.findMany({
    include: {
      OrderItem: true,
      User: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0 py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Order Requests</h1>
      <p className="text-black/60 mb-6">
        Customer order requests are listed below. Contact customers directly using their email or phone to confirm orders and arrange payment.
      </p>

      {orders.length === 0 ? (
        <div className="border border-black/10 rounded-2xl p-8 text-center">
          <svg className="w-16 h-16 text-black/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-black/60">No order requests yet. Orders will appear here when customers submit requests.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-black/10 rounded-2xl p-5 md:p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                <div className="flex-1">
                  <p className="text-sm text-black/60">
                    Order ID: <span className="text-black font-semibold">#{order.id}</span>
                  </p>
                  <p className="text-sm text-black/60">
                    Customer:{" "}
                    <span className="text-black font-medium">
                      {order.User?.name || order.customerEmail || "Guest"}
                    </span>
                  </p>
                  <p className="text-sm text-black/60">
                    Email:{" "}
                    <a 
                      href={`mailto:${order.customerEmail || order.User?.email}`}
                      className="text-sky-600 hover:underline font-medium"
                    >
                      {order.customerEmail || order.User?.email}
                    </a>
                  </p>
                  <p className="text-sm text-black/60">
                    Placed on{" "}
                    {order.createdAt.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-sm font-medium mb-1">
                    Status:{" "}
                    <span className={`uppercase px-2 py-1 rounded text-xs ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </p>
                  <p className="text-lg md:text-xl font-bold text-sky-600">
                    ${Number(order.totalAmount).toFixed(2)}
                  </p>
                </div>
              </div>

              <hr className="border-t-black/10 mb-4" />

              <div className="space-y-3 mb-4">
                {order.OrderItem.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm md:text-base"
                  >
                    <div>
                      <p className="font-medium text-black">{item.name}</p>
                      <p className="text-black/60">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${Number(item.unitPrice).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {order.shippingAddress && (
                <>
                  <hr className="border-t-black/10 mb-4" />
                  <div className="bg-sky-50 rounded-lg p-4">
                    <p className="font-semibold text-black mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Customer Contact & Shipping Details
                    </p>
                    <div className="space-y-1 text-sm">
                      <p className="font-medium text-black">{(order.shippingAddress as any).fullName}</p>
                      <p className="text-black/70">
                        <span className="font-medium">Phone:</span>{" "}
                        <a href={`tel:${(order.shippingAddress as any).phone}`} className="text-sky-600 hover:underline">
                          {(order.shippingAddress as any).phone}
                        </a>
                      </p>
                      <p className="text-black/70">
                        <span className="font-medium">Email:</span>{" "}
                        <a href={`mailto:${(order.shippingAddress as any).email}`} className="text-sky-600 hover:underline">
                          {(order.shippingAddress as any).email}
                        </a>
                      </p>
                      <hr className="border-t-black/10 my-2" />
                      <p className="text-black/70">{(order.shippingAddress as any).addressLine1}</p>
                      {(order.shippingAddress as any).addressLine2 && (
                        <p className="text-black/70">{(order.shippingAddress as any).addressLine2}</p>
                      )}
                      <p className="text-black/70">
                        {(order.shippingAddress as any).city}, {(order.shippingAddress as any).state} {(order.shippingAddress as any).postalCode}
                      </p>
                      <p className="text-black/70">{(order.shippingAddress as any).country}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}


