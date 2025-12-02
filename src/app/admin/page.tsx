import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!session || !session.user?.email || !adminEmail) {
    redirect("/");
  }

  if (session.user.email !== adminEmail) {
    redirect("/");
  }

  const [totalProducts, totalOrders, totalRevenue, totalUsers, pendingOrders] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        where: { status: "paid" },
        _sum: { totalAmount: true },
      }),
      prisma.user.count(),
      prisma.order.count({ where: { status: "pending" } }),
    ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      User: { select: { name: true, email: true } },
    },
  });

  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0 py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="border border-black/10 rounded-2xl p-5">
          <p className="text-sm text-black/60 mb-1">Total Products</p>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </div>
        <div className="border border-black/10 rounded-2xl p-5">
          <p className="text-sm text-black/60 mb-1">Total Orders</p>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>
        <div className="border border-black/10 rounded-2xl p-5">
          <p className="text-sm text-black/60 mb-1">Total Revenue</p>
          <p className="text-3xl font-bold">
            ${Number(totalRevenue._sum.totalAmount || 0).toFixed(2)}
          </p>
        </div>
        <div className="border border-black/10 rounded-2xl p-5">
          <p className="text-sm text-black/60 mb-1">Total Users</p>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>
      </div>

      {pendingOrders > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
          <p className="text-sm font-medium">
            ⚠️ You have {pendingOrders} pending order{pendingOrders > 1 ? "s" : ""}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link
          href="/admin/products"
          className="border border-black/10 rounded-2xl p-5 hover:border-black/30 transition-colors"
        >
          <h2 className="font-semibold text-lg mb-1">Products</h2>
          <p className="text-sm text-black/60">Manage your product catalog</p>
        </Link>
        <Link
          href="/admin/orders"
          className="border border-black/10 rounded-2xl p-5 hover:border-black/30 transition-colors"
        >
          <h2 className="font-semibold text-lg mb-1">Orders</h2>
          <p className="text-sm text-black/60">View and manage orders</p>
        </Link>
        <Link
          href="/admin/categories"
          className="border border-black/10 rounded-2xl p-5 hover:border-black/30 transition-colors"
        >
          <h2 className="font-semibold text-lg mb-1">Categories</h2>
          <p className="text-sm text-black/60">Organize product categories</p>
        </Link>
      </div>

      <div className="border border-black/10 rounded-2xl p-5">
        <h2 className="font-semibold text-lg mb-4">Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-black/60">No orders yet</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order: any) => (
              <Link
                key={order.id}
                href={`/admin/orders`}
                className="block border border-black/10 rounded-lg p-3 hover:border-black/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Order #{order.id}</p>
                    <p className="text-xs text-black/60">
                      {order.User?.name || order.User?.email || "Guest"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      ${Number(order.totalAmount).toFixed(2)}
                    </p>
                    <p className="text-xs text-black/60 uppercase">
                      {order.status}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
