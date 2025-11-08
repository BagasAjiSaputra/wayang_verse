import { db } from "../../../../../lib/db/index";
import { users } from "../../../../../lib/db/schema";
import { comparePassword } from "../../../../../lib/bcrypt";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { signToken } from "../../../../../lib/jwt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const valid = await comparePassword(password, user.password);
  if (!valid) return NextResponse.json({ error: "Invalid password" }, { status: 401 });

  const token = signToken({ id: user.id, email: user.email });
  return NextResponse.json({ message: "Login success", token });
}
