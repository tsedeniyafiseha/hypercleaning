export { authHandler as GET, authHandler as POST } from "@/lib/auth";

// Ensure Node.js runtime (Prisma doesn't work on Edge)
export const runtime = "nodejs";


