import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
function signingKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret && process.env.NODE_ENV === "production") throw new Error("AUTH_SECRET wajib diatur pada production.");
  return new TextEncoder().encode(secret || "local-development-secret-change-before-production");
}
const name = "ksb_session";
export async function createSession(userId:string) { const token=await new SignJWT({sub:userId}).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime("7d").sign(signingKey()); (await cookies()).set(name,token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:604800}); }
export async function userIdFromSession() { try { const token=(await cookies()).get(name)?.value; if(!token)return null; return (await jwtVerify(token,signingKey())).payload.sub ?? null; } catch{return null;} }
export async function requireAdmin() { const id=await userIdFromSession(); if(!id) throw new Error("UNAUTHORIZED"); return id; }
export async function clearSession(){ (await cookies()).delete(name); }
