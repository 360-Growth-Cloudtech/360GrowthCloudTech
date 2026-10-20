import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip only the real /api routes (not pages like /api-integration), Next internals and files.
  matcher: ["/((?!api(?:/|$)|_next|_vercel|.*\\..*).*)"],
};
